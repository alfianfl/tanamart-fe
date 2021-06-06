import axios from "axios";

const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;
export const getProduct = axios.create({
  baseURL: baseURL,
  headers: {},
});
