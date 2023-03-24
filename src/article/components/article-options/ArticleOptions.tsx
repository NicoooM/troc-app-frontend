import Dropdown from "@/src/app/components/dropdown/Dropdown";
import { ArticleType } from "@/src/types/article";
import Link from "next/link";
import { DotsThreeVertical, PencilSimple, Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./ArticleOptions.module.scss";
import Modal from "@/src/app/components/modal/Modal";
import { deleteItem } from "@/src/services/item.service";

type Props = {
  article: ArticleType;
  setUpdateArticles: (updateArticles: boolean) => void;
};

const ArticleOptions = ({ article, setUpdateArticles }: Props) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDeleteArticle = async () => {
    try {
      await deleteItem(article.id);
      window.scrollTo(0, 0);
      setShowPopup(false);
      setUpdateArticles(true);
    } catch (error) {
      console.log(error);
    }
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
            {showPopup && (
              <Modal setIsOpen={setShowPopup} title="Supprimer l’offre">
                <div className={styles.popup}>
                  <p className={styles.popupTitle}>
                    Voulez-vous vraiment supprimer l’offre “
                    <b>{article.title}</b>” ? Cette action est irréversible.
                  </p>
                  <div className={styles.buttons}>
                    <button
                      className="m-button m-button--fit-content m-button--grey"
                      onClick={handlePopupClose}
                    >
                      Annuler
                    </button>
                    <button
                      className="m-button m-button--fit-content m-button--red"
                      onClick={handleDeleteArticle}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </li>
        </ul>
      </div>
    </Dropdown>
  );
};

export default ArticleOptions;
