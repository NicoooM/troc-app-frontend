import { Article } from "@/src/types/article";
import { getAllItems } from "@/src/services/item.service";

const getData = async (): Promise<Article[] | null> => {
  const response = await getAllItems();
  return response;
};

export default async function ArticlesPage() {
  const data = await getData();

  return (
    <main>
      <h1>Toutes les offres</h1>
      {data && data.length > 0 && (
        <ul>
          {data?.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p>{article.category.title}</p>
              <p>{article.againstCategory.title}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
