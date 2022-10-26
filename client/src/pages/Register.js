import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert, FormRowSelect } from "../components";
import { useAppcontext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  role: "",
  employeeId: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const {
    user,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    userType,
    isLoading,
  } = useAppcontext();

  const navigate = useNavigate();
  useEffect(() => {
    if (user && userType === "Admin") {
      navigate("/");
    } else if (user && userType === "stateAdmin") {
      navigate("/stateAdmin");
    } else if (user && userType === "Employee") {
      navigate("/employee");
    }
  }, [user, navigate, userType]);
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, employeeId, password, isMember, role } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, employeeId, password, role };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <div className="" style={{ fontSize: "50px", marginTop: "-2rem" }}>
          <Logo width="110px" height="110px" />
        </div>
        <h3 style={{ marginTop: "-2rem" }}>
          {values.isMember ? "Login" : "Register"}
        </h3>

        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="text"
          name="employeeId"
          labelText="Employee ID"
          value={values.employeeId}
          handleChange={handleChange}
        />
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRowSelect
            type="text"
            name="role"
            list={["admin", "employee"]}
            value={values.role}
            handleChange={handleChange}
          />
        )}
        <button type="submit" disabled={isLoading} className="btn btn-block">
          Login
        </button>
        <p onClick={handleForgotPassword} className="member-btn">
          Forgot Password?
          {/* <button className="member-btn">forgot password?</button> */}
        </p>
        <div className="mt2"></div>
        {showAlert && <Alert />}
      </form>
    </Wrapper>
  );
};

export default Register;
