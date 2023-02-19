import axios from "axios";
import { getTokenFromCookie } from "./authorizations";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

const token =
  getTokenFromCookie() ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29AZ21haWwuY29tIiwiaWF0IjoxNjc1OTgyMTY5fQ.XtR9CenW58t9LhU8jJjvZyfX2dX4Ed0hP9oZS_NpEOA";

const headersWithToken = {
  Authorization: "Bearer " + token,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const headersWithoutToken = {
  "Content-Type": "application/json",
};

export const getRequest = (url: string, formData?: object) => {
  const finalUrl = apiurl + url;

  if (formData) {
    return axios.get(finalUrl, { headers: headersWithToken, params: formData });
  } else {
    return axios.get(finalUrl, { headers: headersWithToken });
  }
};

export const postRequestWithoutToken = (url: string, formData: object) => {
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headersWithoutToken });
};

export const postRequest = (url: string, formData: any) => {
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headersWithToken });
};

export const putRequest = (url: string, formData: object) => {
  const finalUrl = apiurl + url;
  return axios.put(finalUrl, formData, { headers: headersWithToken });
};

export const deleteRequest = (url: string) => {
  const finalUrl = apiurl + url;
  return axios.delete(finalUrl, { headers: headersWithToken });
};

export const getExternalRequest = (url: string) => {
  return axios.get(url);
};
