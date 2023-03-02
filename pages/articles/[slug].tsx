import Layout from "@/src/app/components/layout/Layout";
import ArticleSlider from "@/src/article/components/article-slider/ArticleSlider";
import { getItem } from "@/src/services/item.service";
import { Article } from "@/src/types/article";
import styles from "@/src/article/pages/Single.module.scss";
import { useMemo } from "react";
import { readableDate } from "@/src/utils/formatDate";

type Props = {
  article: Article;
};

const SingleArticle = ({ article }: Props) => {
  const date = useMemo(() => {
    return readableDate(article.createdAt);
  }, [article.createdAt]);

  return (
    <Layout>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.infoWrapper}>
            <div className={styles.slider}>
              <ArticleSlider />
            </div>
            <div className={styles.infos}>
              <div className={styles.infosContent}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.againstCategory}>
                  En échange de : {article.againstCategory.title}
                </p>
                <p className={styles.date}>Ajouté : {date}</p>
              </div>
            </div>
          </div>
          <h2 className={styles.subtitle}>Détails de l'offre</h2>
          <p className={styles.description}>{article.description}</p>
          <div className={styles.others}>
            <h2 className={styles.subtitle}>Autres articles de Nicolas</h2>
          </div>
          <div className={styles.others}>
            <h2 className={styles.subtitle}>Dans la même catégorie</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleArticle;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const article: Article = await getItem(slug);
  return {
    props: {
      article,
    },
  };
}
