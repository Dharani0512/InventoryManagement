import { IoBarChartSharp } from "react-icons/io5";
import {
  FaWpforms,
  FaAmazonPay,
  FaFingerprint,
  FaUserPlus,
  FaUserFriends,
} from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const links = [
  {
    id: 1,
    text: "Dashboard",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Projects",
    path: "/Projects",
    icon: <AiOutlineFundProjectionScreen />,
  },
  {
    id: 3,
    text: "Employee",
    path: "/",
    icon: <BsFillPersonFill />,
    submenu: true,
    submenuText: "first",
    submenuContents: [
      {
        id: 31,
        text: "Employee Details",
        path: "/employeeDetails",
        icon: <BsFillPersonFill />,
      },
      {
        id: 32,
        text: "Department Details",
        path: "/departmentDetails",
        icon: <RiBankLine />,
      },
      {
        id: 33,
        text: "Personal Details",
        path: "/personalDetails",
        icon: <FaUserFriends />,
      },
    ],
  },

  {
    id: 4,
    text: "Attendance Details",
    path: "/attendanceDetails",
    icon: <FaWpforms />,
  },
  {
    id: 5,
    text: "Leave Details",
    path: "/leaveDetails",
    icon: <FaFingerprint />,
  },
  {
    id: 6,
    text: "Salary Details",
    path: "",
    icon: <FaAmazonPay />,
    submenu: true,
    submenuText: "second",
    submenuContents: [
      {
        id: 61,
        text: "Monthly Details",
        path: "/monthlySalary",
        icon: <FaAmazonPay />,
      },
      {
        id: 62,
        text: "Salary Template",
        path: "/salaryTemplate",
        icon: <FaAmazonPay />,
      },
    ],
  },

  {
    id: 7,
    text: "Performance",
    path: "/displayPerformance",
    icon: <AiOutlineBarChart />,
  },

  {
    id: 8,
    text: "All User",
    path: "/allUser",
    icon: <FaUserFriends />,
  },
];

export default links;
