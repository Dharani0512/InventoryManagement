import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import authorizePermission from "../middleware/authorizePermission.js";
import {
  // createEmployeeDetails,
  getAllEmployeeDetails,
  getsingleEmployeeDetails,
  deleteEmployeeDetails,
  editEmployeeDetails,
} from "../controllers/admin/adminControllers.js";
import {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/admin/DeparmentDetails.js";
import monthlySalary from "../models/Admin/monthlySalary.js";
import {
  createMonthlySalary,
  getMonthlySalary,
  editMonthlySalary,
  deleteMonthlySalary,
  getSingleMonthlySalary,
} from "../controllers/admin/monthlySalary.js";
import {
  createPerformance,
  deletePerformanceDetails,
  editPerformance,
  getAllPerformance,
} from "../controllers/admin/performance.js";
import {
  createSalaryTemplate,
  deleteSalaryTemplate,
  editSalaryTemplate,
  getSalaryTemplate,
  getSingleSalaryTemplate,
} from "../controllers/admin/salaryTemplate.js";

// leavedetails
import {
  getAllDetailsAdmin,
  updateStatus,
} from "../controllers/admin/leaveApproval.js";

// attendance details
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
  noOfEmpolyeeAbsent,
  noOfEmpolyeePresent,
  putAttendance,
  putLogout,
} from "../controllers/employeeDetails/loginAttendance.js";
import {
  order,
  razorpayment,
  verification,
} from "../controllers/admin/payment.js";

// personal details imports
import personalDetailsModel from "../models/Admin/personalDetails.js";
import {
  createPersonalDetails,
  getAllPersonalDetails,
  getSinglePersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
} from "../controllers/admin/personalDetails.js";

// to check for user exist and refering to the created user
import createdFor from "../middleware/createdFor.js";
import EmployeeModel from "../models/Admin/EmployeeDetail.js";
import DepartmentModel from "../models/Admin/DepartmentDetails.js";
import performanceModel from "../models/Admin/performance.js";
import {
  createLocation,
  getAllLocation,
} from "../controllers/settings/locationSettings.js";
import {
  createDepartmentOptions,
  deleteDepartmentOptions,
  getAllDepartmentOptions,
} from "../controllers/settings/departmentSettings.js";
import {
  createProjects,
  deleteProjects,
  getAllProjectsAdmin,
  getAllProjectsStateAdmin,
  updateProjects,
} from "../controllers/admin/projects.js";
import salaryTemplate from "../models/Admin/salaryTemplate.js";
import { createImage } from "../controllers/admin/imageUpload.js";

// employeedetails
router
  .route("/employeeDetails")
  .post(
    auth,
    (req, res, next) => createdFor(req, res, next, EmployeeModel)
    // createEmployeeDetails
  )
  .get(getAllEmployeeDetails);
router
  .route("/employeeDetails/:id")
  .get(auth, getsingleEmployeeDetails)
  .delete(auth, deleteEmployeeDetails)
  .patch(auth, editEmployeeDetails);
// department

router
  .route("/departmentDetails")
  .post(auth, (req, res, next) => createdFor(req, res, next, DepartmentModel))
  .get(getAllDepartment);
router
  .route("/departmentDetails/:id")
  .patch(updateDepartment)
  .delete(deleteDepartment);

// attendance details

router
  .route("/loginAttendance")
  .post((req, res) => putAttendance(req, res, loginAttendance))
  .get((req, res) => getAllAttendance(req, res, loginAttendance));

router.route("/leaveDetails").post(createLeaveDetails).get(getAllLeaveDetails);
router
  .route("/leaveDetails/:id")
  .patch(editLeaveDetails)
  .delete(deleteLeaveDetails);

// attendance

router
  .route("/loginAttendance/calendar")
  .get((req, res) => filerByDate(req, res, loginAttendance));

// attendance presant and absent

router.route("/loginAttendance/findPresant").get(noOfEmpolyeePresent);
router.route("/loginAttendance/findAbsent").get(noOfEmpolyeeAbsent);

// leaveDetails
router.route("/leaveDetailsAdmin").get(getAllDetailsAdmin);
router.route("/leaveDetailsAdmin/:id").patch(updateStatus);
router.route("/leaveDetails").post(createLeaveDetails).get(getAllLeaveDetails);

// salary

// salary creating each month
router.route("/monthlySalary").post(createMonthlySalary).get(getMonthlySalary);

router
  .route("/monthlySalary/:id")
  .delete(deleteMonthlySalary)
  .patch(editMonthlySalary);

// salary Template
router
  .route("/salaryTemplate")
  .post((req, res, next) => createdFor(req, res, next, salaryTemplate))
  .get(getSalaryTemplate);

router
  .route("/salaryTemplate/:id")
  .get(getSingleSalaryTemplate)
  .patch(editSalaryTemplate)
  .delete(deleteSalaryTemplate);
//  performance Details

router
  .route("/performanceDetails")
  .post(auth, createPerformance)
  .get(getAllPerformance);

router
  .route("/performanceDetails/:id")
  .patch(editPerformance)
  .delete(deletePerformanceDetails);

// razorpay payment

router.route("/razorPayment").post(razorpayment);
router.route("/verification").post(verification);
router.route("/order").post(order);

// employee personal details
router
  .route("/personalDetails")
  .get(getAllPersonalDetails)
  .post(
    auth,
    (req, res, next) => createdFor(req, res, next, personalDetailsModel),
    createPersonalDetails
  );
router
  .route("/personalDetails/:id")
  .get(getSinglePersonalDetails)
  .patch(updatePersonalDetails)
  .delete(deletePersonalDetails);
// options
router.route("/locationOptions").post(createLocation).get(getAllLocation);

router
  .route("/departmentOptions")
  .post(createDepartmentOptions)
  .get(getAllDepartmentOptions);
router.route("/departmentOptions/:id").delete(deleteDepartmentOptions);

// projects

router.route("/projects").post(createProjects).get(getAllProjectsAdmin);

router.route("/stateProjects").get(getAllProjectsStateAdmin);

router.route("/projects/:id").delete(deleteProjects).patch(updateProjects);
router.route("/imageUpload").post(createImage);
export default router;
