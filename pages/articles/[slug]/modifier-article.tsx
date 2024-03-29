import ArticleForm from "@/src/article/components/article-form/ArticleForm";
import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import styles from "@/src/styles/pages/CreateArticle.module.scss";
import { getItem } from "@/src/article/services/item.service";
import { ArticleType } from "@/src/article/types/article";
import Layout from "@/src/app/components/layout/Layout";

type Props = {
  article: ArticleType;
};

const UpdateArticle = ({ article }: Props) => {
  return (
    <ProfileLayout needAuth={true}>
      <Layout>
        <main className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Modifier une offre</h1>
            <ArticleForm data={article} isEdit={true} />
          </div>
        </main>
      </Layout>
    </ProfileLayout>
  );
};

export default UpdateArticle;

export async function getServerSideProps(ctx: any) {
  const { slug } = ctx.params;
  const article = await getItem(slug);

  return {
    props: {
      article,
    },
  };
}
