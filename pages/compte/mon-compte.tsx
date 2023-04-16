import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import Layout from "@/src/app/components/layout/Layout";
import ProfileInfos from "@/src/profile/components/profile-infos/ProfileInfos";
import { RootState } from "@/src/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/Profile.module.scss";
import Link from "next/link";
import { MagnifyingGlass, PencilSimple, Plus, SignOut } from "phosphor-react";
import { removeAuthorization } from "@/src/utils/authorizations";
import { clearUser } from "@/src/redux/slices/userSlice";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { AllArticles, ArticleType } from "@/src/types/article";
import { getAllItems } from "@/src/services/item.service";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";
import useDebounce from "@/src/hooks/useDebounce";
import ArticleOptions from "@/src/article/components/article-options/ArticleOptions";
import { toast } from "react-toastify";
import { clearChat } from "@/src/redux/slices/chatSlice";

const MyAccount = () => {
  const LIMIT = 12;
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalSearch, setTotalSearch] = useState<null | number>(null);
  const [search, setSearch] = useState("");
  const [updateArticles, setUpdateArticles] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleIncrementPage = () => {
    setPage(page + 1);
  };

  const setDataSearch = (data: AllArticles) => {
    setArticles(data.items);
    setHasMore(data.hasMore);
    setPage(1);
    setUpdateArticles(false);
  };

  useEffect(() => {
    const query: any = {
      limit: LIMIT,
      userId: user.id,
    };
    if (updateArticles) {
      getAllItems(query)
        .then((data) => {
          setTotal(data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (search === "") {
      getAllItems(query)
        .then((data) => {
          setDataSearch(data);
          setTotal(data.total);
          setTotalSearch(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      query.search = search;
      getAllItems(query)
        .then((data) => {
          setDataSearch(data);
          setTotalSearch(data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, debouncedSearch, updateArticles]);

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

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearChat());
    removeAuthorization();
    toast.success("Vous êtes déconnecté");
    router.push("/");
  };

  return (
    <ProfileLayout needAuth={true}>
      <Layout>
        <div className="container">
          <div className={styles.wrapper}>
            <p className={styles.title}>Mon profil</p>
            <div className={styles.head}>
              <div className={styles.profileInfos}>
                <ProfileInfos user={user} itemsCount={total} />
              </div>
              <div className={styles.profileSetting}>
                <ul>
                  <li className={styles.profileSettingItem}>
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="/articles/creer-un-article"
                    >
                      <Plus />
                      Créer une offre
                    </Link>
                  </li>
                  <li className={styles.profileSettingItem}>
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="/compte/modifier-mon-profil"
                    >
                      <PencilSimple />
                      Modifier mon profil
                    </Link>
                  </li>
                  <li className={styles.profileSettingItem}>
                    <button
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      onClick={logout}
                    >
                      <SignOut />
                      Me déconnecter
                    </button>
                  </li>
                </ul>
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
                  articles.map((article: ArticleType) => (
                    <li className="m-grid__item" key={article.slug}>
                      <Link href={`/articles/${article.slug}`}>
                        <ArticleCard article={article} />
                      </Link>
                      <div className={styles.options}>
                        <ArticleOptions
                          article={article}
                          setUpdateArticles={setUpdateArticles}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </ProfileLayout>
  );
};

export default MyAccount;
