import { RoomPreviewType } from "@/src/chat/types/room";
import styles from "./RoomPreview.module.scss";
import { User } from "phosphor-react";

type Props = {
  room: RoomPreviewType;
  onClick: () => void;
};

const RoomPreview = ({ room, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.container}>
      <div className={styles.picture}>
        <User weight="fill" />
      </div>
      <div>
        <p className={styles.username}>{room.otherUser.username}</p>
        <p className={styles.message}>{room.latestMessage.content}</p>
      </div>
    </button>
  );
};

export default RoomPreview;
