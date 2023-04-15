import { Room } from "@/src/types/room";
import styles from "./RoomView.module.scss";
import { PaperPlaneTilt, User } from "phosphor-react";
import Message from "../message/Message";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  currentRoom: Room;
  socket: Socket;
};

const RoomView = ({ currentRoom, socket }: Props) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [messageValue, setMessageValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentRoom]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("chat", {
      content: messageValue,
      receiver: currentRoom.otherUser.id,
    });
    setMessageValue("");
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.messages}>
          {currentRoom.messages.map((message) => (
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
