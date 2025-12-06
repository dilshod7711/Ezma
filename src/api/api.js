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
