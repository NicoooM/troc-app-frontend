import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getAllItems } from "@/src/services/item.service";
import { ArticleType } from "@/src/types/article";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";

type Props = {
  latestItems: ArticleType[];
};

const Home = ({ latestItems }: Props) => {
  return (
    <ProfileLayout>
      <Layout>
        <div className={styles.headWrapper}>
          <div className={styles.image}>
            <Image
              src="https://images.unsplash.com/photo-1677629828024-7793ff7d9403?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
              fill
              alt=""
            />
          </div>
          <div className={styles.intro}>
            <h1 className={styles.introTitle}>
              Le premier site de troc en France. Echangez dès maintenant les
              objets que vous ne voulez plus.
            </h1>
            <div className={styles.buttons}>
              <Link
                href="/articles"
                className="m-button m-button--green m-button--fit-content"
              >
                Voir les offres
              </Link>
              <Link
                href="/articles/creer-un-article"
                className="m-button m-button--secondary m-button--fit-content"
              >
                Déposer une annonce
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          {latestItems && (
            <div className={styles.articles}>
              <div className={styles.articlesHead}>
                <h2 className={styles.articlesTitle}>Les dernières offres</h2>
                <Link href="/articles" className={styles.articlesLink}>
                  Tout voir
                </Link>
              </div>
              <ul className="m-grid">
                {latestItems.map((article: ArticleType) => (
                  <li className="m-grid__item" key={article.slug}>
                    <Link href={`/articles/${article.slug}`}>
                      <ArticleCard article={article} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </ProfileLayout>
  );
};

export default Home;

export async function getServerSideProps() {
  const LIMIT = 4;

  const latestPostsQuery = {
    limit: LIMIT,
  };

  const latestItems = await getAllItems(latestPostsQuery);
  return {
    props: {
      latestItems: latestItems.items,
    },
  };
}
