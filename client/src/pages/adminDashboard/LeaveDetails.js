import React, { useRef, useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import Loading from "../../components/Loading";
import moment from "moment";
import ReactToPrint from "react-to-print";
import { indianFormat } from '../../utils/utilsFunction'
import Alert from "../../components/Alert";
let path;
// import actualPath from path
console.log(path);
const TableData = [
  "Serial No",
  "Emp Name",
  "Emp Id",
  "designation",
  "leave type",
  "Date",
  "Email",
  "Reason",
  "From Date",
  "To Date",
  "Files",
  "Total Number of Days",
  "Action",
];
const LeaveDetails = () => {
  const [isApprove, setIsApprove] = useState(false);
  const {
    details,
    isLoading,
    getDepartment,
    editPending,
    page,
    search,
    sort,
    showAlert,
  } = useAppcontext();
  useEffect(() => {
    getDepartment(
      `/leaveDetailsAdmin?page=${page}&search=${search}&sort=${sort}`
    );
  }, [page, search, sort, isApprove]);

  const componentRef = useRef();
  // const getData = async () => {
  //   const { data } = await axios.get(
  //     "http://localhost:3000/api/v1/leaveDetails"
  //   );
  //   setIsApprove(data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  console.log(details);
  if (isLoading) {
    return <Loading center />;
  }

  if (details.length === 0) {
    <Wrapper>
      <h2>No Leave Details to display</h2>
    </Wrapper>;
  }
  const states = { status: "declined" };

  return (
    <>
      <div className="form-btn-container">
        <h5>Leave Details</h5>
        <ReactToPrint
          trigger={() => <button className="btn print-btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
      </div>
      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item, index) => {
                  return (
                    <th className="th-body" key={index}>
                      {" "}
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {details.map((item, index) => {
              const {
                _id,
                createdFor,
                employeeId,
                name,
                designation,
                emailId,
                leaveType,
                fromDate,
                toDate,
                reason,
                totalDays,
                createdAt,
                status,
                filePath,
              } = item;
              let path2;
              if (filePath) {
                const path = require(`../../utils/uploadImages/${filePath}`);
                path2 = path;
              }
              const currentDate = moment.utc(createdAt).format("MMMM Do YYYY");
              return (
                <tr className="tr-body" key={index}>
                  <td className="td-body">{index + 1}</td>

                  <td className="sticky-col first-col  td-body">{name}</td>
                  <td className="td-body">{employeeId}</td>
                  <td className="td-body"> {designation} </td>
                  <td className="td-body">{leaveType}</td>
                  <td className="td-body"> { indianFormat(currentDate)  } </td>
                  <td className="td-body"> {emailId} </td>
                  <td className="td-body"> {reason} </td>
                  <td className="td-body"> {indianFormat (fromDate)} </td>
                  <td className="td-body"> {indianFormat (toDate)} </td>
                  <td className="td-body">
                    <a href={path2} target="_blank" rel="noreferrer">
                      click here
                    </a>
                  </td>
                  <td className="td-body"> {totalDays} </td>
                  <td className="td-body">
                    {status === "approved" ? (
                      <button
                        className="btn btn-success"
                        style={{
                          marginLeft: "2.3rem",
                        }}
                      >
                        Approved
                      </button>
                    ) : status === "declined" ? (
                      <button
                        className="btn btn-dangerDark"
                        style={{
                          marginLeft: "2.1rem",
                          padding: ".25rem 1rem",
                        }}
                      >
                        declined
                      </button>
                    ) : (
                      // <button>hello</button>
                      <td style={{ display: "flex", textAlign: "center" }}>
                        <button
                          className="btn"
                          style={{ marginRight: "1rem" }}
                          onClick={() => {
                            editPending(createdFor, "/leaveDetailsAdmin", {
                              status: "approved",
                            });
                            setIsApprove(!isApprove);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            editPending(createdFor, "/leaveDetailsAdmin", {
                              status: "declined",
                            });
                            setIsApprove(!isApprove);
                          }}
                        >
                          Decline
                        </button>
                      </td>
                    )}
                  </td>
                  {/* <td className="td-body">
                    <button
                      className="btn"
                      style={{ marginRight: "1rem" }}
                      onClick={() =>
                        editPending(_id, "/leaveDetailsAdmin", {
                          status: "approved",
                        })
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        editPending(_id, "/leaveDetailsAdmin", {
                          status: "declined",
                        })
                      }
                    >
                      Decline
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </table>
          {showAlert && <Alert />}
        </div>
      </div>
    </>
  );
};

export default LeaveDetails;
