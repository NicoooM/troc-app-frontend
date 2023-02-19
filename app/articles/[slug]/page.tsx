import { Article } from "@/src/types/article";
import { getItem } from "@/src/services/item.service";

const getData = async (slug: string): Promise<Article | null> => {
  const response = await getItem(slug);
  return response;
};

export default async function ArticlesPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getData(params.slug);

  return (
    <main>
      <h1>Une offre</h1>
      {article && (
        <li key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <p>{article.category.title}</p>
          <p>{article.againstCategory.title}</p>
        </li>
      )}
    </main>
  );
}
