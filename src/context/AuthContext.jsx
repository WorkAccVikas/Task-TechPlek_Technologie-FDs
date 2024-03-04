import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null,
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authTokens) {
      // console.log("authToken changed...");
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
        console.log(response.data.data.refreshToken);
        setAuthTokens(response.data.data.refreshToken);
        setUser(jwtDecode(response.data.data.refreshToken));
        localStorage.setItem("authTokens", response.data.data.refreshToken);
      } else {
        console.log("Failed");
        alert("Something went wrong");
      }
    } catch (error) {
      console.log("Error = ", error);
      throw error;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
