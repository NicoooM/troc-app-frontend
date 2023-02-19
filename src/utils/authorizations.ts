import { parseCookies, destroyCookie } from "nookies";

export const getTokenFromCookie = () => {
  const { token } = parseCookies();
  return token;
};

export const getAuthorizationTokenHeader = () => {
  const token = getTokenFromCookie();
  if (token) {
    return { authorization: `Bearer ${token}` };
  }
  return {};
};

export const removeAuthorization = () => {
  destroyCookie(null, "token");
};
