import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText, unMatch }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={unMatch ? "form-input active" : "form-input"}
      />
    </div>
  );
};

export default FormRow;
