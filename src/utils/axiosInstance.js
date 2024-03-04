import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 1st way : add withCredentials to each axios request
// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // 2nd way : add withCredentials to each axios request
  withCredentials: true,
});

export default axiosInstance;
