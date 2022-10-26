import { UnAuthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
  // if (requestUser === resourceUserId.toString()) return;
  if (requestUser == "Admin" || requestUser == "stateAdmin") return;
  throw new UnAuthenticatedError("not authorized to access this route");
};

export default checkPermission;
