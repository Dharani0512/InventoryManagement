import React from "react";
import { useAppcontext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/SearchContainer";

import { FormRow, FormRowSelect } from "..";

const PerformanceDetailsSearch = () => {
  const {
    searchPerformance,
    starRating,
    handleChange,
    isLoading,
    clearFilters,
    sort,
    starRatingOptions,
    sortOptions,
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
      <div className="form">
        <h4>Search Form</h4>
        <form className="form-center">
          <FormRow
            type="text"
            labelText="Emp Name"
            name="searchPerformance"
            value={searchPerformance}
            handleChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            labelText="Filter by Star Rating"
            name="starRating"
            value={starRating}
            handleChange={handleSearch}
            list={starRatingOptions}
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

export default PerformanceDetailsSearch;
