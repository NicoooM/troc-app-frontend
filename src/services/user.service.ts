import { getRequest, postRequest } from "../utils/useApi";

export const getMe = async () => {
  console.log("getMe");
  const response = await getRequest("/users/me");
  return response.data;
};
