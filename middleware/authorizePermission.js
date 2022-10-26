import { json } from "express";
import { UnAuthenticatedError } from "../errors/index.js";
import user from "../models/User.js";
const authorizePermission = (...roles) => {
  return async (req, res, next) => {
    // console.log(req);
    const emp = req.emp;

    const result = Object.values(emp);

    const users = await user.findById({ _id: result });

    req.employeeId = { empId: users.empId };
    // console.log(users.role, roles, "user", req.empId);
    console.log(users.role, roles);

    if (users.role == roles[0]) {
      next();
    } else if (users.role == roles[1]) {
      next();
    } else {
      throw new UnAuthenticatedError(
        "authorizationPermisson invalid your not allowed "
      );
    }
  };
};

export default authorizePermission;
