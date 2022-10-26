import React from "react";
import BitsLogo from "../../components/BitsLogo";
import PageBtnContainer from "../../components/PageBtnContainer";
import PersonalDetailsSearch from "../../components/searchContainer/PersonalDetailsSearch.js";
import { PersonalDetails } from "../../pages/adminDashboard";

const PersonalDetailsPage = () => {
  return (
    <>
      <h3 className="center">Personal Details </h3>
      <PersonalDetailsSearch />
      <PersonalDetails />
      <PageBtnContainer />
      <BitsLogo />
    </>
  );
};

export default PersonalDetailsPage;
