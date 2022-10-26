import express from "express";
const router = express.Router();
// personal details import
import personalDetails from "../models/Admin/personalDetails.js";
import { getSinglePersonalDetails } from "../controllers/admin/personalDetails.js";
import {
  createLeaveDetails,
  deleteLeaveDetails,
  editLeaveDetails,
  getAllLeaveDetails,
} from "../controllers/employeeDetails/leaveDetails.js";
import leaveDetails from "../models/Employee/leaveDetails.js";
import loginAttendance from "../models/Employee/loginAttendance.js";
import {
  deleteAllDetails,
  filerByDate,
  getAllAttendance,
  putAttendance,
  putLogout,
} from "../controllers/employeeDetails/loginAttendance.js";
import { putCheckIn } from "../controllers/employeeDetails/punchIn.js";
import punchIn from "../models/Employee/punchIn.js";
import performanceModal from "../models/Admin/performance.js";
import {
  getSinglePerformance,
  lastMonthPerformance,
} from "../controllers/admin/performance.js";
import { getSingleMonthlySalary } from "../controllers/admin/monthlySalary.js";
import {
  createComments,
  deleteComments,
  getComments,
} from "../controllers/employeeDetails/performanceCommnets.js";

import { employeeDashboard } from "../controllers/employeeDetails/employeeDashboard.js";
import { createImage } from "../controllers/admin/imageUpload.js";
import { getSingleDepartment } from "../controllers/admin/DeparmentDetails.js";

/Employee dashboard/;
router.route("/employeeDashboard").get(employeeDashboard);

// employee view only details
// employee personal details
router
  .route("/personalDetails/:id")
  .get((req, res) => getSinglePersonalDetails(req, res, personalDetails));
// salary detail
router.route("/salaryDetail/:id").get(getSingleMonthlySalary);

// performace details
router.route("/performanceDetail/:id").get(getSinglePerformance);
router.route("/lastMonthPerformance").get(lastMonthPerformance);

// departement details
router.route("/departmentDetail/:id").get(getSingleDepartment);
// employee leave details form
router.route("/leaveDetails").post(createLeaveDetails).get(getAllLeaveDetails);
router
  .route("/leaveDetails/:id")
  .patch(editLeaveDetails)
  .delete(deleteLeaveDetails);

//  employee Attendance login and logout
router
  .route("/loginAttendance")
  .post((req, res) => putAttendance(req, res, loginAttendance))
  .get((req, res) => getAllAttendance(req, res, loginAttendance));

router
  .route("/logoutAttendance/:id")
  .patch((req, res) => putLogout(req, res, loginAttendance));

router
  .route("/loginAttendance/:id")
  .delete((req, res) => deleteAllDetails(req, res, loginAttendance));

// performance comments

router.route("/performanceComments").post(createComments).get(getComments);
router.route("/performanceComments/:id").delete(deleteComments);
// performance details
// router.route("/singlePerformanceDetail/:id").get(getSinglePerformance);

// employee Attendance login and logout second modal
router.route("/punchIn").post((req, res) => putCheckIn(req, res, punchIn));

router.route("/imageUpload").post(createImage);
export default router;
