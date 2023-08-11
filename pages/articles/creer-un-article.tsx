import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/src/styles/pages/CreateArticle.module.scss";
import ArticleForm from "@/src/article/components/article-form/ArticleForm";

export default function CreateArticlePage() {
  return (
    <ProfileLayout needAuth={true}>
      <Layout>
        <main className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Créer une offre</h1>
            <ArticleForm />
          </div>
        </main>
      </Layout>
    </ProfileLayout>
  );
}
