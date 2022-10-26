import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import sendDetails from "../../helper/sendDetails.js";
import pagination from "../../middleware/pagination.js";
import salaryTemplate from "../../models/Admin/salaryTemplate.js";
import salaryModal from "../../models/Admin/salaryTemplate.js";
import userModel from "../../models/User.js";
import checkPermission from "../../utils/checkPermission.js";
import roleAccess from "../../utils/stateAccess.js";

const createSalaryTemplate = async (req, res) => {
  const { employeeId } = req.body;
  const role = req.emp.empId; //unique id
  const state = req.body.state;
  console.log({ empID: employeeId }); //searched employeeId

  const userId = await userModel.findOne({ employeeId });
  //   console.log({ employeeId });
  if (!userId) {
    throw new BadRequestError(
      "Employee is Not register Please Register the Employee"
    );
  }
  const findDuplicate = await salaryTemplate.findOne({ employeeId });
  console.log(findDuplicate);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  if (findDuplicate) {
    throw new BadRequestError(
      "Salary Template already created for this Employee Please use different Emp Id"
    );
  }
  req.body.createdFor = userId._id;
  req.body.createdBy = req.user.empId; // unique id
  req.body.adminId = req.user.userId; //admin id
  req.body.empId = req.stateAdmin.stateAdminId; //stateadmin empID
  // roleAccess(checkrole.state, state, checkrole.role);
  const detail = await salaryModal.create(req.body);
  res.status(StatusCodes.CREATED).json({ detail });
};

const getSalaryTemplate = async (req, res) => {
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
      ["-createdAt", "createdAt", "bankName", "-bankName"],
      salaryTemplate,
      sort
    );
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [salaryStatus],
      ["salaryStatus"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "bankName", "-bankName"],
      salaryTemplate,
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
const getSingleSalaryTemplate = async (req, res) => {
  const { id } = req.params;

  const details = await salaryModal.findOne({ createdFor: id });
  console.log(details);
  if (!details) {
    throw new NotFoundError(`No salary details found for id ${id}`);
  }
  res.status(StatusCodes.OK).json({ details });
};

const editSalaryTemplate = async (req, res) => {
  const { id: detailsId } = req.params;
  const details = await salaryTemplate.findOne({ _id: detailsId });

  if (!details) {
    throw new NotFoundError("No user with the Id Please try again");
  }
  // checkPermission(req.user.userId, details.createdBy);
  const role = req.emp.empId;
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  const updatedDetails = await salaryTemplate.findOneAndUpdate(
    {
      _id: detailsId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedDetails });
};

const deleteSalaryTemplate = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;

  const details = await salaryTemplate.findOne({ _id: detailsId });

  if (!details) {
    throw new NotFoundError("No details witlh the given Id Please try again ");
  }

  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findById({ _id: role });
  checkPermission(checkrole.role);
  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Salary Template deleted successfully " });
};

export {
  createSalaryTemplate,
  getSalaryTemplate,
  getSingleSalaryTemplate,
  editSalaryTemplate,
  deleteSalaryTemplate,
};
