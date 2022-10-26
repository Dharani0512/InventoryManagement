import React from "react";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { useAppcontext } from "../context/appContext";
const DepartmentSettings = () => {
  const { handleChange, department, createLocation } = useAppcontext();
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createLocation(
      "departmentOptions",
      { listOfDepartment: department },
      "Department option Added successfully"
    );
  };
  return (
    <Wrapper>
      <form className="form">
        <h3 className="form-heading">Department settings </h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="department"
            value={department}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
      <div className="optionsList"></div>
    </Wrapper>
  );
};

export default DepartmentSettings;
