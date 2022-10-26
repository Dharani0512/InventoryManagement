import React from "react";
import { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Loading from "../../components/Loading";
import { useAppcontext } from "../../context/appContext";
import { formatDate } from "../../utils/utilsFunction";
import ReactToPrint from "react-to-print";
import adminPathDecider from "../../helper/adminPathDecider";
const DisplayPerformance = () => {
  const {
    openModal,
    page,
    userType,
    getDepartment,
    totalDetails,
    details,
    setEditDepartment,
    deleteDetail,
    isLoading,
    starRating,
    searchPerformance,
    sort,
    getComments,
    comments,
  } = useAppcontext();

  const performanceForm = adminPathDecider("performanceForm", userType);
  const componentRef = useRef();
  useEffect(() => {
    getDepartment(
      `/performanceDetails?page=${page}&filter=${starRating}&sort=${sort}&search=${searchPerformance}`
    );
  }, [page, sort, starRating, searchPerformance]);
  useEffect(() => {
    getComments();
  }, []);
  console.log(comments);
  if (isLoading) {
    return <Loading center />;
  }
  console.log(details);

  if (details.length === 0) {
    <Wrapper>No Performance Details to display</Wrapper>;
  }

  const TableData = [
    "Serial No",
    "Emp Name ",
    "Month",
    "Initiative & Passion",
    "Ability To Apply Job Knowledge",
    "Compliance",
    "Behaviour with customer/client/coleagues",
    "Grasping Ability",
    "Proactiveness",
    "regularWork",
    "leadership",
    "newBusiness",
    "teamManagement",
    "targetAchivement",
    "Employee Comments ",
    "Star Rating",
    "Edit Performance",
  ];
  const findPerformanceBasedOnValue = (value) => {
    return parseInt(value) === 5
      ? "Excellent"
      : parseInt(value) === 4
      ? "Very Good"
      : parseInt(value) === 3
      ? "Good"
      : parseInt(value) === 2
      ? "Average"
      : parseInt(value) === 1
      ? "Bellow Average"
      : "Please Select Some Values";
  };

  return (
    <>
      <div className="form-btn-container">
        <h5>
          {totalDetails} Performance Detail{details.length > 1 && "s"} found
        </h5>
        <ReactToPrint
          trigger={() => <button className="btn print-btn">Print</button>}
          documentTitle="Performance Detials"
          onBeforePrint={() => componentRef.current}
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
                behaviour,
                compliance,
                grasping,
                initiative,
                jobKnowledge,
                proactiveness,
                regularWork,
                leadership,
                newBusiness,
                teamManagement,
                targetAchivement,
                starRating,
                createdAt,
                createdFor,
              } = item;
              const totalMarks =
                behaviour +
                compliance +
                grasping +
                initiative +
                jobKnowledge +
                proactiveness;

              const arr = [];
              for (let i = 0; i < starRating; i++) {
                arr.push(i);
              }

              return (
                <tr className="tr-body" key={index}>
                  <td className="td-body">{index + 1}</td>
                  <td className="sticky-col first-col td-body"> {name}</td>
                  {/* <td> {createdAt}</td> */}
                  <td className="td-body"> {formatDate(createdAt)}</td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(initiative)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(jobKnowledge)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(compliance)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(behaviour)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(grasping)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(proactiveness)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(regularWork)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(leadership)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(newBusiness)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(teamManagement)}{" "}
                  </td>
                  <td className="td-body">
                    {" "}
                    {findPerformanceBasedOnValue(targetAchivement)}{" "}
                  </td>

                  <td className="td-body">
                    <ol>
                      {comments.map((item) => {
                        return item.performanceId === _id ? (
                          <li
                            style={{
                              minWidth: "22rem",
                              whiteSpace: "initial",
                            }}
                          >
                            {" "}
                            {item.singleComments}{" "}
                          </li>
                        ) : // <p>
                        //   {item.singleComments}
                        // </p>
                        null;
                      })}
                    </ol>
                  </td>
                  <td className="td-body">
                    {arr.map((item, index) => {
                      return <AiFillStar />;
                    })}
                  </td>
                  <td
                    className="td-body"
                    style={{ display: "flex", fontSize: "1.5rem" }}
                  >
                    <Link
                      state={{
                        name: name,
                        role: "department",
                        createdFor,
                      }}
                      to={performanceForm}
                    >
                      <TiEdit
                        style={{ marginRight: "1rem" }}
                        onClick={() => setEditDepartment(_id)}
                      />
                    </Link>
                    <FaTrashAlt
                      onClick={() =>
                        openModal(_id, "performanceDetails", getDepartment)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default DisplayPerformance;
