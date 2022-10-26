import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import React, { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const TableData = [
  "leave Type",
  "from Date",
  "to date",
  "reason",
  "total leave days",
  "status",
  "action",
  "File",
];

const LeaveApplicationDetails = () => {
  const {
    isLoading,
    details,
    totalDetails,
    getDepartment,
    setEditDepartment,
    deleteDetail,
  } = useAppcontext();
  useEffect(() => {
    getDepartment("/leaveDetails");
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  if (details.length === 0) {
    <Wrapper>
      <h3>to leave details to display</h3>
    </Wrapper>;
  }
  return (
    <>
      <h5>
        {totalDetails} leave details {details.length > 1 && "s"} found
      </h5>
      <div className="table">
        <table>
          <thead>
            <tr>
              {TableData.map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          {details.map((item, index) => {
            const {
              _id,
              leaveType,
              fromDate,
              toDate,
              reason,
              totalDays,
              status,
              filePath,
            } = item;
            console.log(item);
            return (
              <tr key={index}>
                <td> {leaveType} </td>
                <td> {fromDate} </td>
                <td> {toDate} </td>
                <td> {reason} </td>
                <td> {totalDays} </td>
                <td> {status} </td>
                <td> {filePath} </td>

                <td key={index} style={{ display: "flex", fontSize: "1.5rem" }}>
                  <Link to="/leaveForm">
                    <TiEdit
                      style={{ marginRight: "1rem" }}
                      onClick={() => setEditDepartment(_id)}
                    />
                  </Link>
                  <FaTrashAlt
                    onClick={() =>
                      deleteDetail(_id, "leaveDetails", getDepartment)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default LeaveApplicationDetails;
