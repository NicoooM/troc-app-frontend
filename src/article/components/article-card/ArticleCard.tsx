import { ArticleType } from "@/src/article/types/article";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./ArticleCard.module.scss";
import { readableDate } from "@/src/app/utils/formatDate";
import { Article } from "phosphor-react";

type Props = {
  article: ArticleType;
};

const ArticleCard = ({ article }: Props) => {
  const date = useMemo(() => {
    return readableDate(article.createdAt);
  }, [article.createdAt]);

  const renderImage = () => {
    if (article.files.length > 0) {
      return <Image src={article.files[0].Location} fill alt={article.title} />;
    } else {
      return <Article />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>{renderImage()}</div>
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
