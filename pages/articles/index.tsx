import Layout from "@/src/app/components/layout/Layout";
import { getAllItems } from "@/src/services/item.service";
import Link from "next/link";

const AllArticles = ({ articles }: any) => {
  return (
    <Layout>
      <h1>Tous les articles</h1>
      {articles &&
        articles.map((article: any) => (
          <Link href={`/articles/${article.slug}`} key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </Link>
        ))}
    </Layout>
  );
};

export default AllArticles;

export async function getServerSideProps() {
  const articles = await getAllItems();
  console.log(articles);

  return {
    props: {
      articles,
    },
  };
}
