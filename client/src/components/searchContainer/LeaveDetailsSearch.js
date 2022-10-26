import React from "react";
import Wrapper from "../../assets/wrappers/SearchContainer";
import { useAppcontext } from "../../context/appContext";
import { FormRowSelect, FormRow } from "..";
const LeaveDetailsSearch = () => {
  const { sort, sortOptions, search, isLoading, handleChange, clearFilters } =
    useAppcontext();
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
      <form className="form">
        <h4>Search Form</h4>
        <form className="form-center">
          <FormRow
            name="search"
            labelText="Emp Name"
            value={search}
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
      </form>
    </Wrapper>
  );
};

export default LeaveDetailsSearch;
