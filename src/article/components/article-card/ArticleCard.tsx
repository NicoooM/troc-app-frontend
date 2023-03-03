import { Article } from "@/src/types/article";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./ArticleCard.module.scss";
import { readableDate } from "@/src/utils/formatDate";
import ArticleOptions from "../article-options/ArticleOptions";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  const date = useMemo(() => {
    return readableDate(article.createdAt);
  }, [article.createdAt]);

  const renderImage = useMemo(() => {
    return (
      <Image
        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80"
        fill
        alt={article.title}
      />
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>{renderImage}</div>
      <div className={styles.content}>
        <p className={styles.title}>{article.title}</p>
        <p className={styles.subtitle}>
          En échange de {article.againstCategory.title}
        </p>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
