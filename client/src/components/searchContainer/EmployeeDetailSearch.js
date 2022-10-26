import React from "react";
import { FormRow, FormRowSelect } from "..";
import Wrapper from "../../assets/wrappers/SearchContainer";
import { useAppcontext } from "../../context/appContext";

const EmployeeDetailSearch = () => {
  const {
    employeeDetailsId,
    sort,
    sortOptions,
    search,
    isLoading,
    handleChange,
    clearFilters,
  } = useAppcontext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
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
            labelText="Emp Name "
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Emp Id"
            name="employeeDetailsId"
            value={employeeDetailsId}
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

export default EmployeeDetailSearch;
