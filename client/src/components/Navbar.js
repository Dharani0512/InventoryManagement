import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Navbar";
import { useAppcontext } from "../context/appContext";
const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppcontext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className="logo-text">
            {user.role === "Admin" ? "Admin DashBoard" : "Employer DashBoard"}
          </h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
      {user.role === "Admin" && (
        <div className="settings">
        <Link to="/settings">
          <IoSettingsOutline
            style={{ marginLeft: "2rem", fontSize: "1.5rem", color: "black" }}
            />
        </Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
