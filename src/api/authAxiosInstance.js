import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const token = useAuthStore.getState().token;
const authAxiosInstance = axios.create(
  {
    baseURL: `${import.meta.env.VITE_BURL}`, /*any place i use axoisInstance in it wil see the things that are here so when i want to modify it i just came here (clean and nice) */
    headers: {
      "Accept-Language": "en",
      "Authorization": `Bearer ${token}` /* sends the authantication that i'm the user Abood for example */
    }
  }
);

export default authAxiosInstance;