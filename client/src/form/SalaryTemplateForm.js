import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";

import { useAppcontext } from "../context/appContext";

const SalaryForm = () => {
  const {
    isEditing,
    showAlert,
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
      editDepartment("salaryTemplate", states);
      return;
    }
    createDepartment(
      "/salaryTemplate",
      states,
      "Salary Details Created Successfully"
    );
  };
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
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
            handleChange={handleInput}
          />
          <FormRow
            type="String"
            labelText="Name"
            name="name"
            value={name}
            handleChange={handleInput}
          />
          <FormRow
            type="String"
            labelText="Email id"
            name="email"
            value={email}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="Basic salary"
            name="basicSalary"
            value={basicSalary}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="HRA"
            name="hra"
            value={hra}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="conveyance"
            value={conveyance}
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
            value={pf}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="esi"
            labelText="ESI"
            value={esi}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="leave Deductions"
            name="leaveDeduction"
            value={leaveDeduction}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="Professional tax"
            name="professionalTax"
            value={professionalTax}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="income tax"
            name="incomeTax"
            value={incomeTax}
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
            value={medicalAllowance}
            handleChange={handleInput}
          />

          <FormRow
            type="Number"
            labelText="LTA"
            name="lta"
            value={lta}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            labelText="diwali bonus"
            name="diwaliBonus"
            value={diwaliBonus}
            handleChange={handleInput}
          />
        </div>
        {/* Account details content  */}

        <h3>Account Details</h3>
        <div className="form-center">
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
            labelText="IFSC Code"
            name="ifscCode"
            value={ifscCode}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="PAN No"
            name="panCode"
            value={panNo}
            handleChange={handleInput}
          />
        </div>
        <h3>Additional information</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="division"
            value={division}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="branch"
            value={branch}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="pfNo"
            value={pfNo}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="grade"
            value={grade}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="designation"
            value={designation}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="basic"
            value={basic}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="department"
            value={department}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Joining Date "
            name="date_of_join"
            value={date_of_join}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="category"
            value={category}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Emp Code"
            name="empCode"
            value={empCode}
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

export default SalaryForm;
