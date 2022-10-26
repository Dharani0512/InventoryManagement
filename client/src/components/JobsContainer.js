import { useAppcontext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { SearchContainer } from ".";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    getDetails,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppcontext();
  useEffect(() => {
    getJobs();
    // getDetails();
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Leave to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <SearchContainer />
      <h5>
        {totalJobs} leave{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
