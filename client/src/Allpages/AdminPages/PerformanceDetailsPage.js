import React from "react";
import BitsLogo from "../../components/BitsLogo";
import PageBtnContainer from "../../components/PageBtnContainer";
import PerformanceDetailsSearch from "../../components/searchContainer/PerformanceDetailsSearch";
import DisplayPerformance from "../../pages/adminDashboard/DisplayPerformance.js";
const PerformanceDetailsPage = () => {
  return (
    <div className="">
      <h3 className="center">Perfromance Details</h3>
      <PerformanceDetailsSearch />
      <DisplayPerformance />
      <PageBtnContainer />
      <BitsLogo />
    </div>
  );
};

export default PerformanceDetailsPage;
