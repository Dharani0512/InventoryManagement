import { StatusCodes } from "http-status-codes";
import NotFoundError from "../../errors/not-found.js";
import departmentSettings from "../../models/settings/departmentSettings.js";
import User from "../../models/User.js";
import checkPermission from "../../utils/checkPermission.js";

const createDepartmentOptions = async (req, res) => {
  const details = await departmentSettings.create(req.body);
  res.status(StatusCodes.CREATED).json({ details });
};

const getAllDepartmentOptions = async (req, res) => {
  const items = await departmentSettings.find({});
  const details = items.map((item) => {
    return item.listOfDepartment;
  });
  res.status(StatusCodes.OK).json(details);
};

const deleteDepartmentOptions = async (req, res) => {
  const { id: detailsId } = req.params;
  const role = req.emp.empId;
  const details = await departmentSettings.findOne({ _id: detailsId });

  if (!details) {
    throw new NotFoundError(`No Details with Id ${detailsId}`);
  }
  const checkrole = await User.findOne({
    _id: role,
  });
  checkPermission(checkrole.role, details.createdBy);

  await details.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Department option deleted successfully" });
};

export {
  createDepartmentOptions,
  getAllDepartmentOptions,
  deleteDepartmentOptions,
};
