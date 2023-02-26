import Layout from "@/src/app/components/layout/Layout";
import { getItem } from "@/src/services/item.service";

const SingleArticle = ({ article }: any) => {
  return (
    <Layout>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </Layout>
  );
};

export default SingleArticle;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const article = await getItem(slug);
  return {
    props: {
      article,
    },
  };
}
