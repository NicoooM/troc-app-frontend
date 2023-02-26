import Layout from "@/src/app/components/layout/Layout";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";
import { getAllItems } from "@/src/services/item.service";
import { Article } from "@/src/types/article";
import Link from "next/link";

type Props = {
  articles: Article[];
};

const AllArticles = ({ articles }: Props) => {
  return (
    <Layout>
      <div className="container">
        <h1>Tous les articles</h1>
        <ul className="m-grid">
          {articles &&
            articles.map((article: Article) => (
              <li className="m-grid__item" key={article.slug}>
                <Link href={`/articles/${article.slug}`}>
                  <ArticleCard article={article} />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default AllArticles;

export async function getServerSideProps() {
  const articles = await getAllItems();

  return {
    props: {
      articles,
    },
  };
}
