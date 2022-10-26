import EmployeeDetail from "../../models/Admin/EmployeeDetail.js";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../../utils/checkPermission.js";
import userModel from "../../models/User.js";
import sendDetails from "../../helper/sendDetails.js";

// const createEmployeeDetails = async (req, res) => {
// const { employeeId } = req.body;
// const data = await userModel.findOne({ employeeId });
// if (!data) {
//   throw new NotFoundError(
//     `NO Employee with Id ${employeeId} Please register the employee `
//   );
// }
// // avoiding the dupicate data
// const avoidDuplicate = await EmployeeDetail.findOne({ createdFor: data._id });
// if (!avoidDuplicate) {
//   req.body.createdFor = data._id;
//   req.body.createdBy = req.user.userId;
//   const details = await EmployeeDetail.create(req.body);
//   res.status(StatusCodes.CREATED).json({ details });
// } else {
//   throw new BadRequestError(`${employeeId} already exist`);
// }
// };

const getAllEmployeeDetails = async (req, res) => {
  const { employeeDetailsId, search, sort } = req.query;

  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID
  const findAdmin = await userModel.findOne({ adminId });

  let details;
  let output;

  if (findAdmin.role === "Admin") {
    output = await sendDetails(
      req,
      {},
      [search, employeeDetailsId],
      ["name", "employeeId"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      EmployeeDetail,
      sort
    );

    console.log("admin runinni");

    // console.log(output);
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [search, employeeDetailsId],
      ["name", "employeeId"],
      ["latest", "oldest", "a-z", "z-a"],
      ["-createdAt", "createdAt", "name", "-name"],
      EmployeeDetail,
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

const deleteEmployeeDetails = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;
  const details = await EmployeeDetail.findOne({ _id: detailsId });
  if (!details) {
    throw new NotFoundError(`No Details with Id ${detailsId}`);
  }
  const checkrole = await userModel.findOne({ _id: role });
  checkPermission(checkrole.role, details.createdBy);
  await details.remove();
  res.status(StatusCodes.OK).json({ msg: "Success Employee Details Removed" });
};

const editEmployeeDetails = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;
  const details = await EmployeeDetail.findOne({ _id: detailsId });
  if (!details) {
    throw new NotFoundError(` No EmployeeDetails with id ${detailsId}`);
  }
  const checkrole = await userModel.findOne({ _id: role });
  // checkPermission(req.user.userId, details.createdBy);
  checkPermission(checkrole.role, details.createdBy);
  const updatedDetails = await EmployeeDetail.findOneAndUpdate(
    {
      _id: detailsId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ updatedDetails, msg: `updated successfully` });
};

const getsingleEmployeeDetails = async (req, res) => {
  const user = req.params.id;

  // const result = Object.values(user)
  const details = await EmployeeDetail.find({ _id: user.substring(1) }).exec();

  res.status(200).json(details);
};

export {
  // createEmployeeDetails,
  getAllEmployeeDetails,
  getsingleEmployeeDetails,
  deleteEmployeeDetails,
  editEmployeeDetails,
};
