import { Room } from "@/src/chat/types/room";
import styles from "./RoomView.module.scss";
import { PaperPlaneTilt, User } from "phosphor-react";
import Message from "../message/Message";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { getOneRoom } from "@/src/chat/services/room.service";
import { UserType } from "@/src/app/types/user";
import { RootState } from "@/src/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setNewChat } from "@/src/app/redux/slices/chatSlice";

type Props = {
  currentOtherUser: UserType;
  socket: Socket;
};

const RoomView = ({ currentOtherUser, socket }: Props) => {
  const dispatch = useDispatch();
  const chat = useSelector((state: RootState) => state.chat);
  const { newChat, rooms } = chat;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [messageValue, setMessageValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentRoom]);

  useEffect(() => {
    const findRoom = rooms.find(
      (room) => room.otherUser.id === currentOtherUser.id
    );
    if (newChat && !findRoom) return;
    getOneRoom(currentOtherUser.id)
      .then((room) => {
        setCurrentRoom(room);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.on("chat", (data: any) => {
      console.log(data);
      if (currentOtherUser.id === data.sender.id) {
        getOneRoom(currentOtherUser.id).then((room) => {
          setCurrentRoom(room);
        });
      } else {
        if (currentRoom && currentRoom.id === data.room) {
          setCurrentRoom({
            ...currentRoom,
            messages: [...currentRoom.messages, data],
          } as Room);
        } else {
          getOneRoom(currentOtherUser.id).then((room) => {
            setCurrentRoom(room);
          });
        }
      }
    });
  }, [currentRoom]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("chat", {
      content: messageValue,
      receiver: currentOtherUser.id,
    });
    if (newChat) dispatch(setNewChat(false));
    setMessageValue("");
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.messages}>
          {currentRoom?.messages.map((message) => (
            <li key={message.id}>
              <Message message={message} />
            </li>
          ))}
        </ul>
        <div ref={messagesEndRef}></div>
      </div>
      <div className={styles.form}>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            className={styles.input}
            placeholder="Entrer un message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <button type="submit" className={styles.submit}>
            <span className="sr-only">Envoyer un message</span>
            <PaperPlaneTilt weight="fill" />
          </button>
        </form>
      </div>
    </>
  );
};

export default RoomView;
