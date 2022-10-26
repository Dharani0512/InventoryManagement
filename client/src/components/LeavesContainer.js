import { useAppcontext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Leave from "./Leave";
import Wrapper from "../assets/wrappers/JobsContainer";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";
const LeavesContainer = () => {
  const {
    isLoading,
    details,
    totalDetails,
    getDepartment,
    setEditDepartment,
    deleteDetail,
  } = useAppcontext();
  useEffect(() => {
    getDepartment("/leaveDetails", "stateAdmin");
  }, []);
  console.log(details);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No Details to Display</h2>
    </Wrapper>;
  }

  // const {
  //   isLoading,
  //   details,
  //   totalDetails,
  //   getDepartment,
  //   setEditDepartment,
  //   deleteDetail,
  // } = useAppcontext();
  // useEffect(() => {
  //   getDepartment("/leaveDetails");
  // }, []);
  // console.log(details);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h3>to leave details to display</h3>
    </Wrapper>;
  }
  return (
    // <h1>hello</h1>
    <Wrapper>
      <h5>
        {totalDetails} leave{details.length > 1 && "s"} found
      </h5>
      {details.map((item) => {
        return <Leave {...item} />;
      })}
    </Wrapper>
  );
};
export default LeavesContainer;
