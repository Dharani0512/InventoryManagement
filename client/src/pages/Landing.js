import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import Wrapper from "../assets/wrappers/Landing.js";
import { Logo, Logo1 } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <header class="header-login">
        <a href="" class="logo-container"></a>
        <div class="heading-center">
          <h1 class="heading-primary arrange-logo">
            <Logo1 />
            {/* <span class="heading-primary-main">SaGa HrM</span> */}
            {/* <span class="heading-primary-sub">one point solution</span> */}
            <Link
              to="/register"
              className="btn btn-white btn-animated btn-slide"
            >
              login
            </Link>
          </h1>
        </div>
      </header>
    </Wrapper>
  );
};
<main>
  <nav style={{ marginBottom: "-7rem" }}>
    <Logo1 />
  </nav>
  <div className="container page">
    <div className="info">
      {/* <h2>
              Saga <span>Hrms </span>
            </h2> */}
      <p></p>
    </div>
    {/* <img src={bitsLogo} alt="job hunt" /> */}
  </div>
  <nav className="bits-logo">
    <Logo width="150px" height="150px" />
  </nav>
</main>;
export default Landing;
