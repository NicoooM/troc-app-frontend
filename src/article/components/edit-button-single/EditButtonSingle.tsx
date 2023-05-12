import styles from "./EditButtonSingle.module.scss";
import { RootState } from "@/src/redux/store/store";
import Link from "next/link";
import { Pencil } from "phosphor-react";
import { useSelector } from "react-redux";

type Props = {
  slug: string;
  ownerId: number;
};

const EditButtonSingle = ({ slug, ownerId }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user || !user.email) return null;
  if (user.id !== ownerId) return null;

  return (
    <Link
      href={`/articles/${slug}/modifier-article`}
      className="m-button m-button--green"
    >
      Modifier mon offre
      <Pencil className={styles.contactIcon} />
    </Link>
  );
};

export default EditButtonSingle;
