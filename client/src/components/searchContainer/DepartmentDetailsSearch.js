import React, { useEffect } from "react";
import { useAppcontext } from "../../context/appContext";
import { FormRow, FormRowSelect } from "..";
import Wrapper from "../../assets/wrappers/SearchContainer";

const DepartmentDetailsSearch = () => {
  const {
    department,
    searchDepartmentOptions,
    searchDepartment,
    getDepartmentOptions,
    searchDesignation,
    sort,
    sortOptions,
    isLoading,
    handleChange,
    clearFilters,
  } = useAppcontext();
  useEffect(() => {
    getDepartmentOptions("departmentOptions");
  }, []);
  console.log(searchDepartmentOptions);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <div className="form">
        <h4>Search Form</h4>
        <form className="form-center">
          <FormRowSelect
            type="text"
            name="department"
            value={department}
            list={searchDepartmentOptions}
            handleChange={handleSearch}
          ></FormRowSelect>
          <FormRow
            type="text"
            labelText="Designation"
            name="searchDesignation"
            value={searchDesignation}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
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

export default DepartmentDetailsSearch;
