import React from "react";
import { useLocation } from "react-router-dom";
import { Alert, FormRowSelect } from "../components";

import FormRow from "../components/FormRow";
import { useAppcontext } from "../context/appContext";

const CommentsForm = () => {
  const { handleChange, createDepartment, singleComments, showAlert } =
    useAppcontext();

  const location = useLocation();

  const { _id } = location.state;
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e, _id) => {
    const states = {
      singleComments,
      performanceId: _id,
    };
    e.preventDefault();
    createDepartment("/performanceComments", states, "your comment is added");
  };

  return (
    <>
      <div className="container">
        <form action="" className="form">
          <h3 className="form-heading center">Your Comments</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            <FormRow
              type="text"
              labelText="Please write your review"
              name="singleComments"
              value={singleComments}
              handleChange={handleInput}
            />
            <button
              className="btn"
              onClick={(e) => handleSubmit(e, _id)}
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
      {/* <h1>hello</h1> */}
    </>
  );
};

export default CommentsForm;
