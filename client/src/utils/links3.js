import { IoBarChartSharp } from "react-icons/io5";
import {
  FaWpforms,
  FaAmazonPay,
  FaFingerprint,
  FaUserPlus,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineBarChart } from "react-icons/ai";
import { BsFillPersonFill, BsFolderMinus, BsPerson } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import React from "react";

const links = [
  {
    id: 1,
    text: "Dashboard",
    path: "/stateAdmin",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Projects",
    path: "/stateAdmin/Projects",
    icon: <AiOutlineFundProjectionScreen />,
  },
  {
    id: 3,
    text: "Employee ",
    path: "/stateAdmin",
    icon: <IoBarChartSharp />,
    submenu: true,
    submenuText: "first",
    submenuContents: [
      {
        id: 31,
        text: "Employee Details",
        path: "/stateAdmin/employeeDetails",
        icon: <BsFillPersonFill />,
        submenuText1: "first",
      },
      {
        id: 32,
        text: "Department Details",
        path: "/stateAdmin/departmentDetails",
        icon: <RiBankLine />,
      },
      {
        id: 33,
        text: "Personal Details",
        path: "/stateAdmin/personalDetails",
        icon: <FaUserFriends />,
      },
    ],
  },

  {
    id: 4,
    text: "Salary",
    path: "/stateAdmin/monthlySalary",
    icon: <FaAmazonPay />,
    submenu: true,
    submenuText: "second",
    submenuContents: [
      {
        id: 41,
        text: "Monthly Details",
        path: "/stateAdmin/monthlySalary",
        icon: <FaAmazonPay />,
      },
      {
        id: 42,
        text: "Salary Template",
        path: "/stateAdmin/salaryTemplate",
        icon: <FaAmazonPay />,
      },
    ],
  },

  {
    id: 5,
    text: "Attendance Details",
    path: "/stateAdmin/attendanceDetails",
    icon: <FaWpforms />,
  },
  {
    id: 6,
    text: "Leave Details",
    path: "/stateAdmin/leaveDetails",
    icon: <FaFingerprint />,
  },

  {
    id: 7,
    text: "Performance",
    path: "/stateAdmin/displayPerformance",
    icon: <AiOutlineBarChart />,
  },
  // {
  //   id: 11,
  //   text: "Register new User",
  //   path: "/stateAdmin/registerUser",
  //   icon: <FaUserPlus />,
  // },
  {
    id: 8,
    text: "All User",
    path: "/stateAdmin/allUser",
    icon: <FaUserFriends />,
  },

  {
    id: 9,
    text: "Admin Personal Details",
    icon: <FaUser />,
    path: "/stateAdmin/personalDetail",
    submenu: true,
    submenuText: "third",
    submenuContents: [
      {
        id: 91,
        text: "personal details",
        path: "/stateAdmin/personalDetail ",
        icon: <BsPerson />,
      },
      {
        id: 92,
        text: "salary detail",
        path: "/stateAdmin/salaryDetail",
        icon: <FaAmazonPay />,
      },
      {
        id: 93,
        text: "performance Details",
        path: "/stateAdmin/performanceDetails",
        icon: <IoBarChartSharp />,
      },

      {
        id: 94,
        text: "leave Form",
        path: "/stateAdmin/leaveForm",
        icon: <FaWpforms />,
      },
      {
        id: 95,
        text: "LeaveDetails",
        path: "/stateAdmin/leaveDetailsEmp",
        icon: <FaFingerprint />,
      },
      {
        id: 96,
        text: "Daily Attendance ",
        path: "/stateAdmin/dailyAttendance",
        icon: <AiFillCheckCircle />,
      },
    ],
  },
];

export default links;
