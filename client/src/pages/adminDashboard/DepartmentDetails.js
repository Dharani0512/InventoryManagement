import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import React, { useEffect, useRef, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import DepartmentDetailsSearch from "../../components/searchContainer/DepartmentDetailsSearch";
import ReactToPrint from "react-to-print";

import adminPathDecider from "../../helper/adminPathDecider";

const TableData = [
  "Serial No",
  "Emp Name",
  "employeeId",
  "designation",
  "department",
  "gender",
  "working status",
  "email",
  "action",
];
const DepartmentDetails = () => {
  const [Search, setSearch] = useState(false);
  const {
    openModal,
    userType,
    department,
    searchDepartment,
    searchDesignation,
    sort,
    isLoading,
    details,
    totalDetails,
    getDepartment,
    setEditDepartment,
    deleteDetail,
    page,
  } = useAppcontext();
  const departmentForm = adminPathDecider("departmentForm", userType);

  const componentRef = useRef();
  //  used to fetch the departmentDetails from the backEnd
  useEffect(() => {
    getDepartment(
      `/departmentDetails?page=${page}&filter=${department}&searchDesignation=${searchDesignation}&sort=${sort}`
    );
  }, [sort, page, department, searchDesignation]);

  if (isLoading) {
    return <Loading center />;
  }

  if (details.length === 0) {
    <Wrapper>
      <h2>No Department Details to display</h2>
    </Wrapper>;
  }
  return (
    <>
      {Search && <DepartmentDetailsSearch />}
      <div className="form-btn-container">
        <ReactToPrint
          trigger={() => <button className="btn print-btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
        <h5>
          {totalDetails} Department{details.length > 1 && "s"} found
        </h5>

        <button className="btn">
          <Link to={departmentForm}>Add</Link>
        </button>
      </div>

      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item, index) => {
                  return (
                    <th key={index} className="th-body">
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {details.map((item, index) => {
              const {
                _id,
                name,
                employeeId,
                designation,
                email,
                gender,
                department,
                employeeStatus,
              } = item;
              return (
                <tbody key={_id}>
                  <tr className="tr-body">
                    <td className="td-body">{index + 1}</td>
                    <td className="sticky-col first-col td-body"> {name} </td>
                    <td className="td-body"> {employeeId} </td>
                    <td className="td-body"> {designation} </td>
                    <td className="td-body"> {department} </td>
                    <td className="td-body"> {gender} </td>
                    <td className="td-body">{employeeStatus}</td>
                    <td className="td-body"> {email} </td>
                    <td
                      className="td-body"
                      style={{ display: "flex", fontSize: "1.5rem" }}
                    >
                      <Link to={departmentForm}>
                        <TiEdit
                          style={{ marginRight: "1rem" }}
                          onClick={() => setEditDepartment(_id)}
                        />
                      </Link>
                      <FaTrashAlt
                        onClick={() =>
                          openModal(_id, "departmentDetails", getDepartment)
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
    </>
  );
};

export default DepartmentDetails;
