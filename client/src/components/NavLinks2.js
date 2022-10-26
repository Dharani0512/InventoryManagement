import admin from "../utils/links";
import employee from "../utils/links2";
import stateAdmin from "../utils/links3";
import { NavLink } from "react-router-dom";
import { useAppcontext } from "../context/appContext";
import { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

import React from "react";

const NavLinks2 = () => {
  const { userType, clearValues } = useAppcontext();
  return (
    <div className="nav-links">
      <NavLink
        to="/stateAdmin/dashboard"
        key="1"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        onClick={() => {
          clearValues();
        }}
      ></NavLink>
    </div>
  );
};

export default NavLinks2;
