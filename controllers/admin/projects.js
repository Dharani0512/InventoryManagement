import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import NotFoundError from "../../errors/not-found.js";
import sendDetails from "../../helper/sendDetails.js";
import projects from "../../models/Admin/projects.js";
import userModel from "../../models/User.js";
import checkPermission from "../../utils/checkPermission.js";
import superAdminAccess from "../../utils/superAdminAccess.js";

const createProjects = async (req, res) => {
  const { countryState } = req.body;
  const superAdminId = req.user.userId;
  const findStateAdmin = await userModel.findOne({ state: countryState });
  if (!findStateAdmin) {
    throw new BadRequestError("please select the state");
  }
  const locationId = findStateAdmin.empId;
  const stateAdminId = req.emp.empId;
  req.body.createdBy = superAdminId;
  req.body.projectLocationId = locationId;
  const details = await projects.create(req.body);
  res.status(StatusCodes.CREATED).json({
    details,
  });
};
const getAllProjectsAdmin = async (req, res) => {
  const { district, search, countryState, sort } = req.query;
  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID
  const findAdmin = await userModel.findOne({ adminId });

  let details;
  let output;

  output = await sendDetails(
    req,
    {},
    [search, district, countryState],
    ["projectTitle", "district", "countryState"],
    ["latest", "oldest", "a-z", "z-a"],
    ["-createdAt", "createdAt", "name", "-name"],
    projects,
    sort
  );

  console.log("admin runinni");

  // console.log(output);

  // const details = await projects.find({});
  // const totalDetails = details.length;
  res.status(StatusCodes.OK).json({
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const getAllProjectsStateAdmin = async (req, res) => {
  // state admin id will come from front end localstorage

  // const stateAdminId = req.stateAdmin.stateAdminId;
  // const details = await projects.find({ projectLocationId: stateAdminId });
  const { district, search, countryState, sort } = req.query;
  const adminId = req.user.userId; // admin id
  const uniqueId = req.emp.empId; // unique id
  const empId = req.stateAdmin.stateAdminId; //empID
  const findAdmin = await userModel.findOne({ adminId });

  let details;
  let output;

  output = await sendDetails(
    req,
    { empId: empId },
    [search, district, countryState],
    ["projectTitle", "district", "countryState"],
    ["latest", "oldest", "a-z", "z-a"],
    ["-createdAt", "createdAt", "name", "-name"],
    projects,
    sort
  );

  console.log("stateAdmin runing ");

  // console.log(output);

  // const details = await projects.find({});
  // const totalDetails = details.length;
  res.status(StatusCodes.OK).json({
    details: output[0],
    totalDetails: output[1],
    numOfPages: output[2],
  });
};

const deleteProjects = async (req, res) => {
  const { id: projectId } = req.params;

  const foundProject = await superAdminAccess(
    req,
    res,
    projectId,
    "You are not allowed to delete this project"
  );

  await foundProject.remove();

  res.status(StatusCodes.OK).json({ msg: "Project deleted Successfully" });
};

const updateProjects = async (req, res) => {
  const { id: projectId } = req.params;

  const foundProject = await superAdminAccess(
    req,
    res,
    projectId,
    "You are not allowed to update the project"
  );
  const updateProject = await projects.findOneAndUpdate(
    {
      _id: foundProject._id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Project updated successfully" });
};

export {
  createProjects,
  deleteProjects,
  updateProjects,
  getAllProjectsAdmin,
  getAllProjectsStateAdmin,
};
