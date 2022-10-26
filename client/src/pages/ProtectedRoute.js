import { useAppcontext } from "../context/appContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeRoute from "../Router/EmployeeRoutes";
const ProtectedRoute = ({ children }) => {
  const { user, logoutUser, userType } = useAppcontext();

  if (!user) {
    logoutUser();
    return <Navigate to="/landing" />;
  } else if (userType === "employee") {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;
