import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import i18n from "../i18next";


const authAxiosInstance = axios.create(
  {
    baseURL:`${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
  }
);

authAxiosInstance.interceptors.request.use((config)=>{
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; /* sends the authantication that i'm the user Abood for example */
  }
  config.headers["Accept-Language"] = i18n.language;
  return config;
})

export default authAxiosInstance;