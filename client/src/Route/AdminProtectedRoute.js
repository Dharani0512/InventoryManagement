import React from "react";
import { Navigate } from "react-router-dom";
import UnauthorizedPage from "../components/UnauthorizedPage";
import { useAppcontext } from "../context/appContext";
import { SharedLayout2 } from "../pages/tutorial";

const AdminProtectedRoute = () => {
  const { user, userType, logoutUser } = useAppcontext();

  if (!user) {
    logoutUser();
    return <Navigate to="/landing" />;
  }
  if (userType === "Admin") {
    return <SharedLayout2 />;
  } else {
    return <UnauthorizedPage />;
  }
};

export default AdminProtectedRoute;
