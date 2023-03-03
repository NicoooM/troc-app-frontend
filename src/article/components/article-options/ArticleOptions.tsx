import Dropdown from "@/src/app/components/dropdown/Dropdown";
import { Article } from "@/src/types/article";
import Link from "next/link";
import { DotsThreeVertical, PencilSimple, Trash } from "phosphor-react";
import styles from "./ArticleOptions.module.scss";

type Props = {
  article: Article;
};

const ArticleOptions = ({ article }: Props) => {
  const handlePopupOpen = () => {
    console.log("popup open");
  };

  return (
    <Dropdown>
      <summary aria-label="Gérer l'article" className={styles.summary}>
        <DotsThreeVertical />
      </summary>
      <div className={styles.options}>
        <ul>
          <li>
            <Link
              className={styles.optionButton}
              href={`/articles/${article.slug}/modifier-article`}
            >
              <PencilSimple />
              <p className={styles.optionName}>Modifier l'offre</p>
            </Link>
          </li>
          <li>
            <button className={styles.optionButton} onClick={handlePopupOpen}>
              <Trash />
              <p className={styles.optionName}>Supprimer l'offre</p>
            </button>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
};

export default ArticleOptions;
