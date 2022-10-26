import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/unauthorized.svg";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>You dont't have Access to This Route</h3>
        <Link to="/">Back to home</Link>
      </div>
    </Wrapper>
  );
};

export default UnauthorizedPage;
