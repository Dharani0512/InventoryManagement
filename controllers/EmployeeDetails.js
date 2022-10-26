import { StatusCodes } from "http-status-codes";
import EmployeeDetails from "../models/Admin/EmployeeDetail";
import leaveTemplate from "../models/Admin/LeaveForm";
import userModel from "../models/User";

// used to create new employee details by the admin
const employeeDetails = async (req, res) => {
  const { id } = req.body;
  const employeeId = await userModel.find({ _id: id });

  req.body.createdBy = req.user.userId;
  req.body.adminId = req.user.userId;
  req.body.empId = req.emp.empId;
  // req.body.createdFor =
  const details = await EmployeeDetails.create(req.body);
  // res.status(StatusCodes.CREATED).json({ details });
  res.json({ msg: employeeId });
};

// used to get all the employee details for the admin
const getEmployee = async (req, res) => {
  const { name, designation } = req.query;
  const details = await EmployeeDetails.find({});

  res.json({ details, totalDetails: details.length, numOfPages });
};

// used to delete the employee details based on the given id
const deleteEmployee = async (req, res) => {
  try {
    // getting the id that is comming from the parameters
    const { id: empId } = req.params;
    const employee = await EmployeeDetails.findOneAndDelete({ _id: empId });
    //  if there is no employee with the given id the not found status will be thrown
    if (!employee) {
      res.status(404).json({ msg: `no employee with id ${empId}` });
    }
  } catch (error) {
    res.json(error);
  }
};

const getDetails = async (req, res) => {
  const { reason } = req.params;

  try {
    const sendDetails = await EmployeeDetails.find();
    const singleDetails = sendDetails.find(
      (item) => item.salary === Number(reason)
    );
    if (!singleDetails) {
      const filtered = sendDetails.map((item) => {
        const { name, fatherName, dob, salary } = item;
        return { name, fatherName, dob, salary };
      });
      res.json(filtered);
    }
    return res.json(singleDetails);
  } catch (error) {
    res.send(`error : ${error}`);
  }
};

const getReason = (req, res) => {
  console.log(req.params);
};

const EmpLeave = (req, res) => {
  const leaveForm = new leaveTemplate({
    reason: req.body.reason,
  });
  leaveForm
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

// const example = (req,res) => {
//     res.json(req.body)
// }

export {
  employeeDetails,
  getEmployee,
  deleteEmployee,
  getDetails,
  getReason,
  EmpLeave,
  // example,
};
