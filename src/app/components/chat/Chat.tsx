import { ArrowLeft, CaretDown, CaretUp } from "phosphor-react";
import styles from "./Chat.module.scss";
import { useEffect, useState } from "react";
import { getAllRooms, getOneRoom } from "@/src/services/room.service";
import { Room, RoomPreviewType } from "@/src/types/room";
import RoomPreview from "@/src/chat/components/room-preview/RoomPreview";
import RoomView from "@/src/chat/components/room-view/RoomView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";
import { UserType } from "@/src/types/user";
import socket from "@/src/utils/socket";
import {
  setModal,
  setCurrentOtherUser,
  setRooms,
} from "@/src/redux/slices/chatSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state: RootState) => state.chat);
  const { modalOpened, currentOtherUser, rooms } = chat;

  useEffect(() => {
    getAllRooms()
      .then((rooms) => {
        dispatch(setRooms(rooms));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.on("chat", (data: any) => {
      getAllRooms()
        .then((rooms) => {
          dispatch(setRooms(rooms));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const handleModal = () => {
    dispatch(setModal(!modalOpened));
  };

  const openRoom = (currentOtherUser: UserType) => {
    dispatch(setCurrentOtherUser(currentOtherUser));
  };

  const backToPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setCurrentOtherUser(null));
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={handleModal}>
        {modalOpened && currentOtherUser && (
          <button onClick={backToPreview}>
            <ArrowLeft />
          </button>
        )}
        <p>{currentOtherUser ? currentOtherUser.username : "Messagerie"}</p>
        <button onClick={handleModal}>
          <span className="sr-only">
            {modalOpened ? "Ouvrir" : "Fermer"} la messagerie
          </span>
          {modalOpened ? <CaretDown /> : <CaretUp />}
        </button>
      </div>
      {modalOpened && currentOtherUser === null && (
        <ul className={styles.chat}>
          {rooms.map((room: RoomPreviewType) => (
            <li key={room.id}>
              <RoomPreview
                room={room}
                onClick={() => openRoom(room.otherUser)}
              />
            </li>
          ))}
        </ul>
      )}
      {modalOpened && currentOtherUser !== null && (
        <RoomView socket={socket} currentOtherUser={currentOtherUser} />
      )}
    </div>
  );
};

export default Chat;
