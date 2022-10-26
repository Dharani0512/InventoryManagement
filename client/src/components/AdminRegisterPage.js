import React from "react";
import { useState, useEffect } from "react";
import { FormRow, Alert, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppcontext } from "../context/appContext";
import { useLocation } from "react-router-dom";
import BitsLogo from "./BitsLogo";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  role: "Employee",
  state: "tamilnadu",
  employeeId: "",
  adminId: "",
};

const AdminRegisterPage = () => {
  const [values, setValues] = useState(initialState);
  const adminId = JSON.parse(localStorage.getItem("user")).adminId;
  const {
    showAlert,
    // displayAlert,
    registerNewUserAdmin,
    isEditing,
    editDepartment,
  } = useAppcontext();
  const [first, setfirst] = useState({});
  const location = useLocation();
  useEffect(() => {
    setfirst(location.state);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleEditChange = (e) => {
    setfirst({ ...first, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, employeeId, password, role, adminId, state } = values;

    // const states = { name, email, role };

    if (isEditing) {
      editDepartment("auth/register", first, "user updated sucessfully");
      return;
    }
    const currentUser = {
      name,
      email,
      employeeId,
      password,
      role,
      adminId,
      state,
    };

    registerNewUserAdmin(currentUser, "New User Created SuccessFully");
  };
  console.log(values.role);
  values.role === "Employee"
    ? console.log("true", values.role)
    : console.log("false");

  return (
    <>
      <Wrapper className="full-page">
        <form className="form">
          {/* logo */}
          <h3> {isEditing ? "Update Use" : "Register New User"} </h3>
          <FormRow
            type="text"
            labelText="Emp Name"
            name="name"
            value={isEditing ? first.name : values.name}
            handleChange={isEditing ? handleEditChange : handleChange}
          />
          <FormRow
            type="text"
            labelText="Emp Id"
            name="employeeId"
            value={isEditing ? first.employeeId : values.employeeId}
            handleChange={isEditing ? handleEditChange : handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={isEditing ? first.email : values.email}
            handleChange={isEditing ? handleEditChange : handleChange}
          />
          {!isEditing && (
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
          )}
          <FormRowSelect
            type="text"
            name="role"
            list={["Employee", "Admin", "stateAdmin"]}
            value={isEditing ? first.role : values.role}
            handleChange={isEditing ? handleEditChange : handleChange}
          />
          {values.role === "Employee" || values.role === "stateAdmin" ? (
            <FormRowSelect
              type="text"
              name="state"
              list={["tamilnadu", "karnataka"]}
              value={isEditing ? first.state : values.state}
              handleChange={isEditing ? handleEditChange : handleChange}
            />
          ) : null}
          <button type="submit" onClick={onSubmit} className="btn btn-block">
            {isEditing ? "Edit User" : "Register"}
          </button>
          <div className="mt2"></div>
          {showAlert && <Alert />}
        </form>
      </Wrapper>
      <BitsLogo />
    </>
  );
};

export default AdminRegisterPage;
