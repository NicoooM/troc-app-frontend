import { ChatDots } from "phosphor-react";
import styles from "./MessageButtonSingle.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/redux/store/store";
import { useRouter } from "next/router";
import { UserType } from "@/src/app/types/user";
import {
  setModal,
  setCurrentOtherUser,
  setNewChat,
} from "@/src/app/redux/slices/chatSlice";

type Props = {
  otherUser: UserType;
};

const MessageButtonSingle = ({ otherUser }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const sendMessage = () => {
    if (!user.email) {
      router.push("/compte/connexion");
    }
    dispatch(setNewChat(true));
    dispatch(setCurrentOtherUser(otherUser));
    dispatch(setModal(true));
  };

  if (user.id === otherUser.id) return null;

  return (
    <button className="m-button m-button--green" onClick={sendMessage}>
      Envoyer un message
      <ChatDots className={styles.contactIcon} />
    </button>
  );
};

export default MessageButtonSingle;
