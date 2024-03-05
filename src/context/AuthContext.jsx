import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, createContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null,
  );
  const [accessTokens, setAccessTokens] = useState(() =>
    localStorage.getItem("accessTokens")
      ? localStorage.getItem("accessTokens")
      : null,
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authTokens) {
      console.log("authToken changed...");
      // console.log(jwtDecode(authTokens));
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  const loginUser = async (data) => {
    try {
      console.log("loginUser context function = ", data);
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("response = ", response);

      if (response.data.statusCode === 200) {
        console.log("Success");
        // console.log(response.data.data.refreshToken);
        setAuthTokens(response.data.data.refreshToken);
        setAccessTokens(response.data.data.accessToken);
        setUser(jwtDecode(response.data.data.refreshToken));
        localStorage.setItem("authTokens", response.data.data.refreshToken);
        localStorage.setItem("accessTokens", response.data.data.accessToken);
      } else {
        console.log("Failed");
        alert("Something went wrong");
      }
    } catch (error) {
      console.log("Error = ", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      console.log("logoutUser context function");

      const response = await axiosInstance.post("/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log(`🚀 ~ logoutUser ~ response:`, response);

      setAuthTokens(null);
      setAccessTokens(null);
      setUser(null);
      localStorage.removeItem("accessTokens");
      localStorage.removeItem("authTokens");
    } catch (error) {
      console.log("Error at logoutUser context function = ", error);
      throw error;
    }
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    accessTokens,
    setAccessTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
