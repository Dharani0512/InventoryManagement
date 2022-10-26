import * as React from "react";
import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";
import "../utils/pdf.css";
import SalaryPdf from "../pdf/SalaryPdf";
const PdfButton = () => {
  const [Location, setLocation] = useState("");

  // state from Link
  const location = useLocation();
  const {
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
  } = location.state;
  useEffect(() => {
    console.log(Location, name);
  }, []);
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => <button className="btn">Print this out!</button>}
        content={() => componentRef.current}
      />
      <SalaryPdf componentRef={componentRef} />
      {/* <div ref={componentRef}>
        <h3>hellos</h3>
      </div> */}
    </>
  );
};

export default PdfButton;

// ReactDOM.render(<App />, document.querySelector("my-app"));
