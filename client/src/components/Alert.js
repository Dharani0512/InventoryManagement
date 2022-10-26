import React from "react";
import { useAppcontext } from "../context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppcontext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
