import React from "react";
import { Navigate } from "react-router-dom";
import UnauthorizedPage from "../components/UnauthorizedPage";
import { useAppcontext } from "../context/appContext";
import StateAdminSharedLayout from "./StateAdminSharedLayout";

const StateAdminProtectedRoute = () => {
  const { user, userType, logoutUser } = useAppcontext();
  if (!user) {
    logoutUser();
    return <Navigate to="/landing" />;
  }
  if (userType === "stateAdmin") {
    return <StateAdminSharedLayout />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default StateAdminProtectedRoute;
