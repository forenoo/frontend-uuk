import React from "react";
import { useAuth } from "../hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const RootPage = () => {
  const { token } = useAuth();
  return <>{token ? <Navigate to="/customer" /> : <Navigate to="/login" />}</>;
};

export default RootPage;
