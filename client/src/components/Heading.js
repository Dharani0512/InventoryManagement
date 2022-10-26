import React, { useState } from "react";
import AddButton from "./Addbutton";

const Heading = ({ headingName, showAddButton, handleClick }) => {
  // const [showModal, setShowModal] = useState(false);

  // const handleClick = () => {
  //   setShowModal(!showModal);
  // };
  return (
    <div className="top-section">
      <h1 className="employee-heading">{headingName}</h1>
      {showAddButton ? <AddButton handleClick={handleClick} /> : null}
    </div>
  );
};

export default Heading;
