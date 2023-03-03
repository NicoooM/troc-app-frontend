import Layout from "@/src/app/components/layout/Layout";
import ProfileInfos from "@/src/profile/components/profile-infos/ProfileInfos";
import { MagnifyingGlass } from "phosphor-react";
import styles from "@/styles/pages/Profile.module.scss";
import { UserType } from "@/src/types/user";
import { getUser } from "@/src/services/user.service";
import { AllArticles, Article } from "@/src/types/article";
import { getAllItems } from "@/src/services/item.service";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
import Link from "next/link";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";

type Props = {
  user: UserType;
  articlesData: AllArticles;
};

const SingleUser = ({ user, articlesData }: Props) => {
  const LIMIT = 12;
  const [articles, setArticles] = useState<Article[]>(articlesData.items);
  const [hasMore, setHasMore] = useState(articlesData.hasMore);
  const [page, setPage] = useState(1);
  const [totalSearch, setTotalSearch] = useState<null | number>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleIncrementPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (user.id && search === "") {
      setPage(1);
      setArticles(articlesData.items);
      setHasMore(articlesData.hasMore);
      setTotalSearch(null);
    }
  }, [user, debouncedSearch]);

  useEffect(() => {
    if (user.id && search !== "") {
      const query = {
        limit: LIMIT,
        userId: user.id,
        search,
      };
      getAllItems(query).then((data) => {
        setArticles(data.items);
        setTotalSearch(data.total);
        setHasMore(data.hasMore);
        setPage(1);
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (user.id && page > 1) {
      const query = {
        limit: LIMIT,
        page,
        userId: user.id,
        search,
      };
      getAllItems(query).then((data) => {
        setArticles([...articles, ...data.items]);
        setHasMore(data.hasMore);
      });
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setHasMore(false);
        handleIncrementPage();
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, debouncedSearch]);

  const renderTotalSearchCount = useMemo(() => {
    if (totalSearch !== null) {
      return (
        <p className={styles.articlesCount}>
          {totalSearch} résultat{totalSearch > 1 && "s"} de recherche
        </p>
      );
    }
  }, [totalSearch]);

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
        </div>
        <div className={styles.articles}>
          <div className={styles.articlesHead}>
            <h2 className={styles.articlesTitle}>Mes offres en cours</h2>
            <div className={styles.search}>
              <div className="m-input">
                <MagnifyingGlass />
                <input
                  type="text"
                  placeholder="Rechercher"
                  name="search"
                  value={search}
                  onChange={handleChangeSearch}
                />
              </div>
            </div>
          </div>
          {renderTotalSearchCount}
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
      </div>
    </Layout>
  );
};

export default SingleUser;

export async function getServerSideProps(ctx: any) {
  const LIMIT = 12;

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
