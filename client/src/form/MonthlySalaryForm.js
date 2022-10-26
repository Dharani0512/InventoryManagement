import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";

import { useAppcontext } from "../context/appContext";

const MonthlySalaryForm = () => {
  const {
    isEditing,
    showAlert,
    getDepartment,
    details,
    editDepartment,
    createDepartment,
    employeeId,
    name,
    accountNumber,
    bankName,
    ifscCode,
    pf,
    esi,
    basicSalary,
    hra,
    lta,
    diwaliBonus,
    gratuity,
    medicalAllowance,
    conveyance,
    leaveDeduction,
    grossSalary,
    salaryStatus,
    handleChange,
    professionalTax,
    pfNo,
    panNo,
    division,
    branch,
    grade,
    designation,
    basic,
    department,
    date_of_join,
    category,
    empCode,
    incomeTax,
    email,
  } = useAppcontext();

  useEffect(() => {
    getDepartment("/salaryTemplate");
  }, []);
  console.log(details);
  const [state, setState] = useState({
    employeeId,
    name,
    accountNumber,
    bankName,
    ifscCode,
    pf,
    esi,
    basicSalary,
    hra,
    lta,
    diwaliBonus,
    gratuity,
    medicalAllowance,
    conveyance,
    leaveDeduction,
    grossSalary,
    salaryStatus,
    handleChange,
    professionalTax,
    pfNo,
    panNo,
    division,
    branch,
    grade,
    designation,
    basic,
    department,
    date_of_join,
    category,
    empCode,
    incomeTax,
    email,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const states = {
      employeeId,
      name,
      accountNumber,
      bankName,
      grossSalary,
      ifscCode,
      pf,
      esi,
      basicSalary,
      hra,
      conveyance,
      leaveDeduction,
      salaryStatus,
      lta,
      diwaliBonus,
      gratuity,
      medicalAllowance,
      professionalTax,
      pfNo,
      panNo,
      division,
      branch,
      grade,
      designation,
      basic,
      department,
      date_of_join,
      category,
      incomeTax,
      empCode,
      email,
    };
    if (isEditing) {
      // fetching details from the backend
      editDepartment("monthlySalary", state);
      return;
    }
    createDepartment(
      "/monthlySalary",
      state,
      "Salary Details Created Successfully"
    );
  };
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
    const items = details.find((item) => {
      console.log(item.employeeId, e.target.value);
      return item.employeeId === e.target.value;
    });
    console.log(items, e.target.value);
    const {
      employeeId,
      name,
      email,
      accountNumber,
      bankName,
      ifscCode,
      pf,
      esi,
      basicSalary,
      hra,
      lta,
      diwaliBonus,
      gratuity,
      medicalAllowance,
      conveyance,
      leaveDeduction,
      grossSalary,
      salaryStatus,
      professionalTax,
      pfNo,
      panNo,
      division,
      branch,
      grade,
      designation,
      basic,
      department,
      date_of_join,
      category,
      incomeTax,
      empCode,
    } = items;
    setState({
      employeeId,
      name,
      email,
      accountNumber,
      bankName,
      ifscCode,
      pf,
      esi,
      basicSalary,
      hra,
      lta,
      gratuity,
      medicalAllowance,
      conveyance,
      leaveDeduction,
      grossSalary,
      salaryStatus,
      professionalTax,
      pfNo,
      panNo,
      division,
      branch,
      grade,
      designation,
      basic,
      department,
      date_of_join,
      category,
      incomeTax,
      diwaliBonus,
      empCode,
    });
  };
  //  salary calculation funtion
  const calculateSalary = () => {
    const gross = parseInt(basicSalary) + parseInt(hra) + parseInt(conveyance);
    const calcPf = parseInt(basicSalary) * (parseInt(pf) / 100);
    const calcEsi = parseInt(gross) * (parseInt(esi) / 100);
    const deduction = calcPf + calcEsi + parseInt(leaveDeduction);
    const netSalary = parseInt(gross) - parseFloat(deduction);
    return [netSalary, gross];
  };

  return (
    <Wrapper>
      <form className="form">
        <h2 style={{ textAlign: "center" }}>
          {isEditing ? "Edit Salary form" : "salary form"}
        </h2>

        {/* basicSalary Salary content  */}
        <h3>Basic Salary</h3>
        <div className="form-center">
          <FormRow
            type="String"
            labelText="Employee Id"
            name="employeeId"
            value={employeeId}
            handleChange={handleSearch}
          />
          <FormRow
            type="String"
            labelText="Name"
            name="name"
            value={state.name}
            handleChange={handleInput}
          />
          <FormRow
            type="String"
            labelText="Email id"
            name="email"
            value={state.email}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="Basic salary"
            name="basicSalary"
            value={state.basicSalary}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="HRA"
            name="hra"
            value={state.hra}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="conveyance"
            value={state.conveyance}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="Gross Salary"
            name="grossSalary"
            value={calculateSalary()[1]}
            handleChange={handleInput}
          />
        </div>
        {/* Deduction content  */}

        <h3>deductions</h3>
        <div className="form-center">
          <FormRow
            type="Number"
            labelText="Provident fund (PF)"
            name="pf"
            value={state.pf}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="esi"
            labelText="ESI"
            value={state.esi}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="leave Deductions"
            name="leaveDeduction"
            value={state.leaveDeduction}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="Professional tax"
            name="professionalTax"
            value={state.professionalTax}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="income tax"
            name="incomeTax"
            value={state.incomeTax}
            handleChange={handleInput}
          />
          <FormRowSelect
            type="text"
            name="status"
            list={["Pending", "Paid"]}
            // value="Pending"
            handleChange={handleInput}
          />
        </div>
        {/* Additions */}
        <h3>Additions</h3>
        <div className="form-center">
          <FormRow
            type="Number"
            labelText="medical allowance"
            name="medicalAllowance"
            value={state.medicalAllowance}
            handleChange={handleInput}
          />

          <FormRow
            type="Number"
            labelText="LTA"
            name="lta"
            value={state.lta}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="diwali bonus"
            name="diwaliBonus"
            value={state.diwaliBonus}
            handleChange={handleInput}
          />
        </div>
        {/* Account details content  */}

        <h3>Account Details</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="accountNumber"
            value={state.accountNumber}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="bankName"
            value={state.bankName}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="IFSC Code"
            name="ifscCode"
            value={state.ifscCode}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="PAN No"
            name="panCode"
            value={state.panNo}
            handleChange={handleInput}
          />
        </div>
        <h3>Additional information</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="division"
            value={state.division}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="branch"
            value={state.branch}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="pfNo"
            value={state.pfNo}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="grade"
            value={state.grade}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="designation"
            value={state.designation}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="basic"
            value={state.basic}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="department"
            value={state.department}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Joining Date "
            name="date_of_join"
            value={state.date_of_join}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="category"
            value={state.category}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Emp Code"
            name="empCode"
            value={state.empCode}
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
        <div className="total-Salary">
          Take Home Salary : {calculateSalary()[0]}
        </div>
      </form>
    </Wrapper>
  );
};

export default MonthlySalaryForm;
