import { useState, useEffect } from "react";
import { CreateArticle } from "@/src/types/article";
import { Category } from "@/src/types/category";
import { getAllCategories } from "@/src/services/category.service";
import { createItem } from "@/src/services/item.service";
import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/CreateArticle.module.scss";
import { CaretDown } from "phosphor-react";

export default function CreateArticlePage() {
  const [article, setArticle] = useState<CreateArticle>({
    title: "",
    description: "",
    category: -1,
    againstCategory: -1,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const item = await createItem(article);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfilLayout needAuth={true}>
      <Layout>
        <main className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Créer une offre</h1>
            <form onSubmit={onSubmit}>
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
                      style={
                        article.category === -1 ? { color: "#718096" } : {}
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
                <div className={styles.inputItem}>
                  <label htmlFor="againstCategory" className="m-label">
                    Catégorie d’objet voulue en échange
                  </label>
                  <div className="m-select">
                    <select
                      id="againstCategory"
                      onChange={handleChange}
                      name="againstCategory"
                      style={
                        article.againstCategory === -1
                          ? { color: "#718096" }
                          : {}
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
            </form>
          </div>
        </main>
      </Layout>
    </ProfilLayout>
  );
}
