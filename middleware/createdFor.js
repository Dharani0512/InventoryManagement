import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";
import User from "../models/User.js";
// import modal from "../models/Admin/EmployeeDetail.js";
import userModel from "../models/User.js";
StatusCodes;
const createdFor = async (req, res, next, modal) => {
  req.body.adminId = req.user.userId; //admin id
  req.body.createdBy = req.emp.empId; //unique id
  // req.body.empId = req.stateAdmin.stateAdminId; //stateadmin empID

  const { employeeId } = req.body;
  const data = await userModel.findOne({ employeeId });
  if (!data) {
    throw new NotFoundError(
      `No Employee with Id ${employeeId} Please Register the Employee `
    );
  }

  req.body.state = data.state;

  const stateAdminId = await userModel.findOne({
    state: data.state,
  });

  req.body.empId = stateAdminId.empId;

  // avoiding the dupicate data
  const avoidDuplicate = await modal.findOne({ createdFor: data._id });
  if (!avoidDuplicate) {
    req.body.createdFor = data._id;
    // req.body.createdBy = req.user.userId;
    const details = await modal.create(req.body);
    res.status(StatusCodes.CREATED).json({ details });
  } else {
    throw new BadRequestError(`${employeeId} already exist`);
  }
  next();
};

export default createdFor;
