import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import leaveDetails from "../../models/Employee/leaveDetails.js";
import personalDetails from "../../models/Admin/personalDetails.js";
import checkPermission from "../../utils/checkPermission.js";
import path from "path";
const __dirname = path.resolve();
const createLeaveDetails = async (req, res) => {
  // const { createdBy } = req.body;

  const id = req.emp.empId;
  const employeeDetails = await personalDetails.find({ createdFor: id });
  if (!employeeDetails[0]) {
    throw new BadRequestError(
      "Please tell the admin to fill the personal details form "
    );
  }
  const { name, employeeId, designation, email } = employeeDetails[0];

  req.body.createdBy = id;
  req.body.createdFor = id;
  req.body.name = name;
  req.body.employeeId = employeeId;
  req.body.designation = designation;
  req.body.emailId = email;
  req.body.image = req.files.image;
  req.body.image.filetype = req.files.image.mimetype;
  // req.body.image.data = req.files.image.data;

  const uploadImage = req.files.image;

  const imagePath = path.join(
    __dirname,
    "./client/src/utils/uploadImages/" + `${uploadImage.name}`
  );
  const imagePath2 = uploadImage.name;

  req.body.filePath = imagePath2;
  await uploadImage.mv(imagePath);
  const detail = await leaveDetails.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: detail.name, image: `/uploadImages/${req.files.image.name}` });
};
const editLeaveDetails = async (req, res) => {
  const { id: detailsId } = req.params;
  const details = await leaveDetails.findOne({
    _id: detailsId,
  });
  if (!details) {
    throw new NotFoundError("No Details with that id ");
  }
  checkPermission(req.user, details.createdBy);
  const updatedDetails = await leaveDetails.findOneAndUpdate(
    {
      _id: detailsId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedDetails });
};

const getAllLeaveDetails = async (req, res) => {
  const { search, sort } = req.query;

  let queryObject = { createdBy: req.user.userId };
  // no await

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let result = leaveDetails.find();
  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const details = await result;
  // total pages and no of pages
  const totalDetails = await leaveDetails.countDocuments();
  const noOfPages = Math.ceil(totalDetails / limit);

  res
    .status(StatusCodes.OK)
    .json({ details, noOfPages, totalDetails, noOfPages });
};

const deleteLeaveDetails = async (req, res) => {
  const { id: leaveId } = req.params;
  const details = await leaveDetails.findOne({ _id: leaveId });
  if (!details) {
    throw new NotFoundError("No details with that id");
  }
  checkPermission(req.user, details.createdBy);
  await details.remove();
  res.status(StatusCodes.OK).json({ msg: "Details Deleted successfully" });
};

export {
  createLeaveDetails,
  editLeaveDetails,
  getAllLeaveDetails,
  deleteLeaveDetails,
};
