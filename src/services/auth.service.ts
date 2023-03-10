import { LoginUser, RegisterUser, ResetPassword } from "../types/user";
import { postRequestWithoutToken } from "../utils/useApi";

export const login = async (data: LoginUser) => {
  const response = await postRequestWithoutToken("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterUser) => {
  const response = await postRequestWithoutToken("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await postRequestWithoutToken("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (data: ResetPassword) => {
  const response = await postRequestWithoutToken(
    `/auth/reset-password/${data.token}`,
    { password: data.password }
  );
  return response.data;
};
