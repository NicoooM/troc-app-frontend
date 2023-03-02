import { AllArticles, Article, CreateArticle } from "../types/article";
import { getRequest, postRequest } from "../utils/useApi";

export const createItem = async (data: CreateArticle) => {
  const response = await postRequest("/items", data);
  return response.data;
};

export const getAllItems = async (queries?: any): Promise<AllArticles> => {
  const response = await getRequest("/items", queries);
  return response.data;
};

export const getItem = async (slug: string): Promise<Article> => {
  const response = await getRequest(`/items/${slug}`);
  return response.data;
};
