import Layout from "@/src/app/components/layout/Layout";
import ArticleCard from "@/src/article/components/article-card/ArticleCard";
import { getAllItems } from "@/src/article/services/item.service";
import { ArticleType } from "@/src/article/types/article";
import Link from "next/link";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/pages/AllArticles.module.scss";
import useDebounce from "@/src/app/hooks/useDebounce";
import { getAllCategories } from "@/src/app/services/category.service";
import { Category } from "@/src/app/types/category";

type Props = {
  defaultArticles: ArticleType[];
  defaultCategory?: number;
  categories: Category[];
  defaultTotal: number;
  defaultHasMore: boolean;
};

const AllArticles = ({
  defaultArticles,
  defaultCategory,
  categories,
  defaultTotal,
  defaultHasMore,
}: Props) => {
  const defaultFilters = {
    category: defaultCategory ? defaultCategory : "",
    againstCategory: "",
    search: "",
    limit: 12,
    isAvailable: true,
  };
  const [articles, setArticles] = useState<ArticleType[]>(defaultArticles);
  const [total, setTotal] = useState(defaultTotal);
  const [hasMore, setHasMore] = useState(defaultHasMore);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);

  const debouncedFilters = useDebounce(filters, 500);

  const handleIncrementPage = () => {
    setPage(page + 1);
  };

  const handleChangeFilters = async (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  useEffect(() => {
    if (hasMore) {
      window.addEventListener("scroll", (e) => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100
        ) {
          setHasMore(false);
          handleIncrementPage();
        }
      });
    } else {
      window.removeEventListener("scroll", () => {});
    }
    return () => window.removeEventListener("scroll", () => {});
  }, [hasMore, debouncedFilters]);

  useEffect(() => {
    if (JSON.stringify(filters) === JSON.stringify(defaultFilters)) {
      setArticles(defaultArticles);
      setTotal(defaultTotal);
      setHasMore(defaultHasMore);
      return;
    }
    const fetchArticles = async () => {
      const data = await getAllItems(filters);
      setArticles(data.items);
      setTotal(data.total);
      setHasMore(data.hasMore);
    };
    fetchArticles();
  }, [debouncedFilters]);

  useEffect(() => {
    if (page === 1) return;
    const fetchArticles = async () => {
      const query = {
        ...filters,
        page,
      };
      const newData = await getAllItems(query);
      setArticles([...articles, ...newData.items]);
      setHasMore(newData.hasMore);
    };
    fetchArticles();
  }, [page]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className="container">
          <h1 className={styles.title}>Tous les articles</h1>
          <div className={styles.filters}>
            <div className="m-input">
              <MagnifyingGlass />
              <input
                type="text"
                name="search"
                placeholder="Rechercher un article"
                value={filters.search}
                onChange={handleChangeFilters}
              />
            </div>
            <h2 className={styles.subtitle}>Filtres</h2>
            <div className={styles.selects}>
              <div className={styles.select}>
                <label className="m-label" htmlFor="category">
                  Catégorie :
                </label>
                <div className="m-select">
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleChangeFilters}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                  </select>
                  <CaretDown />
                </div>
              </div>
              <div className={styles.select}>
                <label className="m-label" htmlFor="againstCategory">
                  En échange de :
                </label>
                <div className="m-select">
                  <select
                    id="againstCategory"
                    name="againstCategory"
                    value={filters.againstCategory}
                    onChange={handleChangeFilters}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                  </select>
                  <CaretDown />
                </div>
              </div>
            </div>
          </div>
          <p className={styles.total}>
            {total} résultat{total > 1 && "s"} de recherche
          </p>
          <ul className="m-grid">
            {articles &&
              articles.map((article: ArticleType) => (
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

export default AllArticles;

export async function getServerSideProps(ctx: any) {
  const { query } = ctx;
  const { category } = query;
  const LIMIT = 12;

  const articlesQuery = {
    limit: LIMIT,
    category,
  };

  const articles = await getAllItems(articlesQuery);
  const categories = await getAllCategories();

  return {
    props: {
      defaultArticles: articles.items,
      defaultTotal: articles.total,
      defaultHasMore: articles.hasMore,
      defaultCategory: category ? category : null,
      categories,
    },
  };
}
