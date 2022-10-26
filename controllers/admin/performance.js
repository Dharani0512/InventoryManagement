import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import performanceModal from "../../models/Admin/performance.js";
import checkPermission from "../../utils/checkPermission.js";
import userModel from "../../models/User.js";
import roleAccess from "../../utils/stateAccess.js";
import sendDetails from "../../helper/sendDetails.js";
import EmployeeDetail from "../../models/Admin/EmployeeDetail.js";
import performance from "../../models/Admin/performance.js";
const createPerformance = async (req, res) => {
  const {
    employeeId,
    behavior,
    initiative,
    jobKnowledge,
    targetAchivement,
    teamManagement,
    newBusiness,
    leadership,
    regularWork,
    proactiveness,
    grasping,
    behaviour,
    compliance,
    starRating,
  } = req.body;
  //----------
  const roleId = req.emp.empId;
  // const gotRole = await userModel.findById({ _id: roleId });
  const getEmployee = await userModel.findOne({ employeeId });

  req.body.adminId = getEmployee.adminId;
  req.body.empId = getEmployee.empId;
  req.body.state = getEmployee.state;
  // let empId = req.employeeId.empId; //stateadmin emp id
  let role = req.emp.empId;
  const checkrole = await userModel.findOne({ _id: role });

  //---------
  // const data = await userModel.findOne({
  //   employeeId,
  // });
  // const data = await userModel.findOne(queryObject);
  // console.log("DATA", data);

  if (!getEmployee) {
    throw new NotFoundError(
      `No Employee with id ${employeeId} please register the employee `
    );
  } else {
    const total =
      initiative +
      jobKnowledge +
      targetAchivement +
      teamManagement +
      newBusiness +
      leadership +
      regularWork +
      proactiveness +
      grasping +
      behaviour +
      compliance;
    req.body.createdFor = getEmployee._id;
    req.body.createdBy = req.user.userId;
    checkPermission(checkrole.role);
    roleAccess(checkrole.state, getEmployee.state, checkrole.role);
    const PerformanceDetail = await performanceModal.create(req.body);

    // To add performance for employeedetail page
    const empId = getEmployee._id;
    const employeeDetail = await EmployeeDetail.findOneAndUpdate(
      {
        employeeId,
      },
      { starRating },
      { new: true, runValidators: true }
    );
    console.log(employeeDetail);
    res.status(StatusCodes.CREATED).json({
      details: PerformanceDetail,
    });
  }
};

const getAllPerformance = async (req, res) => {
  const { search, sort, filter } = req.query;

  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID
  const findAdmin = await userModel.findOne({ adminId });

  let output;

  if (findAdmin.role === "Admin") {
    output = await sendDetails(
      req,
      {},
      [search],
      ["name"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      performanceModal,
      sort,
      filter,
      "starRating"
    );
  } else if (findAdmin.role === "stateAdmin") {
    output = await sendDetails(
      req,
      { empId: empId },
      [search],
      ["name"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      performanceModal,
      sort,
      filter,
      "starRating"
    );
  }

  res.status(StatusCodes.OK).json({
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const editPerformance = async (req, res) => {
  const { id: performanceId } = req.params;
  const role = req.emp.empId;
  const details = await performanceModal.findOne({
    _id: performanceId,
  });
  if (!details) {
    throw new NotFoundError(`no performance with the id ${performanceId}`);
  }
  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  const updateDetails = await performanceModal.findOneAndUpdate(
    {
      _id: performanceId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ msg: `Updated SucessFully` });
};

const deletePerformanceDetails = async (req, res) => {
  const { id: performanceId } = req.params;
  const role = req.emp.empId;
  const details = await performanceModal.findOne({
    _id: performanceId,
  });
  if (!details) {
    throw new NotFoundError(`no performance details with Id ${performanceId}`);
  }
  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: `Performance details deleted sucessfully` });
};

const getSinglePerformance = async (req, res) => {
  const id = req.emp.empId;
  const details = await performanceModal.find({ createdFor: id });
  console.log(details.length);
  if (!details || details < 1) {
    throw new BadRequestError(`No performance found `);
  }
  res
    .status(StatusCodes.OK)
    .json({ details, totalDetails: details.length, numOfPages: 1 });
};

const lastMonthPerformance = async (req, res) => {
  const id = req.emp.empId;
  const lastDetail = await performanceModal
    .find({ createdFor: id })
    .sort({ _id: -1 });

  if (!lastDetail || lastDetail < 1) {
    // throw new BadRequestError(`No performance founds`);
    res.status(StatusCodes.OK).json({ details: 0 });
  }
  const {
    behaviour,
    compliance,
    grasping,
    initiative,
    jobKnowledge,
    proactiveness,
    targetAchivement,
    teamManagement,
    newBusiness,
    leadership,
    regularWork,
  } = lastDetail[0];
  const arr = [
    behaviour,
    compliance,
    grasping,
    initiative,
    jobKnowledge,
    proactiveness,
    targetAchivement,
    teamManagement,
    newBusiness,
    leadership,
    regularWork,
  ];
  const labelArr = [
    "Behaviour",
    "Compliance",
    "Grasping",
    "Initiative",
    "Job Knowledge",
    "Proactiveness",
    "Target Achivement",
    "Team Management",
    "New Business",
    "Leadership",
    "Regular Work",
  ];
  const createObj = () => {
    let details = [];
    for (let i = 0; i < arr.length; i++) {
      details.push({
        label: labelArr[i],
        value: arr[i],
      });
    }
    return details;
  };
  const details = createObj();

  res
    .status(StatusCodes.OK)
    .json({ details, totalDetails: details.length, numOfPages: 1 });
};

export {
  createPerformance,
  getAllPerformance,
  getSinglePerformance,
  editPerformance,
  deletePerformanceDetails,
  lastMonthPerformance,
};
