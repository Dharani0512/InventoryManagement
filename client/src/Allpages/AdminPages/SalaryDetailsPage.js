import React from "react";
import BitsLogo from "../../components/BitsLogo";
import PageBtnContainer from "../../components/PageBtnContainer";
import SalaryDetailsSearch from "../../components/searchContainer/SalaryDetailsSearch";
import { SalaryDetails } from "../../pages/adminDashboard";
const SalaryDetailsPage = () => {
  return (
    <div className="">
      <h3 className="center">Salary Details </h3>
      <SalaryDetailsSearch />
      <SalaryDetails />
      <PageBtnContainer />
      <BitsLogo />
    </div>
  );
};

export default SalaryDetailsPage;
