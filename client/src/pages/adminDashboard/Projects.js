import React, { useEffect, useRef } from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAppcontext } from "../../context/appContext";
import adminPathDecider from "../../helper/adminPathDecider";
import Loading from "../../components/Loading";
import ReactToPrint from "react-to-print";
const TableData = [
  "Serial No",
  "Project Title",
  "Project Description",
  "State",
  "District",
  "Assigned To",
  "Estimated Start Date",
  "Estimated End Date",
  "Actual Start",
  "Actual End",
  "Estimated Cost",
  "Actual Cost",
  "Action",
];

const Projects = ({ url }) => {
  const {
    getDepartment,
    details,
    userType,
    setEditDepartment,
    isLoading,
    openModal,
    page,
    district,
    countryState,
    search,
    totalDetails,
  } = useAppcontext();
  console.log(url);
  useEffect(() => {
    getDepartment(
      `${url}?page=${page}&search=${search}&district=${
        district === "all" ? "" : district
      }&countryState=${countryState === "all" ? "" : countryState}`
    );
  }, [page, search, district, countryState]);

  const componentRef = useRef();
  const projectsForm = adminPathDecider("projectsForm", userType);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <div className="form-btn-container">
        <ReactToPrint
          trigger={() => <button className="btn print-btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
        <h5>
          {totalDetails} Project{details.length > 1 && "s"} found
        </h5>
        <button className="btn">
          <Link to={projectsForm}>Add</Link>
        </button>
      </div>
      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item, index) => {
                  return (
                    <th className="th-body " key={index}>
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {details.map((item, index) => {
              const {
                _id,
                projectTitle,
                projectDescription,
                countryState,
                district,
                assignedTo,
                estimatedStart,
                estimatedEnd,
                actualStart,
                actualEnd,
                estimatedCost,
                actualCost,
              } = item;
              return (
                <tbody key={_id}>
                  <tr className="tr-body">
                    <td className="td-body">{index + 1}</td>
                    <td className="td-body">{projectTitle}</td>
                    <td className="td-body">{projectDescription}</td>
                    <td className="td-body">{countryState}</td>
                    <td className="td-body">{district}</td>
                    <td className="td-body">{assignedTo}</td>
                    <td className="td-body">{estimatedStart}</td>
                    <td className="td-body">{estimatedEnd}</td>
                    <td className="td-body">{actualStart}</td>
                    <td className="td-body">{actualEnd}</td>
                    <td className="td-body">{estimatedCost}</td>
                    <td className="td-body">{actualCost}</td>

                    <td
                      className="td-body"
                      style={{ display: "flex", fontSize: "1.5rem" }}
                    >
                      <Link to={projectsForm}>
                        <TiEdit
                          style={{ marginRight: "1rem" }}
                          onClick={() => setEditDepartment(_id)}
                        />
                      </Link>
                      <FaTrashAlt
                        onClick={() =>
                          // deleteDetail(_id, "employeeDetails", getDepartment)
                          openModal(_id, "projects", getDepartment)
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

export default Projects;
