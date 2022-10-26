import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaAmazonPay, FaFingerprint, FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillPersonFill, BsFolderMinus, BsPerson } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
const links = [
  {
    id: 1,
    text: "Dashboard",
    path: "/employee",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Personal Details",
    path: "/employee/personalDetail",
    icon: <BsPerson />,
  },{
    id: 23,
    text: "Department Details",
    path: "/employee/departmentDetail",
    icon: <RiBankLine/>,
  },
  {
    id: 3,
    text: "Salary detail",
    path: "/employee/salaryDetail",
    icon: <FaAmazonPay />,
  },
  {
    id: 4,
    text: "performance Details",
    path: "/employee/performanceDetails",
    icon: <IoBarChartSharp />,
  },

  {
    id: 5,
    text: "leave Form",
    path: "/employee/leaveForm",
    icon: <FaWpforms />,
  },
  {
    id: 6,
    text: "LeaveDetails",
    path: "/employee/LeaveDetails",
    icon: <FaFingerprint />,
  },
  {
    id: 7,
    text: "Daily Attendance ",
    path: "/employee/dailyAttendance",
    icon: <AiFillCheckCircle />,
  },
];

export default links;
