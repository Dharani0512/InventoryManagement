import { StatusCodes } from "http-status-codes";
import NotFoundError from "../../errors/not-found.js";
import performanceComments from "../../models/Employee/performanceComments.js";
import checkPermission from "../../utils/checkPermission.js";

const createComments = async (req, res) => {
  req.body.createdBy = req.emp.empId;
  const details = await performanceComments.create(req.body);

  res.status(StatusCodes.CREATED).json({
    details,
  });
};

const getComments = async (req, res) => {
  const details = await performanceComments.find();

  res.status(StatusCodes.OK).json({
    details,
    totalDetails: details.length,
    noOfPages: 1,
  });
};

const deleteComments = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const details = await performanceComments.findOne({
    _id: id,
  });
  if (!details) {
    throw new NotFoundError(`No Details with the given id please try again `);
  }

  checkPermission(req.emp.empId, details.createdBy);
  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success Comment Deleted Successfully " });
};

export { createComments, getComments, deleteComments };
