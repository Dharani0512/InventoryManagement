import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";

import { useAppcontext } from "../context/appContext";

const LeaveForm = () => {
  const {
    leaveTypeList,
    leaveType,
    fromDate,
    toDate,
    reason,
    totalDays,
    handleChange,
    isEditing,
    createDepartment,
    editDepartment,
    displayAlert,
    showAlert,
    attachmentFile,
    fileUpload,
    imageSrc,
  } = useAppcontext();
  const [finalDay, setFinalDay] = useState(totalDays);

  const [selectedFile, setSelectedFile] = useState("");
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    fileUpload("leaveDetails", e.target.files[0]);
    handleChange({ name: e.target.name, value: e.target.files[0] });
    // used to handle the changing input when the form is submitted
  };
  const handleInput = (e) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const difference = to.getTime() - from.getTime();
    const finalDate = difference / (1000 * 60 * 60 * 24);
    setFinalDay(finalDate);
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const { name, size, type } = attachmentFile;

  const handleSubmit = (e) => {
    const imageFile = attachmentFile;
    const formData = new FormData();
    formData.append("image", imageFile);
    e.preventDefault();
    const states = {
      leaveType,
      fromDate,
      toDate,
      reason,
      totalDays,
    };
    if (isEditing) {
      editDepartment(
        "leaveDetails",
        states,
        "Leave Application Edited Succesfully"
      );
      return;
    }
    fileUpload(
      "leaveDetails",
      attachmentFile,
      states,
      "Leave Form Submitted Successfully"
    );
  };

  return (
    <Wrapper>
      <div className="form">
        <h3>Leave Application Form</h3>
        <div className="form-center">
          <FormRowSelect
            type="text"
            name="leaveType"
            list={leaveTypeList}
            value={leaveType}
            handleChange={handleInput}
          />

          <FormRow
            type="Date"
            name="fromDate"
            value={fromDate}
            handleChange={handleInput}
          />
          <FormRow
            type="Date"
            name="toDate"
            value={toDate}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="reason"
            value={reason}
            handleChange={handleInput}
          />
          <FormRow
            type="file"
            name="attachmentFile"
            // value={attachmentFile ? attachmentFile.name : null}
            handleChange={handleFileInput}
          />
          <FormRow
            type="Number"
            labelText="Total Number Of Days"
            name="totalDays"
            value={totalDays}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button className="btn btn-block submit-btn" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
        <div className="mt2"></div>
        {showAlert && <Alert />}
      </div>
    </Wrapper>
  );
};

export default LeaveForm;
