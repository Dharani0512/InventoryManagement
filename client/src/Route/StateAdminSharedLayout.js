import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import DeleteModal from "../components/DeleteModal";
import { useAppcontext } from "../context/appContext";
import { Error } from "../pages";
const StateAdminSharedLayout = () => {
  const { userType, isOpen } = useAppcontext();

  if (isOpen) {
    return <DeleteModal />;
  }
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            {userType === "stateAdmin" ? <Outlet /> : <Error />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default StateAdminSharedLayout;
