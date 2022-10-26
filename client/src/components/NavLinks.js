import admin from "../utils/links";
import employee from "../utils/links2";
import stateAdmin from "../utils/links3";
import { Link, NavLink } from "react-router-dom";
import { useAppcontext } from "../context/appContext";
import { useState } from "react";
import { BsChevronDoubleDown, BsChevronDown } from "react-icons/bs";
import pdf from "../utils/uploadImages/Report for 2022-1.pdf";
const NavLinks = ({ toggleSidebar }) => {
  const fun1 = (submenu, setToggleSubmenu, toggleSubmenu) => {
    return submenu ? setToggleSubmenu(!toggleSubmenu) : null;
  };
  const { userType, clearValues } = useAppcontext();
  const [toggleSubmenu, setToggleSubmenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("");
  const currentUrl = window.location.pathname;
  return (
    <div className="nav-links">
      {(userType === "Admin"
        ? admin
        : userType === "stateAdmin"
        ? stateAdmin
        : employee
      ).map((item) => {
        const { text, path, id, icon, submenu, submenuContents, submenuText } =
          item;
        return (
          <div>
            <NavLink
              to={submenu ? currentUrl : path}
              key={id}
              className={({ isActive }) =>
                submenu ? "nav-link" : isActive ? "nav-link active" : "nav-link"
              }
              // className="nav-link active "
              onClick={(e) => {
                clearValues();
                fun1(submenu, setToggleSubmenu, toggleSubmenu);
                setOpenSubmenu(submenuText);
                  toggleSidebar();
              }}
            >
              <div className="submenu-container">
                <div className="main-menu">
                  <span className="icon">{icon}</span>
                  {text}
                  {submenu ? (
                    <span className="icon">{<BsChevronDown />}</span>
                  ) : null}
                </div>
              </div>
            </NavLink>

            {toggleSubmenu
              ? submenu && submenuText === openSubmenu
                ? submenuContents.map((item) => {
                    const { text, path, id, icon } = item;
                    return (
                      <NavLink
                        to={path}
                        key={id}
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link submenu-link"
                        }
                      >
                        <span className="icon">{icon}</span> {text}
                      </NavLink>
                    );
                  })
                : null
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
