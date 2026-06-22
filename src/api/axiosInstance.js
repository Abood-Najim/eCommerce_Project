import axios from "axios";


const axiosInstance = axios.create(
  {
    baseURL:`${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
    headers:{
      "Accept-Language" : "en"
    }
  }
);

export default axiosInstance;