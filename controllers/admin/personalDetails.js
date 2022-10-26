import { BadRequestError, NotFoundError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../../utils/checkPermission.js";
personalDetails;
import userModel from "../../models/User.js";
import personalDetails from "../../models/Admin/personalDetails.js";
import sendDetails from "../../helper/sendDetails.js";
const createPersonalDetails = async (req, res) => {
  //  check the employee id exist in user database
  // const { employeeId } = req.body;
  // const data = await userModel.findOne({ employeeId });
  // req.body.createdFor = data._id;
  // req.body.createdBy = req.user.userId;
  // const personalDetail = await personalDetails.create(req.body);
  // res.status(StatusCodes.CREATED).json({ personalDetail });
};

// ----------------------------------------------------//

const getAllPersonalDetails = async (req, res) => {
  const { search } = req.query;

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
      [],
      [],
      personalDetails
    );

    console.log("admin runinni");
  } else if (findAdmin.role === "stateAdmin") {
    console.log("stateAdmin runing");

    output = await sendDetails(
      req,
      { empId: empId },
      [search],
      ["name"],
      [],
      [],
      personalDetails
    );
  }

  res.status(StatusCodes.OK).json({
    // details,
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

// ----------------------------------------------------//

const getSinglePersonalDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const details = await personalDetails.find({ createdFor: id });

  if (!details) {
    throw new BadRequestError(
      `No Personal Details with Id ${id} please ask admin to fill your details `
    );
  }

  res.status(StatusCodes.OK).json({ details });
};

// ----------------------------------------------------//

const updatePersonalDetails = async (req, res, states) => {
  const { id: personlId } = req.params;
  const role = req.emp.empId;
  const {
    name,
    employeeId,
    designation,
    gender,
    email,
    date_of_birth,
    currentAddress,
    accountNumber,
    bankName,
    ifscCode,
  } = req.body;

  states = req.body;

  if (
    !name ||
    !gender ||
    !email ||
    !date_of_birth ||
    !currentAddress ||
    !accountNumber ||
    !bankName ||
    !ifscCode
  ) {
    throw new BadRequestError("please provide all values");
  }
  const details = await personalDetails.findOne({ _id: personlId });
  if (!details) {
    throw new NotFoundError("No Employee with the id found");
  }
  // checkPermission(req.user.userId, details.createdBy);
  const checkrole = await userModel.findOne({ _id: role });

  checkPermission(checkrole.role, details.createdBy);
  const updateDetails = await personalDetails.findOneAndUpdate(
    { _id: personlId },
    req.body,
    { new: true, runvalidators: true }
  );
  res.status(StatusCodes.OK).json({ updateDetails });
};

// ----------------------------------------------------//

const deletePersonalDetails = async (req, res) => {
  const { id: personalId } = req.params;
  const role = req.emp.empId;
  const details = await personalDetails.findOne({ _id: personalId });
  if (!details) {
    throw new NotFoundError("No employee with id found ");
  }
  const checkrole = await userModel.findOne({ _id: role });

  checkPermission(checkrole.role, details.createdBy);
  // checkPermission(req.user.userId, details.createdBy);

  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success personal Details deleted sucessfully" });
};

export {
  createPersonalDetails,
  getAllPersonalDetails,
  getSinglePersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
};
