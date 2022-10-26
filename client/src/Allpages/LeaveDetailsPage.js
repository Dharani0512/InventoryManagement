import React from "react";
import { LeaveDetails } from "../pages/adminDashboard";
import PageBtnContainer from "../components/PageBtnContainer";
import LeaveDetailsSearch from "../components/searchContainer/LeaveDetailsSearch";
import BitsLogo from "../components/BitsLogo";
const LeaveDetailsPage = () => {
  return (
    <div className="div">
      <h3 className="center"> Leave Details </h3>
      <LeaveDetailsSearch />
      <LeaveDetails />
      <PageBtnContainer />
      <BitsLogo />
    </div>
  );
};

export default LeaveDetailsPage;
