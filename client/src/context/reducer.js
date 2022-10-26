import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  CREATE_DETAIL_BEGIN,
  CREATE_DETAIL_SUCCESS,
  CREATE_DETAIL_ERROR,
  GET_DETAIL_BEGIN,
  GET_DETAIL_SUCCESS,
  DELETE_DETAIL_BEGIN,
  EDIT_DETAIL_BEGIN,
  EDIT_DETAIL_SUCCESS,
  EDIT_DETAIL_ERROR,
  SET_EDIT_DETAIL,
  CREATE_DEPARTMENT_BEGIN,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_ERROR,
  GET_DEPARTMENT_BEGIN,
  GET_DEPARTMENT_SUCCESS,
  SET_EDIT_DEPARTMENT,
  EDIT_DEPARTMENT_BEGIN,
  EDIT_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT_ERROR,
  SET_PENDING,
  GET_CALENDAR_BEGIN,
  GET_CALENDAR_SUCCESS,
  PUNCHIN_BEGIN,
  PUNCHIN_SUCCESS,
  PUNCHOUT_ERROR,
  PUNCHOUT_BEGIN,
  PUNCHOUT_SUCCESS,
  PUNCHIN_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  REGISTER_NEW_USER_ADMIN_BEGIN,
  REGISTER_NEW_USER_ADMIN_SUCCESS,
  REGISTER_NEW_USER_ADMIN_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  GET_PRESANT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_LOCATION_SUCCESS,
  GET_DEPARTMENTOPTION_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  FILE_UPLOAD_SUCCESS,
  GET_EMPLOYEEDASHBOARD_ERROR,
  GET_EMPLOYEEDASHBOARD,
} from "./action";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    const { msg } = action.payload;
    console.log(action);
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: msg ? msg : "Please provide all values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_NEW_USER_ADMIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_NEW_USER_ADMIN_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_NEW_USER_ADMIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      userType: action.payload.user.role,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "user created redirect ",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,

      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      userType: action.payload.user.role,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful ! Redirecting",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      search: "",
      isEditing: false,
      editJobId: "",
      page: 1,
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
      name: "",
      employeeId: "",
      role: "",
      email: "",
      department: "",
      date_of_join: "",
      date_of_birth: "",
      currentAddress: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      designation: "",
      bloodGroup: "",
      contactNo: "",
      emergencyContact: "",
      panNumber: "",
      singleComments: "",
      locationName: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New job created",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((item) => item._id === action.payload.id);
    console.log(job);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
      // showAlert: true,
      // alertType: "danger",
      // alertText: "Job deleted sucessfull",
    };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job updated",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_DETAIL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Employee Detail Created Successfully",
    };
  }
  if (action.type === CREATE_DETAIL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_DETAIL_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      details: action.payload.details,
      totalDetails: action.payload.totalDetails,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === DELETE_DETAIL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SET_EDIT_DETAIL) {
    const detail = state.details.find((item) => item._id === action.payload.id);

    const { _id, email, role, name, designation, date_of_join, date_of_birth } =
      detail;

    return {
      ...state,
      isEditing: true,
      editDetailId: _id,
      email,
      role,
      name,
      designation,
      date_of_join,
      date_of_birth,
    };
  }
  if (action.type === EDIT_DETAIL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Employee detail edited sucessfully ",
    };
  }
  if (action.type === EDIT_DETAIL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === OPEN_MODAL) {
    console.log(action);
    const { id, url, getInfo } = action.payload;
    return {
      ...state,
      isOpen: true,
      deleteId: id,
      deleteUrl: url,
      deleteGetInfo: getInfo,
    };
  }
  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      isOpen: false,
    };
  }
  if (action.type === CREATE_DEPARTMENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
      paymentDetails: action.payload.paymentDetails,
    };
  }
  if (action.type === CREATE_DEPARTMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_DEPARTMENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      details: action.payload.details,
      totalDetails: action.payload.totalDetails,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      comments: action.payload.comments,
      totalDetails: action.payload.totalDetails,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_DEPARTMENT) {
    const departments = state.details.find(
      (item) => item._id === action.payload.id
    );

    const {
      _id,
      name,
      employeeId,
      role,
      email,
      department,
      designation,
      bankName,
      pf,
      esi,
      basicSalary,
      hra,
      conveyance,
      leaveDeduction,
      ifscCode,
      date_of_join,
      accountNumber,
      grossSalary,
      salaryStatus,
      date_of_birth,
      professionalTax,
      pfNo,
      panNo,
      division,
      branch,
      grade,
      currentAddress,
      employeeStatus,
      initiative,
      jobKnowledge,
      compliance,
      behaviour,
      grasping,
      proactiveness,
      regularWork,
      leadership,
      newBusiness,
      teamManagement,
      targetAchivement,
      panNumber,
      contactNo,
      emergencyContact,
      bloodGroup,
      projectTitle,
      projectDescription,
      countryState,
      district,
      assignedTo,
      estimatedStart,
      estimatedEnd,
      actualStart,
      actualEnd,
      estimatedCost,
      actualCost,
    } = departments;

    return {
      ...state,
      isEditing: true,
      editDepartmentId: _id,
      name,
      employeeId,
      role,
      email,
      department,
      accountNumber,
      designation,
      bankName,
      pf,
      esi,
      basicSalary,
      hra,
      conveyance,
      leaveDeduction,
      ifscCode,
      grossSalary,
      salaryStatus,
      currentAddress,
      date_of_birth,
      date_of_join,
      professionalTax,
      pfNo,
      panNo,
      division,
      branch,
      grade,
      initiative,
      jobKnowledge,
      compliance,
      behaviour,
      grasping,
      proactiveness,
      regularWork,
      leadership,
      newBusiness,
      teamManagement,
      targetAchivement,
      panNumber,
      contactNo,
      emergencyContact,
      bloodGroup,
      projectTitle,
      projectDescription,
      countryState,
      district,
      assignedTo,
      estimatedStart,
      estimatedEnd,
      actualStart,
      actualEnd,
      estimatedCost,
      actualCost,
    };
  }
  if (action.type === EDIT_DEPARTMENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_DEPARTMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SET_PENDING) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      status: "rejected",
      alertType: "success",
      alertText: "logged out successfully",
    };
  }
  if (action.type === GET_CALENDAR_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_CALENDAR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      filterDate: action.payload.filterDate,
    };
  }
  if (action.type === PUNCHIN_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === PUNCHIN_SUCCESS) {
    return {
      ...state,
      // punchIN: action.payload.punchIn,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === PUNCHIN_ERROR) {
    return {
      ...state,
      // loggedIn: action.payload.msg,
      // loginState: true,
      showAlert: true,
      isLoading: false,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === PUNCHOUT_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === PUNCHOUT_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === PUNCHOUT_ERROR) {
    return {
      ...state,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
      searchEmployee: "",
      searchName: "",
      searchId: "",
      searchDesignation: "",
      searchDepartment: "",
      department: "",
      employeeDetailsId: "",
      salaryStatus: "",
      findDate: "all",
      searchPerformance: "",
      starRating: "",
      countryState: "",
      district: "",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === GET_PRESANT_SUCCESS) {
    return {
      ...state,
      totalPresant: action.payload.data,
    };
  }
  if (action.type === GET_LOCATION_SUCCESS) {
    return {
      ...state,
      locationOptions: action.payload.data,
    };
  }
  if (action.type === GET_DEPARTMENTOPTION_SUCCESS) {
    let arr = ["all"];
    let values = action.payload.data;
    for (let i = 0; i < values.length; i++) {
      console.log(i);
      arr.push(values[i]);
    }

    return {
      ...state,
      searchDepartmentOptions: arr,
      departmentOptions: action.payload.data,
      workingLocation: action.payload.data[0],
      department: action.payload.data[0],
    };
  }
  if (action.type === GET_EMPLOYEEDASHBOARD) {
    return {
      ...state,
      employeeDashboardDetails: action.payload,
    };
  }
  if (action.type === FILE_UPLOAD_SUCCESS) {
    return {
      ...state,
      imageSrc: action.payload,
    };
  }
  throw new Error(`no such action ${action.type}`);
};
export default reducer;
