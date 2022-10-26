import { useEffect, useReducer, useContext } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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
  GET_PRESANT,
  GET_PRESANT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_LOCATION_SUCCESS,
  GET_DEPARTMENTOPTION_SUCCESS,
  CREATE_LOCATION_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  FILE_UPLOAD_SUCCESS,
  GET_EMPLOYEEDASHBOARD,
} from "./action";
import { toUSVString } from "util";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const punchIn = localStorage.getItem("punchIn");
const punchInId = localStorage.getItem("punchInId");
const punchOut = localStorage.getItem("punchOut");
const userType = localStorage.getItem("userType");
// console.log(userType);
// const getLocation = () => {};
const initialState = {
  refresh: false,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  userType: user ? userType : null,
  numOfPages: 1,
  // tutorial
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  findDate: "all",
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  //employee details
  page: 1,
  employeeDetailsId: "",
  email: "",
  designation: "",
  name: "",
  date_of_join: "",
  date_of_birth: "",
  disability: "No",
  disabilityOption: ["Yes", "No"],
  searchEmployee: "",
  searchName: "",
  searchId: "",
  details: [],
  totalPresant: "",

  totalAbsent: "",
  totalDetails: 0,
  editDetailId: "",
  editDepartmentId: "",
  employeeId: "",
  // performance details search
  searchPerformance: "",
  starRating: "",
  starRatingOptions: ["all", "1", "2", "3", "4", "5"],
  // department details
  department: "",
  departmentOptions: [],
  employeeStatusList: ["Working", "Not Working"],
  employeeStatus: "Working",
  searchDepartment: "",
  searchDepartmentOptions: [],
  searchDesignation: "",
  genderOptions: ["Male", "Female", "Not Prefered to Say"],
  gender: "Male",
  currentAddress: "",
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  panNumber: "",
  contactNo: "",
  emergencyContact: "",
  bloodGroup: "",
  basicSalary: "",
  hra: "",
  conveyance: "",
  leaveDeduction: "",
  ef: "",
  pf: "",
  lta: 0,
  diwaliBonus: 0,
  gratuity: 0,
  medicalAllowance: 0,
  grossSalary: "",
  salaryStatus: "pending",
  salaryStatusOptions: ["pending", "salary paid"],
  // salaryStatusOption: "pending",
  leaveTypeList: [
    "Casual Leave",
    "Medical Leave",
    "Maternity Leave",
    "Earned Leave",
  ],
  leaveType: "Casual Leave",
  fromDate: "",
  toDate: "",
  reason: "",
  totalDays: "",
  statusOptionss: ["pending", "declined"],
  loginTime: "",
  date: "",
  attendanceType: "",
  filterDate: [],
  checkInTime: "",
  checkInDate: "",
  remark: "",
  currentStatus: "",
  attendanceList: ["presant", "absent"],
  punchIn: punchIn === "true" ? true : false,
  punchInId: punchInId,
  punchOut: punchOut,
  paymentDetails: [],
  initiative: "",
  jobKnowledge: "",
  compliance: "",
  behaviour: "",
  grasping: "",
  proactiveness: "",
  regularWork: "",
  leadership: "",
  newBusiness: "",
  teamManagement: "",
  targetAchivement: "",

  comments: [],
  singleComments: "",
  locationOptions: [],
  locationName: "",
  workingLocation: "",
  workLocationList: [],
  projectTitle: "",
  projectDescription: "",
  CountryState: "",
  district: "",
  assignedTo: "",
  estimatedStart: "",
  estimatedEnd: "",
  actualStart: "",
  actualEnd: "",
  estimatedCost: "",
  actualCost: "",
  countryState: "tamilnadu",
  stateList: ["all", "tamilnadu", "karanataka"],
  // districtList: ["chennai", "bangalore"],
  isOpen: false,
  deleteId: "",
  deleteUrl: "",
  deleteGetInfo: "",
  imageSrc: "",
  attachmentFile: {},
  employeeDashboardDetails: "",

  // dynamic options
  districtList: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios

  const userRole = JSON.parse(user) === null ? "notLoggedIn" : JSON.parse(user);
  console.log(
    userRole.role === "Admin" || userRole.role === "stateAdmin" ? "v1" : "v2"
  );
  const authFetch2 = axios.create({
    baseURL: "https://saga.brandimagetech.com/api/v2",
  });


 const authFetchAdmin = axios.create({ baseURL: "https://saga.brandimagetech.com/api/v1" });


  authFetchAdmin.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // request
  authFetch2.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  authFetch2.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );
  // for main routing
  const authFetch = axios.create(
    userRole.role === "Admin" || userRole.role === "stateAdmin"
      ? {
          baseURL: "https://saga.brandimagetech.com/api/v1",
        }
      : { baseURL: "https://saga.brandimagetech.com/api/v2" }
  );

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (msg) => {
    dispatch({ type: DISPLAY_ALERT, payload: { msg } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
    localStorage.setItem("userType", user.role);
  };
  const addPunchInStateToLocalStorage = () => {
    localStorage.setItem("punchIn", true);
  };
  const addpunchInIdToLocalStorage = (id) => {
    localStorage.setItem("punchInId", id);
  };
  const addPunchOutStateToLocalStorage = () => {
    localStorage.setItem("punchIn", false);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  const registerNewUserAdmin = async (currentUser, alertMsg) => {
    dispatch({ type: REGISTER_NEW_USER_ADMIN_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_NEW_USER_ADMIN_SUCCESS,
        payload: { user, token, location, msg: alertMsg },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_NEW_USER_ADMIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      // local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      // no token
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  // used to update the user input in the form feild when the user is typing

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };
  // used to clear the state value in the edit form after edit button is clicked
  const createJob = async () => {
    dispatch({
      type: CREATE_JOB_BEGIN,
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: CREATE_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({
      type: EDIT_JOB_BEGIN,
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const createDetail = async () => {
    dispatch({ type: CREATE_DETAIL_BEGIN });
    try {
      const { email, designation, name, date_of_join, date_of_birth } = state;

      await authFetch.post("/employeeDetails", {
        email,
        designation,
        name,
        date_of_join,
        date_of_birth,
      });
      dispatch({ type: CREATE_DETAIL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DETAIL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getDetail = async () => {
    let url = `/employeeDetails`;
    dispatch({ type: GET_DETAIL_BEGIN });
    try {
      const { data } = await authFetch(url);
      // console.log(data);
      const { details, totalDetails, numOfPages } = data;
      dispatch({
        type: GET_DETAIL_SUCCESS,
        payload: {
          details,
          totalDetails,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const setEditDetail = (id) => {
    dispatch({
      type: SET_EDIT_DETAIL,
      payload: { id },
    });
  };

  const editDetail = async () => {
    dispatch({ type: EDIT_DETAIL_BEGIN });
    try {
      const {
        editDetailId,
        email,
        designation,
        name,
        date_of_join,
        date_of_birth,
      } = state;
      await authFetch.patch(`/employeeDetails/${editDetailId}`, {
        email,
        designation,
        name,
        date_of_join,
        date_of_birth,
      });
      dispatch({ type: EDIT_DETAIL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_DETAIL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const createPunchIn = async (
    url,
    states,
    alertMsg,
    inputType,
    stateAdmin
  ) => {
    dispatch({ type: PUNCHIN_BEGIN });
    try {
      const result = await (stateAdmin ? authFetch2 : authFetch).post(url, {
        ...states,
      });
      if (inputType === "punchIn") {
        dispatch({ type: PUNCHIN_SUCCESS, payload: { msg: alertMsg } });
        dispatch({ type: CLEAR_VALUES, payload: states });
        addPunchInStateToLocalStorage();
        const punchInId = result.data.detail._id;
        addpunchInIdToLocalStorage(punchInId);
          window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: PUNCHIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
      addPunchOutStateToLocalStorage();
      return error.response.data.msg;
    }
    clearAlert();
  };

  const createPunchOut = async (
    id,
    url,
    states,
    alertMsg,
    inputType,
    stateAdmin
  ) => {
    dispatch({ type: PUNCHOUT_BEGIN });
    try {
      await (stateAdmin ? authFetch2 : authFetch).patch(`${url}/${id}`, {
        ...states,
      });
      if (inputType === "punchOut") {
        dispatch({
          type: PUNCHOUT_SUCCESS,
          payload: { msg: "logged out succesfully" },
        });
        addPunchOutStateToLocalStorage();
          window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: PUNCHOUT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const forgotPassword = async (url, states, alertMsg) => {
    dispatch({ type: CREATE_DEPARTMENT_BEGIN });
    try {
      await authFetchAdmin.post(url, {
        ...states,
      });
      dispatch({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: { msg: alertMsg },
      });
      dispatch({ type: CLEAR_VALUES, payload: states });
      toast.success(alertMsg);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DEPARTMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.error(error.response.data.msg);
    }
    clearAlert();
  };

  const createDepartment = async (url, states, alertMsg, stateAdmin) => {
    dispatch({ type: CREATE_DEPARTMENT_BEGIN });
    try {
      await (stateAdmin ? authFetch2 : authFetch).post(url, {
        ...states,
      });
      dispatch({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: { msg: alertMsg },
      });
      dispatch({ type: CLEAR_VALUES, payload: states });
      toast.success(alertMsg);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DEPARTMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.error(error.response.data.msg);
    }
    clearAlert();
  };
  // This is the dynamic post request route for all form feild

  const getDepartment = async (url, stateAdmin) => {
    dispatch({ type: GET_DEPARTMENT_BEGIN });
    try {
      console.log(stateAdmin);
      const { data } = await (stateAdmin ? authFetch2 : authFetch).get(url);
      console.log(stateAdmin ? true : false);
      const { details, totalDetails, numOfPages } = data;
      dispatch({
        type: GET_DEPARTMENT_SUCCESS,
        payload: {
          details,
          totalDetails,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const getComments = async (url) => {
    dispatch({ type: GET_DEPARTMENT_BEGIN });
    try {
      const { data } = await authFetch.get(
        "https://saga.brandimagetech.com/api/v2/performanceComments"
      );
      const { details, totalDetails, numOfPages } = data;
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: {
          comments: details,
          totalDetails,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // To get all the details from the database this funciton is used
  const setEditDepartment = async (id) => {
    dispatch({ type: SET_EDIT_DEPARTMENT, payload: { id } });
  };

  const editDepartment = async (url, states, msg) => {
    dispatch({ type: EDIT_DEPARTMENT_BEGIN });

    try {
      const { editDepartmentId } = state;
      console.log(editDepartmentId);
      await authFetch.patch(`/${url}/${editDepartmentId}`, {
        ...states,
      });

      dispatch({ type: EDIT_DEPARTMENT_SUCCESS, payload: { msg } });

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_DEPARTMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteDetail = async (id, url, getInfo) => {
    dispatch({ type: DELETE_DETAIL_BEGIN });
    try {
      await authFetch.delete(`/${url}/${id}`);
      getInfo(url);
      alert("Deleted SuccessFully");
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
  };

  const openModal = (id, url, getInfo) => {
    dispatch({ type: OPEN_MODAL, payload: { id, url, getInfo } });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const deleteModal = (id, url, getInfo) => {
    deleteDetail(id, url, getInfo);
  };

  const editPending = async (id, url, states, alertMsg) => {
    dispatch({ type: SET_PENDING });
    try {
      await authFetch.patch(`${url}/${id}`, {
        ...states,
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };
  const getCalendar = async (url) => {
    dispatch({ type: GET_CALENDAR_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { filterDate } = data;
      console.log(data);
      console.log(filterDate);
      dispatch({
        type: GET_CALENDAR_SUCCESS,
        payload: { filterDate },
      });
    } catch (error) {}
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const getPresant = async (url) => {
    // dispatch({ type: GET_PRESANT });
    try {
      const { data } = await authFetch(url);
      console.log(data);
      dispatch({ type: GET_PRESANT_SUCCESS, payload: { data: data } });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getLocation = async (url) => {
    try {
      const { data } = await authFetch(url);
      dispatch({ type: GET_LOCATION_SUCCESS, payload: { data } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDepartmentOptions = async (url) => {
    try {
      const { data } = await authFetch(url);
      dispatch({ type: GET_DEPARTMENTOPTION_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const createLocation = async (url, state, alertMsg) => {
    try {
      await authFetch.post(url, state);
      dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: { msg: alertMsg } });
      dispatch({ type: CLEAR_VALUES, payload: state });
      toast.success(alertMsg);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DEPARTMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.error(error.response.data.msg);
    }
    clearAlert();
  };

  const getEmployeeDashboard = async (url) => {
    try {
      const { data } = await authFetch.get(url);
      dispatch({
        type: GET_EMPLOYEEDASHBOARD,
        payload: data,
      });
    } catch (error) {}
  };

  const fileUploadFetch = axios.create({
    baseURL: "https://saga.brandimagetech.com/api/v2",
  });
  // request
  fileUploadFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      config.headers.post["Content-Type"] = "multipart/form-data";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  fileUploadFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const fileUpload = async (url, imageFile, states) => {
    const formData = new FormData();
    const [leaveType, fromDate, toDate, reason, totalDays] =
      Object.keys(states);
    const [
      leaveTypeValue,
      fromDateValue,
      toDateValue,
      reasonValue,
      totalDaysValue,
    ] = Object.values(states);
    // console.log(Object.keys(states));
    console.log(leaveType);
    formData.append(leaveType, leaveTypeValue);
    formData.append(fromDate, fromDateValue);
    formData.append(toDate, toDateValue);
    formData.append(reason, reasonValue);
    formData.append(totalDays, totalDaysValue);
    formData.append("image", imageFile);

    try {
      const { data } = await fileUploadFetch.post(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log(data);
      dispatch({
        type: FILE_UPLOAD_SUCCESS,
        payload: imageFile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        createDetail,
        getDetail,
        deleteDetail,
        setEditDetail,
        editDetail,
        createDepartment,
        getDepartment,
        setEditDepartment,
        editDepartment,
        editPending,
        getCalendar,
        createPunchIn,
        createPunchOut,
        clearFilters,
        changePage,
        registerNewUserAdmin,
        getPresant,
        getComments,
        authFetch,
        getLocation,
        getDepartmentOptions,
        createLocation,
        openModal,
        closeModal,
        deleteModal,
        fileUpload,
        getEmployeeDashboard,
        forgotPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppcontext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppcontext };
