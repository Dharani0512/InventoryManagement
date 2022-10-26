import logo from "../assets/images/bitslogo.png";
import React from "react";

const BitsLogo = ({ width, height }) => {
  return (
    <a href="https://brandimagetech.com/" target="blank" style={{ zIndex: "" }}>
      <img src={logo} width={width} height={height} alt="" className="logo" />
    </a>
  );
};

export default BitsLogo;
