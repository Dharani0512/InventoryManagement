import React from "react";
import Wrapper from "../assets/wrappers/SalaryPdf.js";
import { useLocation } from "react-router-dom";

const SalaryPdf = ({ componentRef }) => {
  const location = useLocation();
  const {
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
    netSalary,
  } = location.state;
  return (
    <Wrapper ref={componentRef} style={{ marginTop: "3rem" }}>
      <div className="salary-container">
        <div className="heading">
          <div className="logo">logo</div>
          <div className="company-info">
            <h3>Saga</h3>
            <p className="address">
              15/16 Hazari Baugh, LBS Marg, Vikhrli (west)
            </p>
          </div>
          <div className=""></div>
        </div>
        <div className="underline"></div>
        <div className="basic-info">
          <div className="first-col">
            <div className="info-container">
              <span className="left-content">Pay Slip: </span>
              <span>saa</span>
            </div>
            <div className="info-container">
              <span className="left-content">Emp Code: </span>
              <span> {employeeId}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Category: </span>
              <span>{category}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Joining Date: </span>
              <span>{date_of_join}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Grade :</span> <span>{grade}</span>
            </div>
          </div>
          <div className="second-col">
            <div className="info-container">
              <span className="left-content">Month :</span>
              <span>December2020</span>
            </div>
            <div className="info-container">
              <span className="left-content">Name :</span>
              <span>{name}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Department :</span>
              <span>{department}</span>
            </div>
            <div className="info-container">
              <span className="left-content">PF No : </span>
              <span>{pfNo}</span>
            </div>
            <div className="info-container">
              <span className="left-content">PAN No :</span>{" "}
              <span>{panNo}</span>
            </div>
          </div>
          <div className="third-col">
            <div className="info-container">
              <span className="left-content">Branch : </span>
              <span>{branch}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Basic : </span>
              <span> {basic}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Designation : </span>
              <span>{designation}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Division : </span>
              <span>{division}</span>
            </div>
            <div className="info-container">
              <span className="left-content">Grade :</span> <span>{grade}</span>
            </div>
          </div>
        </div>
        <div className="underline"></div>
        <table className="salary-table1">
          <tr>
            <th>Days Paid</th>
            <td>12</td>
            <th>Days Present</th>
            <td>12</td>
            <td className="salary-algin"></td>
            <th>W.Off/Pd.Off</th>
            <td>12/12</td>
            <th>LWP/Absent</th>
            <td>19</td>
          </tr>
          <tr>
            <th></th>
            <td></td>
            <th></th>
            <td></td>
            <td className="salary-algin"></td>
            <th>PL</th>
            <td>0</td>
            <th>Bal.PL</th>
            <td>87.5</td>
          </tr>
          <tr>
            <th></th>
            <td></td>
            <th></th>
            <td></td>
            <td className="salary-align"></td>
            <th>Bal.PL</th>
            <td>87.5</td>
            <th></th>
            <td></td>
          </tr>
        </table>

        <table className="table-1 salary-table2">
          <tr className="salary-align">
            <th>Earning & Reimburse</th>
            <th>Cumulative</th>
            <th className="salary-align">Actual Amt</th>
            <th>Deduction & Recoveries</th>
            <th>Cumulative</th>
            <th>Actual Amt</th>
          </tr>
          <tr>
            <td>Earn Basic</td>
            <td>251520</td>
            <td className="salary-align">{basicSalary}</td>
            <td>Prov.Fund</td>
            <td>12600</td>
            <td>{pf}</td>
          </tr>
          <tr>
            <td>H.R.A</td>
            <td>125761</td>
            <td className="salary-align">{hra}</td>
            <td>P.Tax</td>
            <td>208</td>
            <td>{professionalTax}</td>
          </tr>
          <tr>
            <td>Conveyance Allowance</td>
            <td>125761</td>
            <td className="salary-align">{conveyance}</td>
            <td>Income Tax</td>
            <td>0</td>
            <td>{incomeTax}</td>
          </tr>
          <tr>
            <td>Diwali Bonus</td>
            <td>46550</td>
            <td className="salary-align">{diwaliBonus}</td>
          </tr>

          <tr className="last-row">
            <th>Total Earning</th>
            <td>{netSalary}</td>
            <td className="salary-align"></td>
            <th>Total Deduction</th>
            <td>24276</td>
            <td>2008</td>
          </tr>
        </table>
        <div style={{ marginBottom: "3rem" }}></div>
      </div>
    </Wrapper>
  );
};

export default SalaryPdf;
