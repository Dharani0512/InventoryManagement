import React, { useEffect, useRef, useState } from "react";
import { useAppcontext } from "../../context/appContext";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import moment from "moment";
import ReactToPrint from "react-to-print";

import adminPathDecider from "../../helper/adminPathDecider";

const TableData = [
  "Serial No",
  "Emp Name",
  "Email Id",
  "Date",
  "Attendance Type",
  "Login time",
  "Logout time",
  "location",
  "Exact Location",
  "working hours",
  "Over Time ",
  // "modify Attendance",
];

const AttendanceDetails = () => {
  const componentRef = useRef();
  const [limit, setLimit] = useState("10");
  const {
    userType,
    isLoading,
    details,
    totalDetails,
    name,
    getDepartment,
    page,
    search,
    findDate,
  } = useAppcontext();
  const calenderPage = adminPathDecider("calendar", userType);
  console.log(`name: ${name}`);
  useEffect(() => {
    getDepartment(
      `/loginAttendance?page=${page}&sort=${"latest"}&limit=${limit}&search=${search}&date=${
        findDate === "all" ? "" : moment(findDate).format("MMM Do YY")
      }`
    );
  }, [page, limit, search, findDate]);

  if (isLoading) {
    return <Loading center />;
  }
  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  console.log(details);
  return (
    <div className="page-container">
      {/* <h3 className="center">Attendance Details</h3> */}
      <div className="form-btn-container">
        <ReactToPrint
          onBeforeGetContent={() => setLimit(100)}
          trigger={() => <button className="btn">Print</button>}
          documentTitle="attendancePage"
          onBeforePrint={() => componentRef.current}
          content={() => componentRef.current}
        ></ReactToPrint>
        <h5>
          {totalDetails} Attendance detail{details.length > 1 && "s"} found
        </h5>
        <button className="btn">
          <Link to={calenderPage}>calendar view</Link>
        </button>
      </div>

      <div className="table">
        <div className="table-body">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item) => {
                  return <th className="th-body"> {item} </th>;
                })}
              </tr>
            </thead>
            {details.map((item, index) => {
              const {
                attendanceType,
                attendanceName,
                attendanceEmail,
                location,
                createdAt,
                latitude,
                longitude,
                updatedAt,
              } = item;
              //  to get login and logout time from createdAt and updated at
              const login = moment(createdAt);
              const logout = moment(updatedAt);
              // format from utc to 12hours using moment js
              const loginTime = login.format("hh:mm a");
              const loginDate = login.format("DD/MM/YYYY");
              const logoutTime = logout.format("hh:mm a");
              // finding the difference between login and logout time to get the total working hours
              const startTime = moment(loginTime, "hh:mm a");
              const endTime = moment(logoutTime, "hh:mm a");
              var duration = moment.duration(endTime.diff(startTime));
              const TotalLoginTime = Math.abs(
                round(duration.asMinutes() / 60, 1)
              );
              console.log(duration._data.hours, "prefinal");
              const loginHours = Math.abs(duration._data.hours);
              const loginMin = Math.abs(duration._data.minutes);

              return (
                <tr className="tr-body" key={index}>
                  <td className="td-body"> {index + 1} </td>
                  <td className="sticky-col first-col td-body">
                    {" "}
                    {attendanceName}{" "}
                  </td>
                  <td className="td-body"> {attendanceEmail} </td>
                  <td className="td-body">{loginDate}</td>
                  <td className="td-body">{attendanceType}</td>
                  <td className="td-body">{loginTime}</td>
                  <td className="td-body">
 {loginTime === logoutTime ? "Not logged out" : logoutTime}
                  </td>
                  <td className="td-body">{location}</td>
                  <td className="td-body">
                    <a
                      href={`https://www.google.co.in/maps/dir/${latitude},${longitude}//@${latitude},${longitude}/data=!4m2!4m1!3e2`}
                      target="_blank"
                    >
                      click
                    </a>
                  </td>
                  <td className="td-body">{`${
                    loginHours ? loginHours + "Hours" : "0 Hours"
                  } ${loginMin} Minutes`}</td>
                  <td className="td-body">
                    {TotalLoginTime >= 8.2
                      ? parseInt(TotalLoginTime - 8.2) + "Hours"
                      : "No Over Time"}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;

