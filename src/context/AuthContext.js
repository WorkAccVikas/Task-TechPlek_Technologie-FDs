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
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      {
        username: e.target.username.value,
        password: e.target.password.value,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.status === 200) {
      setAuthTokens(response.data.data);
      setUser(jwtDecode(response.data.refreshToken));
      localStorage.setItem("authTokens", response.data.refreshToken);
    } else {
      alert("Something went wrong");
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
