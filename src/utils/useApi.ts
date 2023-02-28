import axios from "axios";
import { getTokenFromCookie } from "./authorizations";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

const createHeaders = (token?: string) => {
  if (token) {
    return {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export const getRequest = (url: string, formData?: object) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token);

  const finalUrl = apiurl + url;

  if (formData) {
    return axios.get(finalUrl, { headers: headersWithToken, params: formData });
  } else {
    return axios.get(finalUrl, { headers: headersWithToken });
  }
};

export const postRequestWithoutToken = (url: string, formData: object) => {
  const headersWithoutToken = createHeaders();
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headersWithoutToken });
};

export const postRequest = (url: string, formData: any) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token);
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headersWithToken });
};

export const putRequest = (url: string, formData: object) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token);
  const finalUrl = apiurl + url;
  return axios.put(finalUrl, formData, { headers: headersWithToken });
};

export const deleteRequest = (url: string) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token);
  const finalUrl = apiurl + url;
  return axios.delete(finalUrl, { headers: headersWithToken });
};

export const getExternalRequest = (url: string) => {
  return axios.get(url);
};
