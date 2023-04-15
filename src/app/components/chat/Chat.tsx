import { ArrowLeft, CaretDown, CaretUp } from "phosphor-react";
import styles from "./Chat.module.scss";
import { useEffect, useState } from "react";
import { getAllRooms, getOneRoom } from "@/src/services/room.service";
import { Room, RoomPreviewType } from "@/src/types/room";
import RoomPreview from "@/src/chat/components/room-preview/RoomPreview";
import RoomView from "@/src/chat/components/room-view/RoomView";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";
import { io, Socket } from "socket.io-client";
import { getTokenFromCookie } from "@/src/utils/authorizations";
let socket: Socket;

const Chat = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentOtherUser, setCurrentOtherUser] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const initializeSocket = async () => {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", {
      extraHeaders: {
        token: getTokenFromCookie(),
      },
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  useEffect(() => {
    initializeSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllRooms()
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.on("chat", (data: any) => {
      getAllRooms()
        .then((rooms) => {
          setRooms(rooms);
        })
        .catch((error) => {
          console.log(error);
        });
      if (currentRoom?.id === data.room && currentOtherUser) {
        getOneRoom(currentOtherUser).then((room) => {
          console.log(room);
          setCurrentRoom(room);
        });
      }
    });
  }, [currentRoom]);

  useEffect(() => {
    if (currentOtherUser === null) return;
    getOneRoom(currentOtherUser).then((room) => {
      setCurrentRoom(room);
    });
  }, [currentOtherUser]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const openRoom = (currentOtherUser: number) => {
    setCurrentOtherUser(currentOtherUser);
  };

  const backToPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentOtherUser(null);
    setCurrentRoom(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={handleModal}>
        {isOpen && currentRoom && (
          <button onClick={backToPreview}>
            <ArrowLeft />
          </button>
        )}
        <p>{currentRoom ? currentRoom.otherUser.username : "Messagerie"}</p>
        <button onClick={handleModal}>
          <span className="sr-only">
            {isOpen ? "Ouvrir" : "Fermer"} la messagerie
          </span>
          {isOpen ? <CaretDown /> : <CaretUp />}
        </button>
      </div>
      {isOpen && currentOtherUser === null && (
        <ul className={styles.chat}>
          {rooms.map((room: RoomPreviewType) => (
            <li key={room.id}>
              <RoomPreview
                room={room}
                onClick={() => openRoom(room.otherUser.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {isOpen && currentOtherUser !== null && currentRoom && (
        <RoomView socket={socket} currentRoom={currentRoom} />
      )}
    </div>
  );
};

export default Chat;
