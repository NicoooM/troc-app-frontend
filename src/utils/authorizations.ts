import { parseCookies, destroyCookie, setCookie } from "nookies";

export const setTokenCookie = (token: string) => {
  const cookiesOptions = {
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  };
  setCookie(null, "token", token, cookiesOptions);
  console.log("token set");
};

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
