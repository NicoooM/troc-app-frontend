import Layout from "@/src/app/components/layout/Layout";
import { getItem } from "@/src/services/item.service";
import { Article } from "@/src/types/article";

type Props = {
  article: Article;
};

const SingleArticle = ({ article }: Props) => {
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
  const article: Article = await getItem(slug);
  return {
    props: {
      article,
    },
  };
}
