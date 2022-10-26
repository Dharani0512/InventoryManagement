import { StatusCodes } from "http-status-codes";
import personalDetails from "../../models/Admin/personalDetails.js";
import loginAttendanceDetails from "../../models/Employee/loginAttendance.js";
import EmployeeDetails from "../../models/Admin/EmployeeDetail.js";
import performance from "../../models/Admin/performance.js";
import NotFoundError from "../../errors/not-found.js";
import {
  formatDate,
  findDates,
  loginDate,
  endDay,
  compareDates,
  datecon,
  startOfMonth,
  endOfMonth,
  todayFormat,
  startofYear,
  endofYear,
} from "../../utils/formatDate.js";
import date from "date-and-time";
import moment from "moment";
import loginAttendance1 from "../../models/Employee/loginAttendance.js";
import userModel from "../../models/User.js";
import { createTestAccount } from "nodemailer";
import projects from "../../models/Admin/projects.js";
import sendDetails from "../../helper/sendDetails.js";

const putAttendance = async (req, res, loginAttendance) => {
  console.log(req.params);
  
  const {latitude , longitude } = req.body 
if (!latitude && !longitude) {
    throw new NotFoundError("please provide latitude and longitude");
  }
 
  req.body.latitude = latitude
  req.body.longitude = longitude
  req.body.createdBy = req.emp.empId;
  req.body.adminId = req.adminId.admId;
  req.body.workingLocation = req.body.location;
  //need to put empId in loginAttendence
  const roleId = req.emp.empId;
  const gotRole = await userModel.findById({ _id: roleId });
  req.body.empId = gotRole.empId;
  req.body.state = gotRole.state;
  req.body.role = gotRole.role;
  const loginName = await personalDetails.find({
    createdFor: req.emp.empId,
  });

  if (!loginName[0]) {
    throw new NotFoundError("please fill the personal details from");
  }

  const { name, email } = loginName[0];
  req.body.attendanceName = name;
  req.body.attendanceEmail = email;

  //one day  only id can put attendence
  /*
   date, id, count
  */
  let bodyDate = 0;
  const today = new Date();
  const findLastDate = await EmployeeDetails.findOne({
    createdFor: req.emp.empId,
  });
  const time = endDay(new Date());
  let lastDateDetails = findLastDate.lastDate;
  let todayConverted = datecon(today); //findDates(today);
  let findLastDateConverted = datecon(lastDateDetails);
//--changed update


  req.body.data = compareDates(today);
  req.body.data2 = moment(today).format("MMM Do YY");
  const detail = await loginAttendance.create(req.body);
   const updateLastDate = await EmployeeDetails.findOneAndUpdate(
      {
        createdFor: req.emp.empId,
      },
      {
        $set: { logedIn: 1, lastDate: today },
      }
    );
    res.status(StatusCodes.CREATED).json({ detail });

  // if (todayConverted > findLastDateConverted && findLastDate.logedIn == 0) {
  //   req.body.date = compareDates(today);
  //   req.body.date2 = moment(today).format("MMM Do YY");
  //   const detail = await loginAttendance.create(req.body);
  //   const updateLastDate = await EmployeeDetails.findOneAndUpdate(
  //     {
  //       createdFor: req.emp.empId,
  //     },
  //     {
  //       $set: { logedIn: 1, lastDate: today },
  //     }
  //   );
  //   res.status(StatusCodes.CREATED).json({ detail });
  // } else if (
  //   todayConverted == findLastDateConverted &&
  //   findLastDate.logedIn == 0
  // ) {
  //   req.body.date = compareDates(today);
  //   req.body.date2 = moment(today).format("MMM Do YY");
  //   const detail = await loginAttendance.create(req.body);
  //   const updateLastDate = await EmployeeDetails.findOneAndUpdate(
  //     {
  //       createdFor: req.emp.empId,
  //     },
  //     {
  //       $set: { logedIn: 1 },
  //     }
  //   );
  //   res.status(StatusCodes.CREATED).json({ detail });
  // } else if (
  //   todayConverted == findLastDateConverted &&
  //   findLastDate.logedIn == 1
  // ) {
  //   const updateLastDate = await EmployeeDetails.findOneAndUpdate(
  //     {
  //       createdFor: req.emp.empId,
  //     },
  //     {
  //       $set: { logedIn: 1, lastDate: today },
  //     },
  //     { new: true, runValidators: true }
  //   );

  //   res.status(StatusCodes.BAD_REQUEST).json({ msg: "your already logged In" });
  // } else if (
  //   todayConverted > findLastDateConverted &&
  //   findLastDate.logedIn == 1
  // ) {
  //   const reset = await EmployeeDetails.findOneAndUpdate(
  //     {
  //       createdFor: req.emp.empId,
  //     },
  //     {
  //       $set: { logedIn: 0 },
  //     },
  //     { new: true, runValidators: true }
  //   );
  //   req.body.date = compareDates(today);
  //   req.body.date2 = moment(today).format("MMM Do YY");
  //   const detail = await loginAttendance.create(req.body);
  //   const updateLastDate = await EmployeeDetails.findOneAndUpdate(
  //     {
  //       createdFor: req.emp.empId,
  //     },
  //     {
  //       $set: { logedIn: 1, lastDate: today },
  //     }
  //   );
  //   res.status(StatusCodes.CREATED).json({ detail });
  // } else {
  //   res.json({ msg: "error" });
  // }
};
// --------------------------------------------------
//putlogout
const putLogout = async (req, res,) => {
  const { id: emailId} = req.params;
  const logout = await loginAttendanceDetails.findOneAndUpdate(
    {
      attendanceEmail : emailId,
    },
    req.body,

    { upsert: true, sort: {createdAt : -1},new: false, runValidators: true }
    );
    console.log({logout});
    
  
  const today = new Date();
  const updateLastDate = await EmployeeDetails.findOneAndUpdate(
    {
      createdFor: req.emp.empId,
    },
    {
      $set: { logedIn: 1, lastDate: today },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ logout });
};

