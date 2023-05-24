import Dropdown from "@/src/app/components/dropdown/Dropdown";
import { ArticleType } from "@/src/article/types/article";
import Link from "next/link";
import { Check, DotsThreeVertical, PencilSimple, Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./ArticleOptions.module.scss";
import Modal from "@/src/app/components/modal/Modal";
import { deleteItem, updateItem } from "@/src/article/services/item.service";

type Props = {
  article: ArticleType;
  setUpdateArticles: (updateArticles: boolean) => void;
};

const ArticleOptions = ({ article, setUpdateArticles }: Props) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showValidatePopup, setShowValidatePopup] = useState(false);

  const handleDeletePopupOpen = () => {
    setShowDeletePopup(true);
  };

  const handleDeletePopupClose = () => {
    setShowDeletePopup(false);
  };

  const handleValidatePopupOpen = () => {
    setShowValidatePopup(true);
  };

  const handleValidatePopupClose = () => {
    setShowValidatePopup(false);
  };

  const handleDeleteArticle = async () => {
    try {
      await deleteItem(article.id);
      window.scrollTo(0, 0);
      handleDeletePopupClose();
      setUpdateArticles(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidateArticle = async () => {
    try {
      await updateItem(article.id, { isAvailable: true });
      window.scrollTo(0, 0);
      handleValidatePopupClose();
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
            <button
              className={styles.optionButton}
              onClick={handleValidatePopupOpen}
            >
              <Check />
              <p className={styles.optionName}>Échange validé</p>
            </button>
            {showValidatePopup && (
              <Modal setIsOpen={setShowValidatePopup} title="Échange validé">
                <div className={styles.popup}>
                  <p className={styles.popupTitle}>
                    Confirmer que l’offre “<b>{article.title}</b>” a bien été
                    échangée ? Cela va enlever cette offre des résultats de
                    recherches. Cette action est irréversible.
                  </p>
                  <div className={styles.buttons}>
                    <button
                      className="m-button m-button--fit-content m-button--grey"
                      onClick={handleValidatePopupClose}
                    >
                      Annuler
                    </button>
                    <button
                      className="m-button m-button--fit-content m-button--green"
                      onClick={handleValidateArticle}
                    >
                      Valider
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </li>
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
            <button
              className={styles.optionButton}
              onClick={handleDeletePopupOpen}
            >
              <Trash />
              <p className={styles.optionName}>Supprimer l'offre</p>
            </button>
            {showDeletePopup && (
              <Modal setIsOpen={setShowDeletePopup} title="Supprimer l’offre">
                <div className={styles.popup}>
                  <p className={styles.popupTitle}>
                    Voulez-vous vraiment supprimer l’offre “
                    <b>{article.title}</b>” ? Cette action est irréversible.
                  </p>
                  <div className={styles.buttons}>
                    <button
                      className="m-button m-button--fit-content m-button--grey"
                      onClick={handleDeletePopupClose}
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
