import { getRequest } from "../utils/useApi";

export const getAllCategories = async () => {
  const response = await getRequest("/categories");
  return response.data;
};
