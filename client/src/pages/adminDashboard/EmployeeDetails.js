import { useEffect, useRef } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { formatDate, indianFormat } from "../../utils/utilsFunction";
import ReactToPrint from "react-to-print";
import { AiFillStar } from "react-icons/ai";
import adminPathDecider from "../../helper/adminPathDecider";

const TableData = [
  "Serial no",
  "Emp Name",
  "employee Id",
  "designation",
  "Date Of Birth",
  " Date Of Join",
  "Email Id",
  "Disablity",
  "Performance",
  "Action",
];

const EmployeeDetails = () => {
  const {
    userType,
    isLoading,
    details,
    totalDetails,
    employeeDetailsId,
    deleteDetail,
    getDepartment,
    setEditDepartment,
    sort,
    search,
    page,
    openModal,
  } = useAppcontext();

  const componentRef = useRef();
  useEffect(() => {
    getDepartment(
      `employeeDetails?page=${page}&search=${search}&sort=${sort}&employeeDetailsId=${employeeDetailsId}`
    );
  }, [page, sort, search, employeeDetailsId]);

  const employeeForm = adminPathDecider("employeeForm", userType);
  const performanceForm = adminPathDecider("performanceForm", userType);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No Employee Details to display</h2>
    </Wrapper>;
  }
  console.log(details);
  return (
    <>
      <div className="form-btn-container">
        <ReactToPrint
          trigger={() => <button className="btn print-btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
        <h5>
          {totalDetails} Employee Detail{details.length > 1 && "s"} found
        </h5>

        <button className="btn">
          <Link to={employeeForm}>Add</Link>
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
                employeeId,
                email,
                designation,
                name,
                date_of_join,
                date_of_birth,
                createdBy,
                starRating,
              } = item;
              const arr = [];
              for (let i = 0; i < starRating; i++) {
                arr.push(i);
              }
              return (
                <tbody key={_id}>
                  <tr className="tr-body">
                    <td className="td-body"> {index + 1}</td>
                    <td className="sticky-col first-col  second-col  td-body">
                      {name}
                    </td>
                    <td className="td-body"> {employeeId} </td>
                    <td className="td-body"> {designation} </td>
                    <td className="td-body"> {indianFormat(date_of_birth)} </td>
                    <td className="td-body"> {indianFormat(date_of_join)} </td>
                    <td className="td-body"> {email} </td>
                    <td className="td-body"> No </td>
                    <td className="td-body">
                      {starRating
                        ? arr.map((item) => {
                            return <AiFillStar />;
                          })
                        : "No Star Rating "}
                      <Link
                        to={performanceForm}
                        state={{
                          name: name,
                          role: designation,
                          createdFor: createdBy,
                          employeeId,
                        }}
                        style={{ margin: "2rem" }}
                      >
                        <GrAdd />
                      </Link>
                    </td>
                    <td
                      className="td-body"
                      style={{ display: "flex", fontSize: "1.5rem" }}
                    >
                      <Link to={employeeForm}>
                        <TiEdit
                          style={{ marginRight: "1rem" }}
                          onClick={() => setEditDepartment(_id)}
                        />
                      </Link>
                      <FaTrashAlt
                        onClick={() =>
                          // deleteDetail(_id, "employeeDetails", getDepartment)
                          openModal(_id, "employeeDetails", getDepartment)
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

export default EmployeeDetails;
