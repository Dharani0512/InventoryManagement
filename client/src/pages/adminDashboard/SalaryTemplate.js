import React, { useRef, useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import { TiEdit } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import Loading from "../../components/Loading";
import RazorPay from "../RazorPay";
import ReactToPrint from "react-to-print";

import adminPathDecider from "../../helper/adminPathDecider";

const TableData = [
  "Serial No",
  "Emp Name",
  "Emp Id",
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
  "Action",
  "pay salary ",
];
const SalaryDetails = () => {
  const componentRef = useRef();
  const {
    openModal,
    userType,
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
  const salaryTemplateForm = adminPathDecider("salaryTemplateForm", userType);
  const salaryPdf = adminPathDecider("salaryPdf", userType);
  useEffect(() => {
    getDepartment(
      `/salaryTemplate?page=${page}&sort=${sort}&salaryStatus=${salaryStatus}`
    );
  }, [page, sort, salaryStatus]);
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
      <div className="form-btn-container">
        <button className="btn">
          <Link to={salaryTemplateForm}>Add</Link>
        </button>
        <h5>
          {totalDetails} Salary Detail{details.length > 1 && "s"} found
        </h5>
        <ReactToPrint
          trigger={() => <button className="btn">print</button>}
          content={() => componentRef.current}
        ></ReactToPrint>
      </div>
      <div className="table">
        <div className="table-container">
          <table className="table-body" ref={componentRef}>
            <thead className="thead-body">
              <tr className="tr-body">
                {TableData.map((item, index) => {
                  return <th className="th-body">{item} </th>;
                })}
              </tr>
            </thead>

            {details.map((item, index) => {
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
                  <td className="td-body">{index + 1}</td>
                  <td className="sticky-col first-col td-body"> {name} </td>
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
                      display: "flex",
                      fontSize: "1.5rem",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <Link to={salaryTemplateForm}>
                      <TiEdit
                        style={{
                          marginRight: "1rem",
                        }}
                        onClick={() => setEditDepartment(_id)}
                      />
                    </Link>
                    <FaTrashAlt
                      style={{ marginRight: "1rem" }}
                      onClick={() =>
                        openModal(_id, "salaryTemplate", getDepartment)
                      }
                    />
                    <Link
                      to={salaryPdf}
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
                  <td className="td-body">
                    <RazorPay paymentAmount={netSalary} />
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
