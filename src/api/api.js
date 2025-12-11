import axios from "axios";
import authStore from "../store/authStore";

export const API = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com/api/v1",
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
    if (error.response && error.response.status === 401) {
      authStore.getState().logout();
      localStorage.removeItem("access");
      window.location.href = "/login";
      s;
    }
    return Promise.reject(error);
  }
);
