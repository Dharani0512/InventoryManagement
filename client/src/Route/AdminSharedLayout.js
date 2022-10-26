import { Outlet, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import DeleteModal from "../components/DeleteModal";
import { useAppcontext } from "../context/appContext";
import Error from "../pages/Error";

const SharedLayout = () => {
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
            {userType === "Admin" ? <Outlet /> : <Error />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
