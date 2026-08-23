import axios from "axios";
import i18n from "../i18next";


const axiosInstance = axios.create(
  {
    baseURL:`${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
  }
);
axiosInstance.interceptors.request.use((config)=>{
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
export default axiosInstance;