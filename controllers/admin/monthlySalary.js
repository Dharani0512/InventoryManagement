import { BadRequestError, NotFoundError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../../utils/checkPermission.js";

import pagination from "../../middleware/pagination.js";
import montlySalary from "../../models/Admin/monthlySalary.js";
import userModel from "../../models/User.js";
import roleAccess from "../../utils/stateAccess.js";
import sendDetails from "../../helper/sendDetails.js";
const createMonthlySalary = async (req, res) => {
  req.body.adminId = req.user.userId;
  req.body.createdBy = req.emp.empId;
  const { employeeId } = req.body;

  const user = await userModel.findOne({ employeeId });

  if (!user) {
    throw new BadRequestError(
      `No Employee with Id ${employeeId} Please Register the Employee `
    );
  }
  req.body.createdFor = user._id;
  req.body.state = user.state;

  const stateAdminId = await userModel.findOne({
    state: user.state,
  });

  req.body.empId = stateAdminId.empId;
  const details = await montlySalary.create(req.body);
  res.status(StatusCodes.CREATED).json({ details });
};
const getMonthlySalary = async (req, res) => {
  const { sort, salaryStatus } = req.query;

  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID
  const findAdmin = await userModel.findOne({ adminId });

  let output;

  if (findAdmin.role === "Admin") {
    output = await sendDetails(
      req,
      {},
      [salaryStatus],
      ["salaryStatus"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      montlySalary,
      sort
    );

    console.log("admin runinni");
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [salaryStatus],
      ["salaryStatus"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      montlySalary,
      sort
    );
  }

  res.status(StatusCodes.OK).json({
    // details,
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const editMonthlySalary = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;
  const details = await montlySalary.findOne({
    _id: detailsId,
  });
  if (!details) {
    throw new NotFoundError("No user with that id ");
  }
  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  const updatedDetails = await montlySalary.findOneAndUpdate(
    {
      _id: detailsId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedDetails });
};
const deleteMonthlySalary = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;
  const detail = await montlySalary.findOne({ _id: detailsId });
  if (!detail) {
    throw new NotFoundError("no details with that id ");
  }
  // checkPermission(req.user.userId, detail.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  await detail.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "success salary detail deleted success fully" });
};

const getSingleMonthlySalary = async (req, res) => {
  const { id } = req.params;

  const details = await montlySalary.find({ createdFor: id });
  if (details === []) {
    throw new NotFoundError(`No salary details found for id ${id}`);
  }
  res.status(StatusCodes.OK).json({ details });
};
export {
  createMonthlySalary,
  getMonthlySalary,
  editMonthlySalary,
  deleteMonthlySalary,
  getSingleMonthlySalary,
};
