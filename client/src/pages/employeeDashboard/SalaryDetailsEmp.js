import React, { useRef, useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import { Link } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import Loading from "../../components/Loading";
import ReactToPrint from "react-to-print";
const TableData = [
  "Employee Id",
  "Employee Name",
  "accountNumber",
  "bankName",
  "ifscCode",
  "basicSalary",
  "hra",
  "conveyance",
  "grossSalary",
  "deductions",
  "addition",
  "Take Home",
  "Salary Status",
  "Download",
];
const SalaryDetails = () => {
  const componentRef = useRef();
  const {
    page,
    sort,
    salaryStatus,
    details,
    getDepartment,
    isLoading,
    deleteDetail,
    setEditDepartment,
    totalDetails,
  } = useAppcontext();
  console.log(details);
  const id = localStorage.getItem("user");
  const empId = JSON.parse(id)._id;
  useEffect(() => {
    getDepartment(`/salaryDetail/${empId}`, "stateAdmin");
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No employee details to display</h2>
    </Wrapper>;
  }

  return (
    <>
      <div className="form-btn-container ">
        <h2>Salary Details</h2>
      </div>
      <ReactToPrint
        trigger={() => <button className="btn">print</button>}
        content={() => componentRef.current}
      ></ReactToPrint>
      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item) => {
                  return <th className="th-body">{item} </th>;
                })}
              </tr>
            </thead>

            {details.map((item) => {
              const {
                _id,
                employeeId,
                name,
                accountNumber,
                bankName,
                grossSalary,
                ifscCode,
                pf,
                esi,
                basicSalary,
                hra,
                conveyance,
                leaveDeduction,
                salaryStatus,
                lta,
                diwaliBonus,
                gratuity,
                medicalAllowance,
                professionalTax,
                pfNo,
                panNo,
                division,
                branch,
                grade,
                designation,
                basic,
                department,
                date_of_join,
                category,
                incomeTax,
                empCode,
              } = item;
              const gross =
                parseInt(basicSalary) + parseInt(hra) + parseInt(conveyance);
              const calcPf = parseInt(basicSalary) * (parseInt(pf) / 100);
              const calcEsi = parseInt(gross) * (parseInt(esi) / 100);
              const deduction = calcPf + calcEsi + parseInt(leaveDeduction);
              const netSalary =
                parseInt(gross) -
                parseFloat(deduction) +
                parseInt(lta) +
                parseInt(gratuity) +
                parseInt(diwaliBonus) +
                parseInt(medicalAllowance);

              return (
                <tr className="tr-body">
                  <td className="sticky-col first-col td-body">{name}</td>
                  <td className="td-body"> {employeeId} </td>
                  <td className="td-body"> {accountNumber} </td>
                  <td className="td-body"> {bankName} </td>
                  <td className="td-body"> {ifscCode} </td>
                  <td className="td-body"> {basicSalary} </td>
                  <td className="td-body">{hra}</td>
                  <td className="td-body">{conveyance}</td>
                  <td className="td-body">{gross}</td>
                  {/* <td>deductions</td> */}
                  {/* <td></td> */}
                  <td className="td-body">
                    <ul>
                      <ol> ESI - {parseInt(calcEsi)} </ol>
                      <ol>EPF - {parseInt(calcPf)}</ol>
                      <ol>Leave Deduction - {leaveDeduction} </ol>
                      <ol>Professional Tax - {professionalTax} </ol>
                    </ul>
                  </td>

                  <td className="td-body">
                    <ul>
                      <li>LTA - {lta}</li>
                      <li>Diwali Bonus - {diwaliBonus}</li>
                      <li>Gratuity- {gratuity}</li>
                      <li>Medical Allowance - {parseInt(medicalAllowance)}</li>
                    </ul>
                  </td>
                  <td className="td-body"> {netSalary} </td>
                  <td className="td-body">{salaryStatus}</td>
                  <td
                    className="td-body"
                    style={{
                      textAlign: "center",
                      fontSize: "2rem",
                      color: "black",
                    }}
                  >
                    <Link
                      to="/employee/salaryPdf"
                      state={{
                        _id,
                        basicSalary,
                        hra,
                        conveyance,
                        calcEsi,
                        calcPf,
                        leaveDeduction,
                        netSalary,
                        gross,
                        employeeId,
                        name,
                        accountNumber,
                        bankName,
                        ifscCode,
                        pf,
                        esi,
                        salaryStatus,
                        lta,
                        diwaliBonus,
                        gratuity,
                        medicalAllowance,
                        pfNo,
                        panNo,
                        division,
                        branch,
                        grade,
                        designation,
                        basic,
                        department,
                        date_of_join,
                        category,
                        incomeTax,
                        empCode,
                        netSalary,
                      }}
                    >
                      <HiOutlineDownload />
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

export default SalaryDetails;
