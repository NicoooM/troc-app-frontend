import { getRequest, postRequest } from "../utils/useApi";

export const getMe = async () => {
  const response = await getRequest("/users/me");
  return response.data;
};
