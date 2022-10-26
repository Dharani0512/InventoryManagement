import { request } from "express";
import { StatusCodes } from "http-status-codes";
import { findDate } from "../../utils/formatDate.js";
// import performance from "../../models/Admin/performance";
import leaveDetails from "../../models/Employee/leaveDetails.js";
import performanceDetails from "../../models/Admin/performance.js";
//view employee Present details  on dashboard
import loginAttendance from "../../models/Employee/loginAttendance.js";
import {
  startOfMonth,
  endOfMonth,
  todayFormat,
} from "../../utils/formatDate.js";

const employeeDashboard = async (req, res) => {
  const userId = req.emp.empId;

  const getEmployeeAttendence = await loginAttendance
    .find({
      createdBy: userId,
      date: { $gte: startOfMonth(), $lte: endOfMonth() },
    })
    .countDocuments();

  const start = startOfMonth();
  const today = todayFormat();

  const getEmployeeAbsent = await leaveDetails.find({
    createdBy: userId,
    status: "approved",
    fromDate: { $gte: start, $lte: today },
    toDate: { $gte: start, $lte: today },
  });
  let countOfLeave = [];
  let employeeAbsentLength = getEmployeeAbsent.length;
  for (let i = 0; i < employeeAbsentLength; i++) {
    countOfLeave.push(getEmployeeAbsent[i].totalDays);
  }
  let counts = countOfLeave.reduce((accu, valu) => {
    return valu + accu;
  }, 0);

  const id = req.emp.empId;
  const getEmployeePerformace = await performanceDetails.find({
    createdFor: id,
  });
  const getDetails = getEmployeePerformace.map((people) => {
    const groupOfElements =
      people.initiative +
      people.jobKnowledge +
      people.compliance +
      people.behaviour +
      people.grasping +
      people.proactiveness +
      people.regularWork +
      people.leadership +
      people.newBusiness +
      people.teamManagement +
      people.targetAchivement;
    return groupOfElements;
  });
  const overAllPerformance = () => {
    const totalValue = getDetails.reduce((acc, val) => {
      return val + acc;
    }, 0);
    const wholeTotal = getDetails.length * 55;
    const totalPerformance = (totalValue / wholeTotal) * 100;
    return `${Math.round(totalPerformance)}%`;
  };
  const lastMonthPerformanceDetails = () => {
    let detials = getDetails[getDetails.length - 1];
    const percentage = (detials / 55) * 100;
    return `${Math.round(percentage)}%`;
  };
  // console.log(totalDays);
  res.status(200).json({
    EmployeePresent: getEmployeeAttendence,
    EmployeeAbsent: counts,
    EmployeeOverallPerformace: overAllPerformance(),
    EmployeeLastMonthPerformance: lastMonthPerformanceDetails(),
  });
};

export { employeeDashboard };
