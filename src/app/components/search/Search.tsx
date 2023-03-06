import useDebounce from "@/src/hooks/useDebounce";
import { getAllItems } from "@/src/services/item.service";
import { Article } from "@/src/types/article";
import Link from "next/link";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import SearchResult from "../search-result/SearchResult";
import styles from "./Search.module.scss";

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticles([]);
    setSearch(e.target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("click outside");
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setClickedOutside(true);
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      const query = {
        search: debouncedSearch,
        limit: 5,
      };
      getAllItems(query)
        .then((articles) => {
          setArticles(articles.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderResults = () => {
    if (articles.length > 0 && search !== "") {
      if (!clickedOutside || isFocused) {
        return (
          <div className={styles.results}>
            <ul>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/articles/${article.slug}`}>
                    <SearchResult article={article} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={"/articles"} className={styles.advancedSearch}>
              <p>Recherche avancée</p>
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.search}>
        <MagnifyingGlass />
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Rechercher un article"
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {renderResults()}
    </div>
  );
};

export default Search;
