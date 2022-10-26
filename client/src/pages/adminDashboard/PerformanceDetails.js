import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import { Alert } from "../../components";

const RadioButtonsGroup = () => {
  const { createDepartment, showAlert, isEditing, editDepartment } =
    useAppcontext();

  const [initiative, setInitiative] = useState("0");
  const [jobKnowledge, setJobKnowledge] = useState("0");
  const [compliance, setCompliance] = useState("0");
  const [behavior, setBehavior] = useState("0");
  const [grasping, setGrasping] = useState("0");
  const [proactiveness, setProactiveness] = useState("0");

  const initiativeValue = parseInt(initiative) * (100 / 30);
  const jobKnowledgeValue = parseInt(jobKnowledge) * (100 / 30);
  const complianceValue = parseInt(compliance) * (100 / 30);
  const behaviorValue = parseInt(behavior) * (100 / 30);
  const graspingValue = parseInt(grasping) * (100 / 30);
  const proactivenessValue = parseInt(proactiveness) * (100 / 30);

  const location = useLocation();
  const { name, role, createdFor, employeeId } = location.state;

  const total = parseInt(
    parseInt(initiative) * (100 / 30) +
      parseInt(jobKnowledge) * (100 / 30) +
      parseInt(compliance) * (100 / 30) +
      parseInt(behavior) * (100 / 30) +
      parseInt(grasping) * (100 / 30) +
      parseInt(proactiveness) * (100 / 30)
  );
  // setStarRating(total);

  const performanceStates = {
    employeeId,
    name,
    initiativeValue,
    jobKnowledgeValue,
    complianceValue,
    behaviorValue,
    graspingValue,
    proactivenessValue,
    createdFor,
  };

  const obj = [
    {
      name: "Initiative & Passion",
      state: initiative,
      setState: setInitiative,
    },
    {
      name: "Ability to apply Job knowledge ",
      state: jobKnowledge,
      setState: setJobKnowledge,
    },
    { name: "Compliance", state: compliance, setState: setCompliance },
    {
      name: "Behaviour with customer/client/colleagues",
      state: behavior,
      setState: setBehavior,
    },
    { name: "Grasping Ability", state: grasping, setState: setGrasping },
    { name: "Proactiveness", state: proactiveness, setState: setProactiveness },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const editStates = {
      initiativeValue,
      jobKnowledgeValue,
      complianceValue,
      behaviorValue,
      graspingValue,
      proactivenessValue,
    };
    if (isEditing) {
      editDepartment(
        "performanceDetails",
        editStates,
        "Performance Edited Succesfully"
      );
      return;
    }
    createDepartment(
      "performanceDetails",
      performanceStates,
      "Performance Created"
    );
  };

  return (
    <Wrapper>
      <div className="Employee-container">
        <h2 className="center">Performance details</h2>
        <div className="performance-name">
          <div className="name"></div>
          <h3>Employee : {name} </h3>
          <div className="name">
            <h3>Department :{role} </h3>
          </div>
        </div>
        <div className="table">
          <form action="" onSubmit={handleSubmit}>
            {obj.map(({ name, state, setState }, index) => {
              return (
                <div className="performance-card" key={index}>
                  <FormControl className="performance-list">
                    <h4
                      className="performance-heading"
                      id="demo-row-radio-buttons-group-label"
                    >
                      {`${index + 1}. ${name}`}
                    </h4>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={state}
                      name="radio-buttons-group"
                      onChange={(e) => setState(e.target.value)}
                      className="performance-list"
                      defaultChecked
                    >
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Excellent"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Very Good"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Good"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Average"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Bellow Average"
                        labelPlacement="bottom"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              );
            })}

            <h1>Total Marks: {total}</h1>

            {showAlert && <Alert />}
            <button onClick={handleSubmit} className="btn">
              submit
            </button>
          </form>
        </div>
        <p>{total}</p>
      </div>
    </Wrapper>
  );
};

export default RadioButtonsGroup;
