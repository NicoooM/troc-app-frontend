import { LoginUser, RegisterUser } from "../types/user";
import { postRequestWithoutToken } from "../utils/useApi";

export const login = async (data: LoginUser) => {
  const response = await postRequestWithoutToken("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterUser) => {
  const response = await postRequestWithoutToken("/auth/register", data);
  return response.data;
};
