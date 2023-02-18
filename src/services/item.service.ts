import { Article } from "../types/article";
import { getRequest, postRequest } from "../utils/useApi";

export const createItem = async (data: Article) => {
  const response = await postRequest("/items", data);
  return response.data;
};
