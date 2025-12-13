import axios from "axios";
import authStore from "../store/authStore";

export const API = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
});

API.interceptors.request.use((config) => {
  const { access } = authStore.getState();
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
      localStorage.removeItem("access");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
