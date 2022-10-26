import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../context/appContext";
import { Alert, FormRow, FormRowSelect } from "../components";
import { useEffect } from "react";

const EmployeeForm = () => {
  const {
    getDepartmentOptions,
    departmentOptions,
    isEditing,
    showAlert,
    email,
    designation,
    name,
    date_of_join,
    date_of_birth,
    disability,
    disabilityOption,
    employeeId,
    handleChange,
    editDepartment,
    createDepartment,
    workingLocation,
    workLocationList,
  } = useAppcontext();

  useEffect(() => {
    getDepartmentOptions("locationOptions");
  }, []);

  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const localData = localStorage.getItem("user");
  const state = JSON.parse(localData).state;
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();

    const states = {
      name,
      employeeId,
      email,
      designation,
      date_of_join,
      date_of_birth,
      disability,
      state,
      workingLocation,
    };
    if (isEditing) {
      editDepartment("employeeDetails", states, "Employee Detail Edited");
      return;
    }
    createDepartment("/employeeDetails", states, "New Employee Detail Created");
  };

  console.log();
  return (
    <Wrapper>
      <form className="from">
        <h3 className="form-heading">
          {isEditing ? "edit employee details" : "employee details"}
        </h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="employeeId"
            value={employeeId}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="designation"
            name="designation"
            value={designation}
            handleChange={handleInput}
          />
          <FormRow
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            labelText="Date of Birth"
            handleChange={handleInput}
          />
          <FormRow
            type="date"
            name="date_of_join"
            value={date_of_join}
            labelText="Date of Join"
            handleChange={handleInput}
          />

          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleInput}
          />
          <FormRowSelect
            labelText="Disability"
            type="text"
            name="disability"
            value={disability}
            list={disabilityOption}
            handleChange={handleInput}
          />
          <FormRowSelect
            labelText="Work Location"
            type="text"
            name="workingLocation"
            value={workingLocation}
            list={departmentOptions}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              {isEditing ? "Edit Employee" : "Submit"}
            </button>
          </div>
        </div>
        <div className="mt2"></div>
        {showAlert && <Alert />}
      </form>
    </Wrapper>
  );
};

export default EmployeeForm;
