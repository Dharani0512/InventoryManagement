import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { useAppcontext } from "../context/appContext";
import { useEffect } from "react";
const LocationSettings = () => {
  const {
    createLocation,
    getLocation,
    handleChange,
    locationOptions,
    locationName,
  } = useAppcontext();
  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createLocation(
      "locationOptions",
      { listOfLocation: locationName },
      "Location Option Added Successfully"
    );
  };
  return (
    <Wrapper>
      <form className="form">
        <h3 className="form-heading">location settings </h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="locationName"
            value={locationName}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default LocationSettings;
