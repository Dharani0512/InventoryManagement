import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import React, { useEffect, useRef } from "react";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { formatDate, indianFormat } from "../../utils/utilsFunction";
import ReactToPrint from "react-to-print";

import adminPathDecider from "../../helper/adminPathDecider";

const TableData = [
  "Employee Id",
  "Emp Name",
  "Email",
  "designation",
  "Gender",
  "Date Of Birth",
  "Current Address",
  "Blood Group",
  "Account Number",
  "Bank Name",
  "IFSC Code",
  "PAN Number",
  "Contact Number",
  "Emergency Contact",
  "Action",
];
const PersonalDetails = () => {
  const {
    openModal,
    userType,
    isLoading,
    details,
    totalDetails,
    getDepartment,
    setEditDepartment,
    deleteDetail,
    search,
  } = useAppcontext();

  const personalForm = adminPathDecider("personalForm", userType);

  const componentRef = useRef();
  useEffect(() => {
    getDepartment(`/personalDetails?search=${search}`);
  }, [search]);
  console.log(details);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No Details to Display</h2>
    </Wrapper>;
  }
  console.log(details.email);

  return (
    <>
      <div className="form-btn-container">
        <ReactToPrint
          trigger={() => <button className="btn print-btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
        <h5>
          {totalDetails} Personal Detail{details.length > 1 && "s"} found
        </h5>
        {/* {details.length === 0 ? (
        ) : null} */}
        <button className="btn">
          {" "}
          <Link to={personalForm}>Add</Link>{" "}
        </button>
      </div>
      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
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
              const {
                _id,
                employeeId,
                name,
                email,
                designation,
                gender,
                date_of_birth,
                currentAddress,
                bloodGroup,
                accountNumber,
                bankName,
                ifscCode,
                panNumber,
                contactNo,
                emergencyContact,
              } = item;
              return (
                <tbody key={index}>
                  <tr className="tr-body">
                    <td className="td-body"> {employeeId} </td>
                    <td className="td-body first-col sticky-col"> {name} </td>
                    <td className="td-body"> {email} </td>
                    <td className="td-body"> {designation} </td>
                    <td className="td-body"> {gender} </td>
                    <td className="td-body"> {indianFormat(date_of_birth)} </td>
                    <td className="td-body"> {currentAddress} </td>
                    <td className="td-body"> {bloodGroup} </td>
                    <td className="td-body"> {accountNumber} </td>
                    <td className="td-body"> {bankName} </td>
                    <td className="td-body"> {ifscCode} </td>
                    <td className="td-body"> {panNumber} </td>
                    <td className="td-body"> {contactNo} </td>
                    <td className="td-body"> {emergencyContact} </td>
                    {/* <td className="td-body"> {comments} </td> */}
                    <td
                      className="td-body"
                      style={{ display: "flex", fontSize: "1.5rem" }}
                    >
                      <Link to={personalForm}>
                        <TiEdit
                          style={{ marginRight: "1rem" }}
                          onClick={() =>
                            setEditDepartment(
                              _id,
                              "PersonalDetails Edited Successfully"
                            )
                          }
                        />
                      </Link>
                      <FaTrashAlt
                        onClick={() =>
                          openModal(_id, "personalDetails", getDepartment)
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

export default PersonalDetails;
