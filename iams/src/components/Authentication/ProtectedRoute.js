import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
const ProtectedRoute = ({ allowedRoles }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggingUser"));

  if (loggedInUser && allowedRoles.includes(loggedInUser.role)) {
    return <MainLayout />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
