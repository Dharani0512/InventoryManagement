import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/connect.js";
import EmployeeDetail from "./models/Admin/EmployeeDetail.js";
import DepartmentDetails from "./models/Admin/DepartmentDetails.js";
import loginAttendance from "./models/Employee/loginAttendance.js";
// import salaryDetails from "./models/Admin/salaryDetails.js";
import leaveDetails from "./models/Employee/leaveDetails.js";
import performanceDetails from "./models/Admin/performance.js";
import User from './models/User.js'
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    await loginAttendance.deleteMany();

     const jsonProducts = JSON.parse(
       await readFile(new URL("./Mock.json", import.meta.url)))
    await User.create(jsonProducts);
    console.log("sucess");
     process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
