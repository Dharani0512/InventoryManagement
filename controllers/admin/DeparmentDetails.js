import { BadRequestError, NotFoundError } from "../../errors/index.js";
import DepartmentDetails from "../../models/Admin/DepartmentDetails.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../../utils/checkPermission.js";
import userModel from "../../models/User.js";
import roleAccess from "../../utils/stateAccess.js";
import sendDetails from "../../helper/sendDetails.js";
const createDepartment = async (req, res) => {
  // const { employeeId } = req.body;
  // const role = req.emp.empId;
  // console.log({ empID: employeeId });
  // const data = await userModel.findOne({ employeeId });
  // console.log("data", data, role);
  // if (!data) {
  //   throw new NotFoundError(
  //     `No Employee with Id ${employeeId} Please register your employee to continue`
  //   );
  // }
  // const checkrole = await userModel.findOne({ _id: role });
  // checkPermission(checkrole.role);
  // // avoid dupilcate data
  // const avoidDuplicate = await DepartmentDetails.findOne({
  //   employeeId,
  // });
  // console.log(avoidDuplicate);
  // if (!avoidDuplicate) {
  //   // (req.body.workingLocation = "chennai"), (req.body.state = "tamilnadu");
  //   req.body.createdFor = data._id;
  //   req.body.createdBy = req.user.userId;
  //   roleAccess(checkrole.state, req.body.state, checkrole.role);
  //   const details = await DepartmentDetails.create(req.body);
  //   res.status(StatusCodes.CREATED).json({ details });
  // } else {
  //   throw new BadRequestError(
  //     ` You've already created Department details for employee with id ${employeeId} Please Enter new Employee Id  `
  //   );
  // }
};

const getSingleDepartment = async (req, res) => {
  const { id } = req.params;
  const details = await DepartmentDetails.find({ createdFor: id });
  console.log(id);

  if (!details) {
    throw new BadRequestError(
      `No Personal Details with Id ${id} Please ask admin to fill your Details`
    );
  }
  res.status(StatusCodes.OK).json({
    details,
  });
};

const getAllDepartment = async (req, res) => {
  const { searchDepartment, searchDesignation, sort, filter } = req.query;

  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID

  const findAdmin = await userModel.findOne({ adminId });

  let output;

  if (findAdmin.role === "Admin") {
    output = await sendDetails(
      req,
      {},
      [searchDesignation],
      ["designation"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      DepartmentDetails,
      sort,
      filter,
      "department"
    );
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [searchDepartment, searchDesignation],
      ["department", "designation"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      DepartmentDetails,
      sort,
      filter,
      "department"
    );
  }

  res.status(StatusCodes.OK).json({
    // details,
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const updateDepartment = async (req, res) => {
  const { id: departmentId } = req.params;
  const role = req.emp.empId;
  const details = await DepartmentDetails.findOne({
    _id: departmentId,
  });
  if (!details) {
    throw new NotFoundError(`no department with id ${departmentId}`);
  }
  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  const updatedDetails = await DepartmentDetails.findOneAndUpdate(
    {
      _id: departmentId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: `updated successfully` });
};

const deleteDepartment = async (req, res) => {
  const { id: departmentId } = req.params;
  const role = req.emp.empId;
  const details = await DepartmentDetails.findOne({
    _id: departmentId,
  });
  if (!details) {
    throw new NotFoundError(`no department details with id ${departmentId}`);
  }
  const checkrole = await userModel.findOne({ _id: role });
  // checkPermission(req.user.userId, details.createdBy);
  checkPermission(checkrole.role);
  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: `Department details removed successfully` });
};

export {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
};
