import { CaretDown, CaretUp } from "phosphor-react";
import styles from "./Chat.module.scss";
import { useEffect, useState } from "react";
import { getAllRooms, getOneRoom } from "@/src/services/room.service";
import { Room, RoomPreviewType } from "@/src/types/room";
import RoomPreview from "@/src/chat/components/room-preview/RoomPreview";
import RoomView from "@/src/chat/components/room-view/RoomView";

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentOtherUser, setCurrentOtherUser] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllRooms()
      .then((rooms) => {
        console.log(rooms);
        setRooms(rooms);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (currentOtherUser === null) return;
    getOneRoom(currentOtherUser).then((room) => {
      setCurrentRoom(room);
    });
  }, [currentOtherUser]);

  const handleModal = () => {
    setIsOpen(!isOpen);
    setCurrentOtherUser(null);
  };

  const openRoom = (currentOtherUser: number) => {
    setCurrentOtherUser(currentOtherUser);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleModal}>
        <p>Messagerie</p>
        {isOpen ? <CaretDown /> : <CaretUp />}
      </button>
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
        <RoomView currentRoom={currentRoom} />
      )}
    </div>
  );
};

export default Chat;
