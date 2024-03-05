import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

// 1st way : add withCredentials to each axios request
// axios.defaults.withCredentials = true;

let authTokens = localStorage.getItem("authTokens")
  ? localStorage.getItem("authTokens")
  : null;

let accessTokens = localStorage.getItem("accessTokens")
  ? localStorage.getItem("accessTokens")
  : null;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: { Authorization: `Bearer ${accessTokens}` },

  // 2nd way : add withCredentials to each axios request
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log("Intercepting request start ................");

  // Access Token
  if (!accessTokens) {
    console.log("accessTokens absent in Local Storage.");
    accessTokens = localStorage.getItem("accessTokens")
      ? localStorage.getItem("accessTokens")
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = jwtDecode(accessTokens);
  console.log(`🚀 ~ axiosInstance.interceptors.request.use ~ user:`, user);

  /**  DESC : return milliseconds = expiry time in milliseconds - current time in milliseconds
   *   dayjs.unix(user.exp).diff(dayjs())
   */

  // console.log("Expiry time in milliseconds AT from LocalStorage = ", user.exp);
  // console.log("Current time in milliseconds = ", dayjs());
  // console.log("Current time in milliseconds = ", dayjs().valueOf());

  const DIFF_IN_MS_AT = dayjs.unix(user.exp).diff(dayjs());
  console.log(
    `🚀 ~ axiosInstance.interceptors.request.use ~ DIFF_IN_MS_AT:`,
    DIFF_IN_MS_AT,
  );

  const isExpired = DIFF_IN_MS_AT < 1;
  console.log(
    `🚀 ~ axiosInstance.interceptors.request.use ~ isExpired:`,
    isExpired,
  );

  // JWT Access Token not expired => return req
  if (!isExpired) return req;

  // JWT Access Token expired => call backend for generating new Access Token
  console.log("Access Token expired...............");
  console.log("authTokens = ", authTokens);
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/newAccessToken",
    null,
    {
      headers: { Authorization: `Bearer ${authTokens}` },
      withCredentials: true,
    },
  );
  // console.log( `🚀 ~ axiosInstance.interceptors.request.use ~ response:`, response,);

  console.log("Kran = ", response.data.data.accessToken);

  localStorage.setItem("accessTokens", response.data.data.accessToken);
  req.headers.Authorization = `Bearer ${response.data.data.accessToken}`;

  console.log(response.data.message);
  console.log("Intercepting request end ................");
  return req;
});

export default axiosInstance;
