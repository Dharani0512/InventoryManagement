import React, { useEffect } from "react";
import { useAppcontext } from "../../context/appContext";
import { FormRow, FormRowSelect } from "..";
import Wrapper from "../../assets/wrappers/SearchContainer";

const ProjectSearch = () => {
  const {
    search,
    isLoading,
    handleChange,
    searchDepartmentOptions,
    departmentOptions,
    clearFilters,
    getDepartmentOptions,
    stateList,
    district,
    countryState,
  } = useAppcontext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  useEffect(() => {
    getDepartmentOptions("locationOptions");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <div className="form">
        <h4>Search Form</h4>
        <form className="form-center">
          <FormRow
            type="text"
            labelText="Project Title"
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            type="text"
            labelText="District"
            name="district"
            value={district}
            list={searchDepartmentOptions}
            handleChange={handleSearch}
          />
          <FormRowSelect
            type="text"
            name="countryState"
            labelText="State"
            value={countryState}
            list={stateList}
            handleChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default ProjectSearch;
