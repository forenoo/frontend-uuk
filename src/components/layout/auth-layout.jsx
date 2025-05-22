import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data && data.username && data.token && data.role) {
    return <Navigate to="/customer" />;
  }

  return <Outlet />;
};

export default AuthLayout;
