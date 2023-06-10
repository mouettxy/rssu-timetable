import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://rssutimetable.ru/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export const API = axiosClient;
