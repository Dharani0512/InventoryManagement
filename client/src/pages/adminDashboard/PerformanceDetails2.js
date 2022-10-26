import React from "react";

import Wrapper from "../../assets/wrappers/Performance";
import { useAppcontext } from "../../context/appContext";
import { Alert } from "../../components";
import { useLocation } from "react-router-dom";
const PerformanceDetails = () => {
  const location = useLocation();
  const { name, role, createdFor, employeeId } = location.state;
  const {
    handleChange,
    isEditing,
    editDepartment,
    createDepartment,
    showAlert,
    initiative,
    jobKnowledge,
    compliance,
    behaviour,
    grasping,
    proactiveness,
    regularWork,
    leadership,
    newBusiness,
    teamManagement,
    targetAchivement,
  } = useAppcontext();

  const obj = [
    {
      name: "1. Initiative & Passion",
      name1: "initiative",
      state: initiative,
    },
    {
      name: "2. Ability to apply Job knowledge ",
      name1: "jobKnowledge",
      state: jobKnowledge,
    },
    { name: "3. Compliance", name1: "compliance", state: compliance },
    {
      name: "4. Behaviour with customer/client/colleagues",
      name1: "behaviour",
      state: behaviour,
    },
    { name: "5. Grasping Ability", name1: "grasping", state: grasping },
    { name: "6. Proactiveness", name1: "proactiveness", state: proactiveness },
    { name: "7. Regular Work", name1: "regularWork", state: regularWork },
    { name: "8. Leadership", name1: "leadership", state: leadership },
    { name: "9. New business", name1: "newBusiness", state: newBusiness },
    {
      name: "10. Team Management",
      name1: "teamManagement",
      state: teamManagement,
    },
    {
      name: "11. Target Achivement",
      name1: "targetAchivement",
      state: targetAchivement,
    },
  ];
  const total = parseInt(
    parseInt(initiative) +
      parseInt(jobKnowledge) +
      parseInt(compliance) +
      parseInt(behaviour) +
      parseInt(grasping) +
      parseInt(proactiveness) +
      parseInt(regularWork) +
      parseInt(leadership) +
      parseInt(newBusiness) +
      parseInt(teamManagement) +
      parseInt(targetAchivement)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const states = {
      name,
      employeeId,
      createdFor,
      initiative,
      jobKnowledge,
      compliance,
      behaviour,
      grasping,
      proactiveness,
      regularWork,
      leadership,
      newBusiness,
      teamManagement,
      targetAchivement,
      starRating: Math.floor(total / 11),
    };
    if (isEditing) {
      editDepartment(
        "performanceDetails",
        states,
        "Performance Edited Succesfully"
      );
      return;
    }
    createDepartment("performanceDetails", states, "Performance Created");
  };
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <div className="Employee-container">
        <h2 className="center">Performance Details</h2>
        <div className="performance-name">
          <div className="name">
            <h3>Employee : {name}</h3>
            <div className="name">
              <h3>Departent : {role}</h3>
            </div>
          </div>
          <div className="table">
            <form action="">
              {obj.map(({ name, name1, state }, index) => {
                return (
                  <div className="performance-card" key={index}>
                    <label className="performance-heading">{name}</label>
                    <input
                      type="radio"
                      name={name1}
                      value={5}
                      defaultChecked={state === 5}
                      id=""
                      onChange={handleInput}
                    />

                    <input
                      type="radio"
                      name={name1}
                      value={4}
                      defaultChecked={state === 4}
                      id=""
                      onChange={handleInput}
                    />

                    <input
                      type="radio"
                      name={name1}
                      value={3}
                      defaultChecked={state === 3}
                      id=""
                      onChange={handleInput}
                    />

                    <input
                      type="radio"
                      name={name1}
                      value={2}
                      defaultChecked={state === 2}
                      id=""
                      onChange={handleInput}
                    />

                    <input
                      type="radio"
                      name={name1}
                      value={1}
                      defaultChecked={state === 1}
                      onChange={handleInput}
                    />
                  </div>
                );
              })}

              <h1>Total Marks: {total}</h1>
              {showAlert && <Alert />}
              <button className="btn" type="submit" onClick={handleSubmit}>
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PerformanceDetails;
