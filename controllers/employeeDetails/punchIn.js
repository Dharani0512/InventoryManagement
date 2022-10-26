import { NotFoundError, BadRequestError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";
import personalDetails from "../../models/Admin/personalDetails.js";

const putCheckIn = async (req, res, punchIn) => {
  req.body.createdBy = req.user.userId;
  const punchInName = await personalDetails.find({
    createdBy: req.user.userId,
  });
  if (!punchInName[0]) {
    throw new BadRequestError("please fill the login form");
  }
  const { name } = punchInName[0];
  req.body.name = name;

  const detail = await punchIn.create(req.body);
  res.status(StatusCodes.OK).json({ detail });
};
export { putCheckIn };
