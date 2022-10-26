import React from "react";
import MonthlySalaryForm from "../../form/MonthlySalaryForm";
import MonthlySalary from "../../pages/adminDashboard/MonthlySalary.js";
import SalaryDetailsSearch from "../../components/searchContainer/SalaryDetailsSearch";
import BitsLogo from "../../components/BitsLogo";
const MonthlySalaryDetailsPage = () => {
  return (
    <div>
      <h3 className="center">Monthly Salary</h3>
      <SalaryDetailsSearch />
      <MonthlySalary />
      <BitsLogo/>
    </div>
  );
};

export default MonthlySalaryDetailsPage;
