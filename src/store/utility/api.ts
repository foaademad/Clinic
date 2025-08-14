import axios from "axios";

export const API_BASE_URL = "https://clinic-beta-silk.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      // Surface useful backend error info in the console to debug 500s
      // eslint-disable-next-line no-console
      console.error("API error", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    } catch {}
    return Promise.reject(error);
  }
);

 