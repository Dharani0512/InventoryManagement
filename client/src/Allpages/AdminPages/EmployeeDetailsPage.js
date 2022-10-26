import React from "react";
import BitsLogo from "../../components/BitsLogo";
import PageBtnContainer from "../../components/PageBtnContainer";
import EmployeeDetailSearch from "../../components/searchContainer/EmployeeDetailSearch";
import EmployeeDetails from "../../pages/adminDashboard/EmployeeDetails";
const EmployeeDetailsPage = () => {
  return (
    <div className="">
      <h3 className="center">Employee Details</h3>
      <EmployeeDetailSearch />
      <EmployeeDetails />
      <PageBtnContainer />
      <BitsLogo />
    </div>
  );
};

export default EmployeeDetailsPage;
