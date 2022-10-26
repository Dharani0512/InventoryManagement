import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useAppcontext } from "../../context/appContext";
import Loading from "../../components/Loading";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import adminPathDecider from "../../helper/adminPathDecider";
import BitsLogo from "../../components/BitsLogo";
const TableData = ["name", "employee id", "email", "role", "state", "action"];
const AllUser = () => {
  const {
    openModal,
    userType,
    details,
    isLoading,
    setEditDepartment,
    deleteDetail,
    getDepartment,
  } = useAppcontext();
  const registerUser = adminPathDecider("registerUser", userType);
  useEffect(() => {
    getDepartment("/auth/register");
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No Employee Details to display</h2>
    </Wrapper>;
  }
  return (
    <>
      <div className="form-btn-container">
        <h5> {details.length} User found</h5>
        <button className="btn">
          <Link to={registerUser}>Add</Link>
        </button>
      </div>
      <div className="table">
        <div className="table-container">

        <table className="table-body">
          <thead className="thead-body">
            <tr className="tr-body">
              {TableData.map((item, index) => {
                return (
                  <th className="th-body" key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {details.map((item, index) => {
            const { _id, name, email, employeeId, role, state } = item;
            return (
              <tbody key={index}>
                <tr className="tr-body">
                  <td className="sticky-col first-col td-body" key={1}>
                    {name}
                  </td>
                  <td className="td-body" key={2}>
                    {employeeId}
                  </td>
                  <td className="td-body" key={3}>
                    {email}
                  </td>
                  <td className="td-body" key={4}>
                    {role}
                  </td>
                  <td className="td-body" key={5}>
                    {state}
                  </td>
                  <td
                    key={4}
                    className="td-body"
                    style={{ display: "flex", fontSize: "1.5rem" }}
                  >
                    <Link to="/registerUser" state={{ name, email, role }}>
                      <TiEdit
                        style={{ marginRight: "1rem" }}
                        onClick={() => setEditDepartment(_id)}
                      />
                    </Link>
                    <FaTrashAlt
                      onClick={() =>
                        openModal(_id, "auth/register", getDepartment)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        </div>
      </div>
      <BitsLogo/>
    </>
  );
};

export default AllUser;
