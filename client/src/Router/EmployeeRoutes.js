// import React from "react";
// import styled from "styled-components";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Register, Error, ProtectedRoute, Landing } from "../pages";
// import {
//   Attendance,
//   Dashboard,
//   LeaveApplication,
//   Salary,
//   Traning,
// } from "../pages/employeeDashboard";
// import {
//   AddJob,
//   AllJobs,
//   Profile,
//   Stats,
//   SharedLayout2,
// } from "../pages/tutorial";
// import { EmployeeForm, DepartmentForm } from "../components/index.js";
// import PersonalDetails from "../pages/employeeDashboard/PersonalDetails";
// import PersonalDetailsForm from "../components/PersonalDetailsForm";
// import SalaryForm from "../form/salaryForm";
// import LeaveForm from "../form/LeaveForm";
// import LeaveApplicationDetails from "../pages/employeeDashboard/LeaveApplicationDetails";
// import DailyAttedance from "../pages/employeeDashboard/DailyAttedance";
// import CalendarAttendance from "../pages/employeeDashboard/CalanderAttendance";
// import AttendanceCalendar from "../pages/employeeDashboard/AttendanceCalendar";
// import AllLeaves from "../pages/adminDashboard/AllLeaves";
// import DailyAttendance2 from "../pages/employeeDashboard/DailyAttendance2";
// import PerformanceDetails2 from "../pages/employeeDashboard/PerformanceDetails";
// import Clock from "../components/Clock";
// import PdfButton from "../components/PdfButton";

// function EmployeeRoute() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/employee"
//           element={
//             <ProtectedRoute>
//               <SharedLayout2 />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />

//           <Route
//             path="leaveApplicationDetails"
//             element={<LeaveApplicationDetails />}
//           ></Route>
//           <Route
//             path="personalDetailsForm"
//             element={<PersonalDetailsForm />}
//           ></Route>
//           <Route path="personalDetails" element={<PersonalDetails />}></Route>
//           <Route path="dailyAttendance" element={<DailyAttedance />}></Route>
//           <Route path="leaveForm" element={<LeaveForm />}></Route>
//           <Route path="dailyAttendance2" element={<Clock />}></Route>
//           <Route path="leaveDetails" element={<AllLeaves />}></Route>
//           <Route path="leaveForm" element={<LeaveForm />}></Route>
//         </Route>

//         <Route path="/register" element={<Register />} />
//         <Route path="/landing" element={<Landing />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </Router>
//   );
// }

// export default EmployeeRoute;
