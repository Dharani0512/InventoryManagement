import React from "react";
import DepartmentDetails from "../../pages/adminDashboard/DepartmentDetails";
import DepartmentDetailsSearch from "../../components/searchContainer/DepartmentDetailsSearch";
import PageBtnContainer from "../../components/PageBtnContainer";
import BitsLogo from "../../components/BitsLogo";

const DepartmentDetailspage = () => {
  return (
    <div className="">
      <h3 className="center">Department Details</h3>
      <DepartmentDetailsSearch />
      <DepartmentDetails />
      <PageBtnContainer />
      <BitsLogo />
    </div>
  );
};

export default DepartmentDetailspage;
