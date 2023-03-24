import axios from "axios";
import { getTokenFromCookie } from "./authorizations";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

const createHeaders = (token?: string, formData: boolean = false) => {
  const contentType = formData ? "multipart/form-data" : "application/json";
  if (token) {
    return {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": contentType,
    };
  } else {
    return {
      "Content-Type": contentType,
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

export const postRequest = (
  url: string,
  formData: any,
  formDataType: boolean = false
) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token, formDataType);
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headersWithToken });
};

export const putRequest = (url: string, formData: object) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token);
  const finalUrl = apiurl + url;
  return axios.put(finalUrl, formData, { headers: headersWithToken });
};

export const patchRequest = (
  url: string,
  formData: object,
  formDataType: boolean = false
) => {
  const token = getTokenFromCookie();
  const headersWithToken = createHeaders(token, formDataType);
  const finalUrl = apiurl + url;
  return axios.patch(finalUrl, formData, { headers: headersWithToken });
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
