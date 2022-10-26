import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import { Register, Error, Landing, Settings } from "./pages";
import {
  AttendanceDetails,
  DepartmentDetails,
  PerformanceDetails2,
  AdminDashboard,
  AllUser,
  Projects,
} from "./pages/adminDashboard";
import { Dashboard, PersonalDetailsEmp } from "./pages/employeeDashboard";
import { SharedLayout2 } from "./pages/tutorial";
import {
  EmployeeForm,
  DepartmentForm,
  AdminRegisterPage,
  ForgotPassword,
  ResetPassword,
} from "./components/index.js";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import SalaryForm from "./form/SalaryTemplateForm";
import LeaveForm from "./form/LeaveForm";
import LeaveApplicationDetails from "./pages/employeeDashboard/LeaveApplicationDetails";
import DailyAttedance from "./pages/employeeDashboard/DailyAttedance";
import CalendarAttendance from "./pages/employeeDashboard/CalanderAttendance";
import AttendanceCalendar from "./pages/employeeDashboard/AttendanceCalendar";
import PdfButton from "./components/PdfButton";
import AdminProtectedRoute from "./Route/AdminProtectedRoute";
import EmployeeProtectedRoute from "./Route/EmployeeProtectedRoute";
import EmployeeSharedLayout from "./Route/EmployeeSharedLayout";
import EmployeeDetailsPage from "./Allpages/AdminPages/EmployeeDetailsPage";
import DepartmentDetailspage from "./Allpages/AdminPages/DepartmentDetailspage";
import SalaryDetailsPage from "./Allpages/AdminPages/SalaryDetailsPage";
import RazorPay from "./pages/RazorPay";
import LeavesContainer from "./components/LeavesContainer";
import DailyAttendance2 from "./pages/employeeDashboard/DailyAttendance2";
import AttendanceDetailspage from "./Allpages/AdminPages/AttendanceDetailspage";
import LeaveDetailsPage from "./Allpages/LeaveDetailsPage";
import SalaryDetailsEmp from "./pages/employeeDashboard/SalaryDetailsEmp";
import PerformanceDetailsEmp from "./pages/employeeDashboard/PerformanceDetailsEmp";
import PerformanceDetailsPage from "./Allpages/AdminPages/PerformanceDetailsPage.js";
import {
  MonthlySalaryDetailsPage,
  PersonalDetailsPage,
  ProjectsPage,
} from "./Allpages/AdminPages";
import { CommentsForm, ProjectsForm } from "./form";
import MonthlySalaryForm from "./form/MonthlySalaryForm";
import StateAdminProtectedRoute from "./Route/StateAdminProtectedRoute";
import StateAdminSharedLayout from "./Route/StateAdminSharedLayout";
import { useAppcontext } from "./context/appContext";
import BasicFileUpload from "./components/BasicFileUpload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DepartmentDetailsEmp from "./pages/employeeDashboard/DepartmentDetailsEmp";

