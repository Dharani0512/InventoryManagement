import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";
import { useAppcontext } from "../context/appContext";

const DepartmentForm = () => {
  const {
    getDepartment,
    details,
    isEditing,
    showAlert,
    handleChange,
    createDepartment,
    name,
    employeeId,
    designation,
    email,
    gender,
    genderOptions,
    department,
    editDepartment,
    employeeStatus,
    employeeStatusList,
    departmentOptions,
    getDepartmentOptions,
  } = useAppcontext();

  useEffect(() => {
    getDepartment("employeeDetails");
  }, []);

  useEffect(() => {
    getDepartmentOptions("departmentOptions");
  }, []);
  const [state, setState] = useState({ name, designation, email });

  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
    const items = details.find((item) => {
      return item.employeeId == e.target.value;
    });
    const { name, designation, email } = items;
    setState({ name, designation, email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const states = {
      name,
      employeeId,
      designation,
      email,
      gender,
      department,
      employeeStatus,
    };
    if (isEditing) {
      editDepartment("departmentDetails", states, "Department Detail Edited");
      return;
    }
    createDepartment(
      "/departmentDetails",
      { ...state, employeeId, department, gender, employeeStatus },
      "New Department Detail Created"
    );
  };

  return (
    <Wrapper>
      <form className="form">
        <h3> {isEditing ? "Edit Department form" : "Department Form"} </h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="employeeId"
            value={employeeId.toString()}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            name="name"
            value={state.name}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="designation"
            name="designation"
            value={state.designation}
            handleChange={handleInput}
          />
          {/* <FormRow
            type="text"
            name="department"
            value={department}
            handleChange={handleInput}
          /> */}
          <FormRowSelect
            type="text"
            name="department"
            value={department}
            list={departmentOptions}
            handleChange={handleInput}
          />
          <FormRowSelect
            type="text"
            name="gender"
            value={gender}
            list={genderOptions}
            handleChange={handleInput}
          />
          <FormRowSelect
            type="text"
            labelText="Employee Status"
            name="employeeStatus"
            value={employeeStatus}
            list={employeeStatusList}
            handleChange={handleInput}
          />

          <FormRow
            type="email"
            name="email"
            value={state.email}
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
        <div className="mt2"></div>
        {showAlert && <Alert />}
      </form>
    </Wrapper>
  );
};

export default DepartmentForm;
