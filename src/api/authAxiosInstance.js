import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import i18n from "../i18next";

const token = useAuthStore.getState().token;
const authAxiosInstance = axios.create(
  {
    baseURL: `${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
    headers: {
      "Authorization": `Bearer ${token}` /* sends the authantication that i'm the user Abood for example */
    }
  }
);

authAxiosInstance.interceptors.request.use((config)=>{
  config.headers["Accept-Language"] = i18n.language;
  config.params = {
      ...config.params,
      lang: i18n.language
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
})

export default authAxiosInstance;