import { Category } from "./category";

export type CreateArticle = {
  title: string;
  description: string;
  category: number;
  againstCategory: number;
  files: any[];
};

export type ArticleType = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  isAvailable: boolean;
  category: Category;
  againstCategory: Category;
  user: any;
  slug: string;
  files: any[];
};

export type AllArticles = {
  items: ArticleType[];
  total: number;
  hasMore: boolean;
};

export type UpdateArticle = CreateArticle & {
  filesToDelete: number[];
};
