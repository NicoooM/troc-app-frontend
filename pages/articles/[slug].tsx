import Layout from "@/src/app/components/layout/Layout";
import ArticleSlider from "@/src/article/components/article-slider/ArticleSlider";
import { getAllItems, getItem } from "@/src/services/item.service";
import { AllArticles, ArticleType } from "@/src/types/article";
import styles from "@/styles/pages/Single.module.scss";
import { useEffect, useMemo, useState } from "react";
import { readableDate } from "@/src/utils/formatDate";
import Link from "next/link";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";
import { User } from "phosphor-react";
import MessageButtonSingle from "@/src/chat/components/message-button-single/MessageButtonSingle";

type Props = {
  article: ArticleType;
  userArticles: ArticleType[];
  categoryArticles: ArticleType[];
};

const SingleArticle = ({ article, userArticles, categoryArticles }: Props) => {
  const renderUserPicture = useMemo(() => {
    return (
      <div className={styles.userIconWrapper}>
        <User className={styles.userIcon} weight="fill" />
      </div>
    );
  }, []);

  const date = useMemo(() => {
    return readableDate(article.createdAt);
  }, [article.createdAt]);

  return (
    <Layout>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.infoWrapper}>
            <div className={styles.slider}>
              <ArticleSlider images={article?.files} />
            </div>
            <div className={styles.infos}>
              <div className={styles.infosContent}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.againstCategory}>
                  En échange de : {article.againstCategory.title}
                </p>
                <p className={styles.date}>Ajouté : {date}</p>
                <Link
                  className={styles.user}
                  href={`/utilisateurs/${article.user.username}`}
                >
                  {renderUserPicture}
                  <div className={styles.userInfos}>
                    <p className={styles.username}>{article.user.username}</p>
                    <p className={styles.seeUser}>voir le profil</p>
                  </div>
                </Link>
                <MessageButtonSingle otherUser={article.user} />
              </div>
            </div>
          </div>
          <h2 className={styles.subtitle}>Détails de l'offre</h2>
          <p className={styles.description}>{article.description}</p>
          <div className={styles.others}>
            <h2 className={styles.subtitle}>
              Autres articles de {article.user.username}
            </h2>
            <ul className="m-grid">
              {userArticles &&
                userArticles.map((article: ArticleType) => (
                  <li className="m-grid__item" key={article.slug}>
                    <Link href={`/articles/${article.slug}`}>
                      <ArticleCard article={article} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.others}>
            <h2 className={styles.subtitle}>Dans la même catégorie</h2>
            <ul className="m-grid">
              {categoryArticles &&
                categoryArticles.map((article: ArticleType) => (
                  <li className="m-grid__item" key={article.slug}>
                    <Link href={`/articles/${article.slug}`}>
                      <ArticleCard article={article} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleArticle;

export async function getServerSideProps(context: any) {
  const LIMIT = 4;
  const { slug } = context.params;
  const article: ArticleType = await getItem(slug);

  const category = article.category.id;
  const userId = article.user.id;

  const userArticlesQuery = {
    userId: userId,
    limit: LIMIT,
  };

  const categoryArticlesQuery = {
    category: category,
    limit: LIMIT,
  };

  const userArticles = await getAllItems(userArticlesQuery);
  const categoryArticles = await getAllItems(categoryArticlesQuery);

  return {
    props: {
      article,
      userArticles: userArticles.items,
      categoryArticles: categoryArticles.items,
    },
  };
}
