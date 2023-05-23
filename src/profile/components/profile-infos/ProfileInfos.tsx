import { UserType } from "@/src/types/user";
import { User } from "phosphor-react";
import { useMemo } from "react";
import styles from "./ProfileInfos.module.scss";

type Props = {
  user: UserType;
  itemsCount: number;
};

const ProfileInfos = ({ user, itemsCount }: Props) => {
  const date = useMemo(() => {
    const date = new Date(user.createdAt);
    const result = date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return result;
  }, [user.createdAt]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profilePicture}>
        <User weight="fill" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.username}>{user.username}</h1>
        <p className={styles.articles}>
          {itemsCount} article{itemsCount > 1 && "s"} en attente d’échange
        </p>
        <p className={styles.date}>A rejoint le {date}</p>
      </div>
    </div>
  );
};

export default ProfileInfos;
