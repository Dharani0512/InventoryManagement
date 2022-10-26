import React from "react";
import { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Loading from "../../components/Loading";
import { useAppcontext } from "../../context/appContext";
import { formatDate } from "../../utils/utilsFunction";
import ReactToPrint from "react-to-print";
import { FormRow } from "../../components";

import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const DisplayPerformance = () => {
  const {
    getDepartment,
    totalDetails,
    details,
    isLoading,
    singleComments,
    handleChange,
    createDepartment,
    starRating,
    sort,
    comments,
    getComments,
    deleteDetail,
  } = useAppcontext();

  const componentRef = useRef();

  const id = localStorage.getItem("user");
  const empId = JSON.parse(id)._id;

  useEffect(() => {
    getDepartment(`/performanceDetail/${empId}`, "stateAdmin");
  }, []);

  useEffect(() => {
    getComments();
  }, []);
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e, _id) => {
    const states = {
      singleComments,
      performanceId: _id,
    };
    e.preventDefault();
    createDepartment("/performanceComments", states, "your commnet is added");
  };

  if (isLoading) {
    return <Loading center />;
  }

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
    "Star Rating",
    "Comments",
    "Add Comments",
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
          {totalDetails} Performance Detail {details.length > 1 && "s"} found
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
                    {arr.map((item, index) => {
                      return <AiFillStar />;
                    })}
                  </td>
                  <td className="td-body">
                    <ol>
                      {comments.map((item) => {
                        const { _id: commentsId } = item;
                        return item.performanceId === _id ? (
                          <div style={{ display: "flex" }}>
                            <li
                              style={{
                                minWidth: "22rem",
                                whiteSpace: "initial",
                              }}
                            >
                              {item.singleComments}
                            </li>
                            <FaTrashAlt
                              onClick={() =>
                                deleteDetail(
                                  commentsId,
                                  "performanceComments",
                                  getComments
                                )
                              }
                            />
                          </div>
                        ) : // <p>
                        //   {item.singleComments}
                        // </p>
                        null;
                      })}
                    </ol>
                  </td>
                  <td className="td-body">
                    {/* <form action="" className="">
                      <FormRow
                        type="text"
                        name="singleComments"
                        value={singleComments}
                        handleChange={handleInput}
                      />
                      <button
                        onClick={(e) => handleSubmit(e, _id)}
                        type="submit"
                      >
                        submit
                      </button>
                    </form> */}
                    <Link
                      to="/employee/commentsForm"
                      state={{ singleComments, _id }}
                    >
                      <GrAdd />
                    </Link>
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
