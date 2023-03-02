import Layout from "@/src/app/components/layout/Layout";
import ProfileInfos from "@/src/profile/components/profile-infos/ProfileInfos";
import { MagnifyingGlass } from "phosphor-react";
import styles from "@/styles/pages/Profile.module.scss";
import { UserType } from "@/src/types/user";
import { getUser } from "@/src/services/user.service";
import { AllArticles, Article } from "@/src/types/article";
import { getAllItems } from "@/src/services/item.service";
import { useState } from "react";
import { getTokenFromCookie } from "@/src/utils/authorizations";

type Props = {
  user: UserType;
  articlesData: AllArticles;
};

const SingleUser = ({ user, articlesData }: Props) => {
  const [articles, setArticles] = useState<Article[]>(articlesData.items);
  const [total, setTotal] = useState(articlesData.total);
  const [hasMore, setHasMore] = useState(articlesData.hasMore);
  console.log(articlesData);
  return (
    <Layout>
      <div className="container">
        <div className={styles.wrapper}>
          <p className={styles.title}>Mon profil</p>
          <div className={styles.head}>
            <div className={styles.profileInfos}>
              <ProfileInfos user={user} itemsCount={articlesData.total} />
            </div>
          </div>
          <div className={styles.articles}>
            <div className={styles.articlesHead}>
              <h2 className={styles.articlesTitle}>Mes offres en cours</h2>
              <div className={styles.search}>
                <div className="m-input">
                  <MagnifyingGlass />
                  <input type="text" placeholder="Rechercher" name="search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUser;

export async function getServerSideProps(ctx: any) {
  const LIMIT = 8;
  const token = getTokenFromCookie();

  console.log("token", token);
  const { username } = ctx.query;

  const user = await getUser(username);

  const userId = user.id;
  const query = {
    limit: LIMIT,
    userId,
  };

  const articlesData = await getAllItems(query);

  return {
    props: {
      user,
      articlesData,
    },
  };
}
