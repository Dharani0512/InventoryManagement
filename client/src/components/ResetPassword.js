import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppcontext } from "../context/appContext";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert, FormRowSelect } from "../components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const ResetPassword = () => {
  const query = useQuery();
  console.log(query.get("token"));
  const { displayAlert, showAlert, createDepartment, forgotPassword } = useAppcontext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eye, setEye] = useState("password");

  const [passMatch, setPassMatch] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      displayAlert("");
      return;
    }
    if (password !== confirmPassword) {
      displayAlert(`Password doesn't match`);
      return;
    }
    const token = query.get("token");
    const email = query.get("email");

    forgotPassword(
        `/auth/reset-password?token=${token}&email=${email}`,
      { password, confirmPassword },
      "password changed successfully"
    );
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        {showAlert && <Alert />}

        <h2>Enter your password </h2>

        <div className="eye-container">
          <div className="eye-input">
            <FormRow
              labelText="Password"
              type={eye}
              name="password"
              value={password}
              handleChange={(e) => {
                setPassword(e.target.value);
              }}
              unMatch={passMatch}
            />
          </div>
          <div className="eye-button">
            {eye === "password" ? (
              <AiFillEye onClick={() => setEye("text")} />
            ) : (
              <AiFillEyeInvisible onClick={() => setEye("password")} />
            )}
          </div>
        </div>
        <div className="eye-container">
          <div className="eye-input">
            <FormRow
              labelText="Confirm Password"
              type={eye}
              name="confirmpassword"
              value={confirmPassword}
              handleChange={(e) => {
                setConfirmPassword(e.target.value);
                setPassMatch(password === e.target.value ? false : true);
              }}
              unMatch={passMatch}
            />
          </div>
          <div className="eye-button">
            {eye === "password" ? (
              <AiFillEye onClick={() => setEye("text")} />
            ) : (
              <AiFillEyeInvisible onClick={() => setEye("password")} />
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-block">
          Reset password
        </button>
      </form>
    </Wrapper>
  );
};

export default ResetPassword;
