import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import i18n from "../i18next";

const authAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
  timeout: 10000
});

authAxiosInstance.interceptors.request.use((config) => {
  if (!navigator.onLine) {
    const offlineMessage = i18n.language === "ar" ? "لا يوجد اتصال بالإنترنت" : "No internet connection";
    return Promise.reject({
      code: "ERR_OFFLINE",
      customMessage: offlineMessage,
      message: offlineMessage
    });
  }

  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; /* sends the authantication that i'm the user Abood for example */
  }
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!navigator.onLine || error.code === "ERR_NETWORK" || error.code === "ERR_OFFLINE") {
      error.customMessage = i18n.language === "ar" ? "لا يوجد اتصال بالإنترنت" : "No internet connection";
    } else if (error.code === "ECONNABORTED") {
      error.customMessage = i18n.language === "ar" ? "استغرق الطلب وقتاً طويلاً" : "Request timed out";
    }
    return Promise.reject(error);
  }
);

export default authAxiosInstance;