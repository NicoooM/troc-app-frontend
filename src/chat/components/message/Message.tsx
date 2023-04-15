import { MessageType } from "@/src/types/message";
import styles from "./Message.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store/store";
import { readableDate } from "@/src/utils/formatDate";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const date = readableDate(message.createdAt);
  return (
    <div
      className={user.id === message.sender.id ? styles.sent : styles.received}
    >
      <p className={styles.content}>{message.content}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default Message;
