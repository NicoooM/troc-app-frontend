import { UpdateUser } from "../types/user";
import { getRequest, patchRequest, postRequest } from "../utils/useApi";

export const getUser = async (username: string) => {
  const response = await getRequest(`/users/${username}`);
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await getRequest(`/users/${username}`);
  return response.data;
};

export const getMe = async () => {
  console.log("getMe");
  const response = await getRequest("/users/me");
  return response.data;
};

export const updateUser = async (updateUser: UpdateUser) => {
  const response = await patchRequest("/users", updateUser);
  return response.data;
};
