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
  category: any;
  againstCategory: any;
  user: any;
  slug: string;
};
