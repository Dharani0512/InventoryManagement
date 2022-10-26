import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
/*
why: stateadmin can create perform there action on their state employees only
*/
const roleAccess = (user, state, role) => {
  console.log(user, state, role);
  if (role == "Admin") {
    return;
  } else if (role == "stateAdmin" && user == state) {
    return;
  } else {
    throw new BadRequestError(
      "your cannot perform this action, your action will reported to your admin"
    );
  }
};

export default roleAccess;