const getAllAttendance = async (req, res, loginAttendance) => {
  const { search, date, sort, filter } = req.query;

  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID

  const findAdmin = await userModel.findOne({ adminId });

  let output;
  console.log(date);
  if (findAdmin.role === "Admin") {
    output = await sendDetails(
      req,
      {},
      [search, date],
      ["attendanceName", "date2"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      loginAttendance,
      sort,
      filter,
      "department"
    );
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [search, date],
      ["attendanceName", "date2"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      loginAttendance,
      sort,
      filter,
      "date"
    );
  }

  res.status(StatusCodes.OK).json({
    // details,
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const filerByDate = async (req, res, loginAttendance) => {
  let filterDate = await loginAttendance.aggregate([
    // { $match: { createdBy: Mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$date", count: { $sum: 1 } } },
  ]);
  res.status(StatusCodes.OK).json({ filterDate });
};

const deleteAllDetails = async (req, res, loginAttendance) => {
  const { id: deleteId } = req.params;
  const details = await loginAttendance.deleteMany();
};

// Number_of_Employees persent view in dashboard daily view
const noOfEmpolyeePresent = async (req, res) => {
  //------

  const roleId = req.emp.empId;
  const gotRole = await userModel.findById({ _id: roleId });

  let empId = req.employeeId.empId; //stateadmin emp id
  let today = new Date();
  let date = compareDates(today);
  let access = (gotRole, empId) => {
    let queryObject = {};
    if (gotRole.role == "Admin") {
      let getAdm = { adminId: empId, date: date.substring(0,10) };

      // let result = EmployeeDetail.find(getAdm);
      queryObject = getAdm;
    } else if (gotRole.role == "stateAdmin") {
      let getEmp = {
        empId: empId,
        role: "Employee",
        state: gotRole.state,
        data: date.substring(0,10)
      };
      // let result = EmployeeDetail.find(getEmp);
      queryObject = getEmp;
    }
    return queryObject;
  };
  //-------------
  const queryObject = access(gotRole, empId);

  const data = await loginAttendanceDetails.find(queryObject);
  console.log("data",data, queryObject);
  
  let final = 0;
  const result = data.filter((emp) => {
    let dates = emp.date;
    
    const Convdate = compareDates(dates);
    const createdAt = compareDates(emp.createdAt);
    const newD = new Date();
    const date = compareDates(newD);
    console.log("ls",Convdate.substring(0,10),date.substring(0,10) , createdAt.substring(0,10));
    
    
    if ((Convdate.substring(0,10) && date.substring(0,10) && createdAt.substring(0,10)) == date.substring(0,10)) {
      final = final + 1
      // return emp;
    }
   
  });
  console.log(result);
  
  


  //employees details for total no of emp

  const details = await userModel.find(queryObject);
  //who is accessing

  //get all logindetails

  // get total projects

  let totalProject;
  let queryperformance;
  const uniqueId = req.emp.empId;
  const user = await userModel.findById(uniqueId);
  if (user.role === "Admin") {
    const total = await projects.find({});
    const performance = {
      createdAt: { $gte: startofYear(), $lte: endofYear() },
    };
    queryperformance = performance;
    totalProject = total.length;
  } else if (user.role === "stateAdmin") {
    const total = await projects.find({
      projectLocationId: req.stateAdmin.stateAdminId,
    });
    const performance = {
      empId: empId,
      role: "Employee",
      state: gotRole.state,
      createdAt: { $gte: startofYear(), $lte: endofYear() },
    };
    totalProject = total.length;
    queryperformance = performance;
  }

  //graph performance details
  // const allPerformance = await performance.find({
  //   createdAt: { $gte: startofYear(), $lte: endofYear() },
  // });

  const allPerformance = await performance.find(queryperformance);

  const countAllPerformance = await performance
    .find(queryperformance)
    .countDocuments();

  let months = {
    Jan: {
      name: "Jan",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Feb: {
      name: "Feb",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Mar: {
      name: "Mar",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Apr: {
      name: "Apr",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    May: {
      name: "May",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Jun: {
      name: "Jun",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Jul: {
      name: "Jul",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Aug: {
      name: "Aug",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Sep: {
      name: "Sep",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Oct: {
      name: "Oct",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Nov: {
      name: "Nov",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
    Dec: {
      name: "Dec",
      behaviour: 0,
      initiative: 0,
      jobKnowledge: 0,
      compliance: 0,
      grasping: 0,
      proactiveness: 0,
      regularWork: 0,
      leadership: 0,
      newBusiness: 0,
      teamManagement: 0,
      targetAchivement: 0,
      total: 0,
    },
  };
  let elementTotal = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  let mr = []; //Aug
  const wholeTotal = countAllPerformance * 55;
  for (let i = 0; i < allPerformance.length; i++) {
    let temp = allPerformance[i].createdAt.toString(); //change string
    mr.push(temp.slice(4, 7)); //slice the string
    if (mr[0] == months[mr[0]].name) {
      months[mr[0]].behaviour += allPerformance[i].behaviour;

      months[mr[0]].jobKnowledge += allPerformance[i].jobKnowledge;

      months[mr[0]].compliance += allPerformance[i].compliance;

      months[mr[0]].initiative += allPerformance[i].initiative;

      months[mr[0]].grasping += allPerformance[i].grasping;

      months[mr[0]].proactiveness += allPerformance[i].proactiveness;

      months[mr[0]].regularWork += allPerformance[i].regularWork;

      months[mr[0]].leadership += allPerformance[i].leadership;

      months[mr[0]].newBusiness += allPerformance[i].newBusiness;

      months[mr[0]].teamManagement += allPerformance[i].teamManagement;

      months[mr[0]].targetAchivement += allPerformance[i].targetAchivement;

      months[mr[0]].total =
        months[mr[0]].behaviour +
        months[mr[0]].initiative +
        months[mr[0]].compliance +
        months[mr[0]].grasping +
        months[mr[0]].jobKnowledge +
        months[mr[0]].proactiveness +
        months[mr[0]].targetAchivement +
        months[mr[0]].teamManagement +
        months[mr[0]].newBusiness +
        months[mr[0]].leadership +
        months[mr[0]].regularWork;

      elementTotal[mr[0]] = Math.round(
        (months[mr[0]].total / wholeTotal) * 100
      );
    }
    mr.pop();
  }
  // console.log("flag", elementTotal);

  const element_keys = Object.keys(elementTotal);
  const element_value = Object.values(elementTotal);
  const CharData = () => {
    let i;
    let details = [];
    for (i = 0; i < 12; i++) {
      details.push({ label: element_keys[i], value: element_value[i] });
    }

    return details;
  };
  const ServerChartData = CharData();
  // const ServerChartData = [
  //   {
  //     label: element_keys[0],
  //     value: element_value[0],
  //   },
  //   {
  //     label: element_keys[1],
  //     value: element_value[1],
  //   },
  //   {
  //     label: element_keys[2],
  //     value: element_value[2],
  //   },
  //   {
  //     label: element_keys[3],
  //     value: element_value[3],
  //   },
  //   {
  //     label: element_keys[4],
  //     value: element_value[4],
  //   },
  //   {
  //     label: element_keys[5],
  //     value: element_value[5],
  //   },
  //   {
  //     label: element_keys[6],
  //     value: element_value[6],
  //   },
  //   {
  //     label: element_keys[7],
  //     value: element_value[7],
  //   },
  //   {
  //     label: element_keys[8],
  //     value: element_value[8],
  //   },
  //   {
  //     label: element_keys[9],
  //     value: element_value[9],
  //   },
  //   {
  //     label: element_keys[10],
  //     value: element_value[10],
  //   },
  //   {
  //     label: element_keys[11],
  //     value: element_value[11],
  //   },
  // ];
 console.log("final",final);
  
  res.json([
    { noOfProjects: totalProject },
    { noOfEmpolyeePresent: final },
    { noOfEmpolyeeAbsent: details.length - final },
    { totalNoOfEmployee: details.length },
    { graphPerformanceDetailsmonthly: ServerChartData },
  ]);
};

// Number_of_Employees absent view in dashboard
const noOfEmpolyeeAbsent = async (req, res) => {
  //get all employee details
  const details = await EmployeeDetails.find({});
  console.log(details.length);

  //get all logindetails
  const data = await loginAttendanceDetails.find({});

  const result = data.filter((a) => {
    return a.date == formatDate(new Date());
  });
  console.log("noOfEmpolyeeAbsent", details.length - result.length);

  res.json({ details: details.length - result.length });
};

export {
  putAttendance,
  noOfEmpolyeePresent,
  noOfEmpolyeeAbsent,
  getAllAttendance,
  putLogout,
  filerByDate,
  deleteAllDetails,
};
