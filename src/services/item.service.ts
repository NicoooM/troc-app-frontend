import { Article, CreateArticle } from "../types/article";
import { getRequest, postRequest } from "../utils/useApi";

export const createItem = async (data: CreateArticle) => {
  const response = await postRequest("/items", data);
  return response.data;
};

export const getAllItems = async (): Promise<Article[]> => {
  const response = await getRequest("/items");
  return response.data;
};

export const getItem = async (slug: string): Promise<Article> => {
  const response = await getRequest(`/items/${slug}`);
  return response.data;
};
