import { CreateArticle } from "@/src/types/article";
import Image from "next/image";
import { Trash } from "phosphor-react";
import styles from "./DefaultFilePreview.module.scss";

type Props = {
  file: any;
  setFilesToDelete: (filesToDelete: any[]) => void;
  filesToDelete: any[];
};

const DefaultFilePreview = ({
  file,
  setFilesToDelete,
  filesToDelete,
}: Props) => {
  const handleDelete = () => {
    setFilesToDelete([...filesToDelete, file.id]);
  };

  return (
    <div className={styles.file}>
      <Image src={file.Location} alt="" fill />
      <button type="button" className={styles.delete} onClick={handleDelete}>
        <span className="sr-only">Supprimer</span>
        <Trash />
      </button>
    </div>
  );
};

export default DefaultFilePreview;
