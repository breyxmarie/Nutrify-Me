import axios from "axios";

const baseUrl = `https://nightxperson.pythonanywhere.com/`;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
