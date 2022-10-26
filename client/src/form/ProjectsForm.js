import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../components";
import { useAppcontext } from "../context/appContext";
import Multiselect from "multiselect-react-dropdown";
const ProjectsForm = () => {
  const {
    isEditing,
    editDepartment,
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
    stateList,
    districtList,
    handleChange,
    createDepartment,
    showAlert,
    department,
    departmentOptions,
    getDepartmentOptions,
  } = useAppcontext();
  useEffect(() => {
    getDepartmentOptions("locationOptions");
  }, []);
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const states = {
      projectTitle,
      projectDescription,
      countryState,
      district: department,
      assignedTo,
      estimatedStart,
      estimatedEnd,
      actualStart,
      actualEnd,
      estimatedCost,
      actualCost,
    };
    if (isEditing) {
      editDepartment("projects", states, "Project Edited Successfully");
      return;
    }
    createDepartment("/projects", states, "Project Created Successfully");
  };

  return (
    <Wrapper>
      <form className="form">
        <h3> {isEditing ? "Edit Project " : "Project Form"} </h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="projectTitle"
            value={projectTitle}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="projectDescription"
            value={projectDescription}
            handleChange={handleInput}
          />
          <FormRowSelect
            type="text"
            labelText="State"
            name="countryState"
            list={stateList.slice(1)}
            value={countryState}
            handleChange={handleInput}
          />
          {/* <Multiselect
            isObject={false}
            options={[...stateList]}
            displayValue="assignedTo"
            onSelect={(e) => console.log(e)}
          /> */}
          <FormRowSelect
            type="text"
            labelText="District"
            name="department"
            list={departmentOptions}
            value={department}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="assignedTo"
            value={assignedTo}
            handleChange={handleInput}
          />
          <FormRow
            type="Date"
            name="estimatedStart"
            value={estimatedStart}
            handleChange={handleInput}
          />
          <FormRow
            type="Date"
            name="estimatedEnd"
            value={estimatedEnd}
            handleChange={handleInput}
          />
          <FormRow
            type="Date"
            name="actualStart"
            value={actualStart}
            handleChange={handleInput}
          />
          <FormRow
            type="Date"
            name="actualEnd"
            value={actualEnd}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="estimatedCost"
            value={estimatedCost}
            handleChange={handleInput}
          />
          <FormRow
            type="Number"
            name="actualCost"
            value={actualCost}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button className="btn btn-block submit-btn" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
        <div className="mt2">{showAlert && <Alert />}</div>
      </form>
    </Wrapper>
  );
};

export default ProjectsForm;
