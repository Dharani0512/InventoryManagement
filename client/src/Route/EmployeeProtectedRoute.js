import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UnauthorizedPage from "../components/UnauthorizedPage";
import { useAppcontext } from "../context/appContext";
import { Error } from "../pages";
import { SharedLayout2 } from "../pages/tutorial";
import EmployeeSharedLayout from "./EmployeeSharedLayout";

const EmployeeProtectedRoute = () => {
  const { user, userType, logoutUser } = useAppcontext();

  if (!user) {
    logoutUser();
    return <Navigate to="/landing" />;
  }
  if (userType === "Employee") {
    return <EmployeeSharedLayout />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default EmployeeProtectedRoute;
