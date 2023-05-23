import { CreateArticle } from "@/src/article/types/article";
import Image from "next/image";
import { Trash } from "phosphor-react";
import styles from "./FilePreview.module.scss";

type Props = {
  file: any;
  setArticle: (article: CreateArticle) => void;
  article: CreateArticle;
};

const FilePreview = ({ file, setArticle, article }: Props) => {
  const handleDelete = () => {
    setArticle({
      ...article,
      files: article.files.filter((f: any) => f.name !== file.name),
    });
  };

  return (
    <div className={styles.file}>
      <Image src={file.image} alt={file.name} fill />
      <button type="button" className={styles.delete} onClick={handleDelete}>
        <span className="sr-only">Supprimer</span>
        <Trash />
      </button>
    </div>
  );
};

export default FilePreview;
