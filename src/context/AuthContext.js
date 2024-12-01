import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("access_token"));
  const navigate = useNavigate();

  const login = async (phoneNumber, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/oauth/login/", {
        phone_number: phoneNumber,
        password: password,
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        setAuth(access_token);
        alert("로그인 성공!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response?.data);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
