import axios from "axios";
import { useAuth } from "../hooks/use-auth";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

client.interceptors.request.use((config) => {
  const { token } = useAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
