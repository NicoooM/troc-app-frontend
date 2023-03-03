import { Category } from "./category";

export type CreateArticle = {
  title: string;
  description: string;
  category: number;
  againstCategory: number;
};

export type Article = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  isAvailable: boolean;
  category: Category;
  againstCategory: Category;
  user: any;
  slug: string;
};

export type AllArticles = {
  items: Article[];
  total: number;
  hasMore: boolean;
};
