import React from "react";
import BitsLogo from "../../components/BitsLogo";
import PageBtnContainer from "../../components/PageBtnContainer";
import AttendanceDetailsSearch from "../../components/searchContainer/AttendanceDetailsSearch";
import { AttendanceDetails } from "../../pages/adminDashboard";
const AttendanceDetailspage = () => {
  return (
    <>
      <h3 className="center">Attendence Detials</h3>
      <AttendanceDetailsSearch />
      <AttendanceDetails />
      <PageBtnContainer />
      <BitsLogo />
    </>
  );
};

export default AttendanceDetailspage;
