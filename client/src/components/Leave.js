import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppcontext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Leave = ({
  _id,
  leaveType,
  fromDate,
  toDate,
  reason,
  totalDays,
  status,
  createdAt,
  filePath,
}) => {
  const { setEditDepartment, deleteDetail, getDepartment } = useAppcontext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  console.log(leaveType);
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {leaveType === "Casual Leave"
            ? "c"
            : leaveType === "Earned Leave"
            ? "E"
            : "M"}
        </div>
        <div className="info">
          <h5>{leaveType}</h5>
          <p>Days: {totalDays}</p>
          <p>Days: {filePath}</p>
          <img src={`../utils/uploadImages/vim meme.jpg`} alt="s" />
        </div>
      </header>
      <div className="content">
        <JobInfo icon={<FaLocationArrow />} text={fromDate} />
        <JobInfo icon={<FaCalendarAlt />} text={toDate} />
        <JobInfo icon={<FaBriefcase />} text={reason} />
        <div className={`status ${status}`}>{status}</div>
        <footer>
          <div className="actions">
            <Link
              to="/employee/leaveForm"
              onClick={() => setEditDepartment(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              className="btn delete-btn"
              onClick={() => deleteDetail(_id, "leaveDetails")}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Leave;