function App() {
  const { isOpen } = useAppcontext();
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <SharedLayout2 />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsPage url={"projects"} />} />
          <Route path="projectsForm" element={<ProjectsForm />} />
          <Route
            path="employeeDetails"
            element={<EmployeeDetailsPage />}
          ></Route>
          <Route path="employeeForm" element={<EmployeeForm />}></Route>
          <Route
            path="departmentDetails"
            element={<DepartmentDetailspage />}
          ></Route>
          <Route path="departmentForm" element={<DepartmentForm />}></Route>
          <Route path="personalForm" element={<PersonalDetailsForm />} />
          <Route path="personalDetails" element={<PersonalDetailsPage />} />
          {/* Salary */}
          <Route path="salaryTemplateForm" element={<SalaryForm />}></Route>
          <Route path="salaryTemplate" element={<SalaryDetailsPage />}></Route>
          <Route
            path="monthlySalary"
            element={<MonthlySalaryDetailsPage />}
          ></Route>
          <Route
            path="monthlySalaryForm"
            element={<MonthlySalaryForm />}
          ></Route>
          {/* ------------------------------------------ */}
          <Route
            path="AttendanceDetails"
            element={<AttendanceDetailspage />}
          ></Route>
          <Route path="leaveDetails" element={<LeaveDetailsPage />}></Route>

          <Route path="dailyAttendance" element={<DailyAttedance />}></Route>
          <Route
            path="attendanceDetails"
            element={<AttendanceDetails />}
          ></Route>
          <Route path="calendar" element={<CalendarAttendance />}></Route>
          <Route
            path="attendanceCalendar"
            element={<AttendanceCalendar />}
          ></Route>
          <Route path="departmentDetails" element={<DepartmentDetails />} />
          <Route path="performanceForm" element={<PerformanceDetails2 />} />
          <Route path="salaryPdf" element={<PdfButton />} />
          <Route
            path="displayPerformance"
            element={<PerformanceDetailsPage />}
          />
          <Route path="registerUser" element={<AdminRegisterPage />} />
          <Route path="allUser" element={<AllUser />} />
          <Route path="razorPay" element={<RazorPay />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* stateAdmin protected route */}
        <Route
          path="/stateAdmin"
          element={
            <StateAdminProtectedRoute>
              <StateAdminSharedLayout />
            </StateAdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="projects"
            element={<ProjectsPage url={"stateProjects"} />}
          />
          <Route path="projectsForm" element={<ProjectsForm />} />
          <Route
            path="employeeDetails"
            element={<EmployeeDetailsPage />}
          ></Route>
          <Route path="employeeForm" element={<EmployeeForm />}></Route>
          <Route
            path="departmentDetails"
            element={<DepartmentDetailspage />}
          ></Route>
          <Route path="departmentForm" element={<DepartmentForm />}></Route>
          <Route path="personalForm" element={<PersonalDetailsForm />} />
          <Route path="personalDetails" element={<PersonalDetailsPage />} />
          {/* Salary */}
          <Route path="salaryTemplateForm" element={<SalaryForm />}></Route>
          <Route path="salaryTemplate" element={<SalaryDetailsPage />}></Route>
          <Route
            path="monthlySalary"
            element={<MonthlySalaryDetailsPage />}
          ></Route>
          <Route
            path="monthlySalaryForm"
            element={<MonthlySalaryForm />}
          ></Route>
          {/* ------------------------------------------ */}
          <Route
            path="AttendanceDetails"
            element={<AttendanceDetailspage />}
          ></Route>
          <Route path="leaveDetails" element={<LeaveDetailsPage />}></Route>

          <Route path="dailyAttendance" element={<DailyAttedance />}></Route>
          <Route
            path="attendanceDetails"
            element={<AttendanceDetails />}
          ></Route>
          <Route path="calendar" element={<CalendarAttendance />}></Route>
          <Route
            path="attendanceCalendar"
            element={<AttendanceCalendar />}
          ></Route>
          <Route path="departmentDetails" element={<DepartmentDetails />} />
          <Route path="performanceForm" element={<PerformanceDetails2 />} />
          <Route path="salaryPdf" element={<PdfButton />} />
          <Route
            path="displayPerformance"
            element={<PerformanceDetailsPage />}
          />
          <Route path="registerUser" element={<AdminRegisterPage />} />
          <Route path="allUser" element={<AllUser />} />
          <Route path="razorPay" element={<RazorPay />} />
          <Route path="settings" element={<Settings />} />
          <Route path="personalDetail" element={<PersonalDetailsEmp />} />
          <Route path="salaryDetail" element={<SalaryDetailsEmp />} />

          <Route path="salaryPdf" element={<PdfButton />} />
          <Route
            path="performanceDetails"
            element={<PerformanceDetailsEmp />}
          />
          <Route path="leaveForm" element={<LeaveForm />}></Route>
          <Route path="leaveDetailsEmp" element={<LeavesContainer />}></Route>
          <Route
            path="leaveApplicationDetails"
            element={<LeaveApplicationDetails />}
          ></Route>
        </Route>
        {/* employee route  */}

        <Route
          path="/employee"
          element={
            <EmployeeProtectedRoute>
              <EmployeeSharedLayout />
            </EmployeeProtectedRoute>
          }
        >
          <Route index  element={<Dashboard />} />
          <Route path="personalDetail" element={<PersonalDetailsEmp />} />
          <Route path="departmentDetail" element={<DepartmentDetailsEmp />} />
          <Route path="salaryDetail" element={<SalaryDetailsEmp />} />

          <Route path="salaryPdf" element={<PdfButton />} />
          <Route
            path="performanceDetails"
            element={<PerformanceDetailsEmp />}
          />
          <Route path="leaveForm" element={<LeaveForm />}></Route>
          <Route path="leaveDetails" element={<LeavesContainer />}></Route>
          <Route
            path="leaveApplicationDetails"
            element={<LeaveApplicationDetails />}
          ></Route>

          <Route path="dailyAttendance" element={<DailyAttedance />}></Route>
          <Route path="commentsForm" element={<CommentsForm />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path={`/user/reset-password/*`} element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
