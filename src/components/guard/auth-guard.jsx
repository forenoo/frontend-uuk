import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data && data.username && data.token && data.role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthGuard;
