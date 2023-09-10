import { CreateArticle } from "@/src/article/types/article";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import DefaultFilePreview from "../default-file-preview/DefaultFilePreview";
import FilePreview from "../file-preview/FilePreview";
import styles from "./ArticleFiles.module.scss";

type Props = {
  article: CreateArticle;
  setArticle: (article: CreateArticle) => void;
  defaultFiles?: any[];
  filesToDelete?: number[];
  setFilesToDelete?: (filesToDelete: number[]) => void;
};

const ArticleFiles = ({
  article,
  setArticle,
  defaultFiles,
  filesToDelete,
  setFilesToDelete,
}: Props) => {
  const [filePreviews, setFilePreviews] = useState<any[]>([]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (article.files) {
        setArticle({
          ...article,
          files: [...article.files, e.target.files[0]],
        });
      } else {
        setArticle({ ...article, files: [e.target.files[0]] });
      }
    } else {
      setArticle({ ...article, files: [] });
    }
  };

  useEffect(() => {
    if (article.files?.length > 0) {
      const data: any[] = [];
      article.files.forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = reader.result;
          data.push({ image, name: file.name });
          setFilePreviews([...data]);
        };
      });
    } else {
      setFilePreviews([]);
    }
  }, [article.files]);

  const renderDefaultFiles = useMemo(() => {
    if (!filesToDelete || !setFilesToDelete) return null;
    return defaultFiles?.map((file, index) => {
      if (filesToDelete.includes(file.id)) return null;
      return (
        <li className={styles.gridItem} key={index}>
          <DefaultFilePreview
            file={file}
            filesToDelete={filesToDelete}
            setFilesToDelete={setFilesToDelete}
          />
        </li>
      );
    });
  }, [defaultFiles, filesToDelete]);

  const renderPreviewFiles = useMemo(() => {
    return filePreviews.map((file, index) => (
      <li className={styles.gridItem} key={index}>
        <FilePreview file={file} setArticle={setArticle} article={article} />
      </li>
    ));
  }, [filePreviews]);
  return (
    <>
      <div className={styles.inputsRow}>
        <div className={styles.inputItem}>
          <p className="m-label">Images (6 maximum)</p>
          <ul className={styles.grid}>
            {renderDefaultFiles}
            {renderPreviewFiles}
          </ul>
          {article.files?.length >= 0 && article.files?.length < 6 && (
            <div>
              <input
                type="file"
                id="files"
                hidden
                onChange={handleChangeFile}
              />
              <label className="m-file" htmlFor="files">
                Ajouter une image
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleFiles;
