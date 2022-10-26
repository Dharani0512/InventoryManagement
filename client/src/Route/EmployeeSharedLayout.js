import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { useAppcontext } from "../context/appContext";
import { Error } from "../pages";

const EmployeeSharedLayout = () => {
  const { userType } = useAppcontext();
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            {userType === "Employee" ? <Outlet /> : <Error />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default EmployeeSharedLayout;
