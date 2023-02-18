import axios from "axios";
// import { getTokenFromCookie } from "middlewares/authorizations";
// import moment from "moment";

/** headers REQUEST **/

const apiurl = process.env.NEXT_PUBLIC_API_URL;

export const getRequest = (url: string, formData?: object) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29AZ21haWwuY29tIiwiaWF0IjoxNjc1OTgyMTY5fQ.XtR9CenW58t9LhU8jJjvZyfX2dX4Ed0hP9oZS_NpEOA";
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const finalUrl = apiurl + url;

  if (formData) {
    return axios.get(finalUrl, { headers: headers, params: formData });
  } else {
    return axios.get(finalUrl, { headers: headers });
  }
};

export const postRequestWithoutToken = (url: string, formData: object) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, { headers: headers });
};

/** REQUETE POST avec header  **/

export const postRequest = (url: string, formData: any) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29AZ21haWwuY29tIiwiaWF0IjoxNjc1OTgyMTY5fQ.XtR9CenW58t9LhU8jJjvZyfX2dX4Ed0hP9oZS_NpEOA";
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const config = {
    headers: headers,
  };
  const finalUrl = apiurl + url;
  return axios.post(finalUrl, formData, config);
};

/** REQUETE PUT avec header  **/

export const putRequest = (url: string, formData: object) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29AZ21haWwuY29tIiwiaWF0IjoxNjc1OTgyMTY5fQ.XtR9CenW58t9LhU8jJjvZyfX2dX4Ed0hP9oZS_NpEOA";
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json ",
    "Content-Type": "application/json",
  };
  const finalUrl = apiurl + url;
  return axios.put(finalUrl, formData, { headers: headers });
};

/** REQUETE DELETE avec header  **/

export const deleteRequest = (url: string) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29AZ21haWwuY29tIiwiaWF0IjoxNjc1OTgyMTY5fQ.XtR9CenW58t9LhU8jJjvZyfX2dX4Ed0hP9oZS_NpEOA";
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const finalUrl = apiurl + url;
  return axios.delete(finalUrl, { headers: headers });
};

export const getExternalRequest = (url: string) => {
  return axios.get(url);
};
