import { Article } from "@/src/types/article";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./SearchResult.module.scss";

type Props = {
  article: Article;
};

const SearchResult = ({ article }: Props) => {
  const renderImage = useMemo(() => {
    return (
      <div className={styles.image}>
        <Image
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80"
          fill
          alt={article.title}
        />
      </div>
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      {renderImage}
      <p className={styles.title}>{article.title}</p>
    </div>
  );
};

export default SearchResult;
