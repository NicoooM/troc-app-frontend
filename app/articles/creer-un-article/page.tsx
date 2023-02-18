"use client";

import { useState, useEffect } from "react";
import { Article } from "@/src/types/article";
import { Category } from "@/src/types/category";
import { getAllCategories } from "@/src/services/category.service";
import { createItem } from "@/src/services/item.service";

export default function CreateArticle() {
  const [article, setArticle] = useState<Article>({
    title: "",
    description: "",
    category: 0,
    againstCategory: 0,
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
      console.log(item);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Créer une offre</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="" className="m-label">
            Nom de l’objet
          </label>
          <input
            type="text"
            placeholder="Nom de l’objet"
            onChange={handleChange}
            name="title"
            value={article.title}
            className="m-input"
          />
        </div>
        <div>
          <label htmlFor="" className="m-label">
            Détails de l’offre
          </label>
          <textarea
            placeholder="Détails de l’offre"
            onChange={handleChange}
            name="description"
            value={article.description}
            className="m-input"
          ></textarea>
        </div>
        <div>
          <label htmlFor="" className="m-label">
            Catégorie de l’objet
          </label>
          <select onChange={handleChange} name="category" className="m-input">
            <option value={-1}>Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="" className="m-label">
            Catégorie d’objet voulue en échange
          </label>
          <select
            placeholder="Détails de l’offre"
            onChange={handleChange}
            name="againstCategory"
            className="m-input"
          >
            <option value={-1}>Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button className="m-button m-button--green" type="submit">
          Créer l’offre
        </button>
      </form>
    </main>
  );
}
