import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    // 액세스 토큰이 없으면 로그인 페이지로 리다이렉트
    return <Navigate to="" />;
  }

  return children;
};

export default PrivateRoute;
