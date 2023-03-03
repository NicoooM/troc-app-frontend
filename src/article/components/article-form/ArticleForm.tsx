import { getAllCategories } from "@/src/services/category.service";
import { createItem, updateItem } from "@/src/services/item.service";
import { Article, CreateArticle } from "@/src/types/article";
import { Category } from "@/src/types/category";
import { CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./ArticleForm.module.scss";

type Props = {
  data?: Article;
  isEdit?: boolean;
};

const ArticleForm = ({ data, isEdit = false }: Props) => {
  const [article, setArticle] = useState<CreateArticle>({} as CreateArticle);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setArticle({
        title: data.title,
        description: data.description,
        category: data.category.id,
        againstCategory: data.againstCategory.id,
      });
    }
    setMounted(true);
  }, [data]);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit && data) {
      try {
        const item = await updateItem(data.id, article);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const item = await createItem(article);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {mounted && (
        <>
          <div className={styles.inputsRow}>
            <div className={styles.inputItem}>
              <label htmlFor="title" className="m-label">
                Nom de l’objet
              </label>
              <div className="m-input">
                <input
                  type="text"
                  id="title"
                  placeholder="Nom de l’objet"
                  onChange={handleChange}
                  name="title"
                  value={article.title}
                />
              </div>
            </div>
          </div>
          <div className={styles.inputsRow}>
            <div className={styles.inputItem}>
              <label htmlFor="category" className="m-label">
                Catégorie de l’objet
              </label>
              <div className="m-select">
                <select
                  id="category"
                  onChange={handleChange}
                  name="category"
                  value={article.category}
                  style={article.category === -1 ? { color: "#718096" } : {}}
                >
                  <option value={-1}>Choisir une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <CaretDown />
              </div>
            </div>
            <div className={styles.inputItem}>
              <label htmlFor="againstCategory" className="m-label">
                Catégorie d’objet voulue en échange
              </label>
              <div className="m-select">
                <select
                  id="againstCategory"
                  onChange={handleChange}
                  name="againstCategory"
                  value={article.againstCategory}
                  style={
                    article.againstCategory === -1 ? { color: "#718096" } : {}
                  }
                >
                  <option value={-1}>Choisir une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <CaretDown />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="m-label">
              Détails de l’offre
            </label>
            <textarea
              id="description"
              placeholder="Détails de l’offre"
              onChange={handleChange}
              name="description"
              value={article.description}
              className="m-textarea"
            ></textarea>
          </div>
          <button
            className="m-button m-button--green m-button--fit-content"
            type="submit"
          >
            Créer l’offre
          </button>
        </>
      )}
    </form>
  );
};

export default ArticleForm;
