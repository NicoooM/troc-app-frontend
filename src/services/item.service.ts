import {
  AllArticles,
  ArticleType,
  CreateArticle,
  UpdateArticle,
} from "../types/article";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../utils/useApi";

export const createItem = async (data: CreateArticle) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category.toString());
  formData.append("againstCategory", data.againstCategory.toString());
  if (data.files && data.files.length > 0) {
    data.files.forEach((file: any) => {
      formData.append("files", file);
    });
  }
  const response = await postRequest("/items", formData, true);
  return response.data;
};

export const getAllItems = async (queries?: any): Promise<AllArticles> => {
  const response = await getRequest("/items", queries);
  return response.data;
};

export const getItem = async (slug: string): Promise<ArticleType> => {
  const response = await getRequest(`/items/${slug}`);
  return response.data;
};

export const updateItem = async (
  id: number,
  data: UpdateArticle
): Promise<ArticleType> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category.toString());
  formData.append("againstCategory", data.againstCategory.toString());
  if (data.files && data.files.length > 0) {
    data.files.forEach((file: any) => {
      formData.append("files", file);
    });
  }
  if (data.filesToDelete && data.filesToDelete.length > 0) {
    data.filesToDelete.forEach((file: any) => {
      formData.append("filesToDelete", file);
    });
  }
  const response = await patchRequest(`/items/${id}`, formData, true);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await deleteRequest(`/items/${id}`);
  return response.data;
};
