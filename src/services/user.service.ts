import { getRequest, postRequest } from "../utils/useApi";

export const getUser = async (username: string) => {
  const response = await getRequest(`/users/${username}`);
  return response.data;
};

export const getMe = async () => {
  const response = await getRequest("/users/me");
  return response.data;
};
