import React from "react";
import { useAppcontext } from "../../context/appContext";
import { FormRowSelect } from "..";
import Wrapper from "../../assets/wrappers/SearchContainer";

const SalaryDetailsSearch = () => {
  const {
    salaryStatusOptions,
    salaryStatus,
    sort,
    sortOptions,
    isLoading,
    handleChange,
    clearFilters,
  } = useAppcontext();

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
        <h4>Search From</h4>
        <form className="form-center">
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <FormRowSelect
            name="salaryStatus"
            labelText="Salary Status"
            value={salaryStatus}
            handleChange={handleSearch}
            list={salaryStatusOptions}
          ></FormRowSelect>
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

export default SalaryDetailsSearch;
