import axios from "axios";
import { BASE_URL } from "./config";
import { toast } from "sonner";

export const _axios = axios.create({
  baseURL: BASE_URL,
});

_axios.interceptors.request.use((config) => {
  const E_UserAuthToken = localStorage.getItem("E_UserAuthToken");
  if (E_UserAuthToken) {
    config.headers.Authorization = `Bearer ${E_UserAuthToken}`;
  }
  return config;
});

_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      toast.error("Session Expired! Login Again");
      window.location.href = "/auth-login";
      window.alert("Session Expired! Login Again");
    }
    return Promise.reject(error);
  }
);
