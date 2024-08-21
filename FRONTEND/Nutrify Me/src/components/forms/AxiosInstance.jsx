import axios from "axios";

const baseUrl = `http://127.0.0.1:8000/`;
//const baseUrl = `https://nightxperson.pythonanywhere.com/`;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
