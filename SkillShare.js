import React, { useState } from "react";

const LearnHooks = () => {
  const [color, setColor] = useState("pink");
  return (
    <>
      <h1> the color is {color} </h1>
      <button onClick={() => setColor("red")}> click me </button>
    </>
  );
};

export default LearnHooks;
