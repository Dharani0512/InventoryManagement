import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import projects from "../models/Admin/projects.js";
import User from "../models/User.js";

// finding the project and checking it is accessed by which user if it is accessed by admin then it will return the project. else it will throw unauthenticated error

const superAdminAccess = async (req, res, projectId, msg1) => {
  const findProject = await projects.findOne({ _id: projectId });

  if (!findProject) {
    throw new NotFoundError("No Project with the given id ");
  }
  const adminId = req.user.userId;
  const findAdmin = await User.findOne({ adminId });

  const userRole = findAdmin.role;

  if (userRole !== "Admin") {
    throw new BadRequestError(msg1);
  }
  return findProject;
};

export default superAdminAccess;
