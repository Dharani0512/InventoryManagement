import React, { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Alert } from "../components";
import { useAppcontext } from "../context/appContext";
const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const { displayAlert, showAlert, forgotPassword} = useAppcontext();
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = values;
    if (email === "") {
      displayAlert();
      return;
    }
    forgotPassword(
      "/auth/forgot-Password",
      { email },
      "please check your Email for Reset link"
    );
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        {showAlert && <Alert />}

        <h2>Enter your Email </h2>
        <FormRow
          labelText="Email"
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {console.log(values.email)}

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default ForgotPassword;
