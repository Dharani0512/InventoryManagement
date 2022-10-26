import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //console.log(authHeader.startsWith("Bearer"));
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    req.emp = { empId: payload.empId };
    req.adminId = { admId: payload.userId };
    req.stateAdmin = { stateAdminId: payload.stateAdminId };
    next();
    //AD10001
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid 2");
  }
};

export default auth;
