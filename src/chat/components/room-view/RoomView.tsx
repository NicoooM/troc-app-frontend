import { Room } from "@/src/types/room";
import styles from "./RoomView.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";
import { User } from "phosphor-react";

type Props = {
  currentRoom: Room;
};

const RoomView = ({ currentRoom }: Props) => {
  console.log(currentRoom);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.picture}>
          <User weight="fill" />
        </div>
        <div>
          <p className={styles.username}>{currentRoom.otherUser.username}</p>
        </div>
      </div>
      <div className={styles.messages}>
        {currentRoom.messages.map((message) => (
          <div key={message.id} className={styles.message}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomView;
