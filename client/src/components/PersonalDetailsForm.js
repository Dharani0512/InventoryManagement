import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";
import { useAppcontext } from "../context/appContext";
const PersonalDetailsForm = () => {
  const {
    isEditing,
    showAlert,
    handleChange,
    displayAlert,
    editDepartment,
    createDepartment,
    genderOptions,
    name,
    gender,
    email,
    date_of_birth,
    currentAddress,
    accountNumber,
    bankName,
    ifscCode,
    employeeId,
    designation,
    panNumber,
    bloodGroup,
    contactNo,
    emergencyContact,
    pf,
    esi,
    grossSalary,
    salaryStatus,
  } = useAppcontext();
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const states = {
      name,
      employeeId,
      email,
      designation,
      gender,
      date_of_birth,
      currentAddress,
      bloodGroup,
      accountNumber,
      bankName,
      ifscCode,
      panNumber,
      contactNo,
      emergencyContact,
    };
    // const salaryStates = {
    //   accountNumber,
    //   bankName,
    //   ifscCode,
    //   pf: 12,
    //   esi: 1.75,
    //   grossSalary: 10000,
    //   salaryStatus: "pending"s
    // };
    if (isEditing) {
      editDepartment(
        "personalDetails",
        states,
        "PersonalDetail Edited Successfully"
      );
      return;
    }
    createDepartment("personalDetails", states, "New Personal Detail Created ");
    // createDepartment("salaryDetails", salaryStates);
  };
  return (
    <Wrapper>
      <form className="form">
        <h3> {isEditing ? "Edit personalDetails" : "PersonalDetails"} </h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Employee Id"
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
            type="email"
            name="email"
            value={email}
            handleChange={handleInput}
          />
          <FormRow
            type="designation"
            name="designation"
            value={designation}
            handleChange={handleInput}
          />

          <FormRowSelect
            type="text"
            name="gender"
            list={genderOptions}
            value={gender}
            handleChange={handleInput}
          />
          <FormRow
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            labelText="Date of birth"
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="currentAddress"
            value={currentAddress}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="bloodGroup"
            value={bloodGroup}
            handleChange={handleInput}
          />

          <FormRow
            type="text"
            name="accountNumber"
            value={accountNumber}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="bankName"
            value={bankName}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="ifscCode"
            value={ifscCode}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="PAN Number"
            name="panNumber"
            value={panNumber}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Contact No"
            name="contactNo"
            value={contactNo}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Emergency Contact"
            name="emergencyContact"
            value={emergencyContact}
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

export default PersonalDetailsForm;
