import { ArticleType } from "@/src/types/article";
import Image from "next/image";
import { Article } from "phosphor-react";
import { useMemo } from "react";
import styles from "./SearchResult.module.scss";

type Props = {
  article: ArticleType;
};

const SearchResult = ({ article }: Props) => {
  const renderImage = () => {
    if (article.files.length > 0) {
      return <Image src={article.files[0].Location} fill alt={article.title} />;
    } else {
      return <Article />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>{renderImage()}</div>
      <p className={styles.title}>{article.title}</p>
    </div>
  );
};

export default SearchResult;
