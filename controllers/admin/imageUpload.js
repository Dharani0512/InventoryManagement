import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import leaveDetails from "../../models/Admin/imageUpload.js";
import personalDetails from "../../models/Admin/personalDetails.js";
import checkPermission from "../../utils/checkPermission.js";
import path from "path";
const dirname = path.dirname("/");

const createImage = async (req, res) => {
  // const { createdBy } = req.body;
  console.log(req.body);
  console.log(req.files);

  const id = req.emp.empId;
  const employeeDetails = await personalDetails.find({ createdFor: id });
  if (!employeeDetails) {
    throw new BadRequestError(
      "Please tell the admin to fill the personal details form "
    );
  }
  const { name, employeeId, designation, email } = employeeDetails[0];
  // adsjfklj
  // req.body.totalDays = 1;
  // req.body.reason = "sick";
  // req.body.toDate = "12-23-2000";
  // req.body.fromDate = "12-23-2000";

  //   req.body.createdBy = id;
  //   req.body.createdFor = id;
  //   req.body.name = name;
  //   req.body.employeeId = employeeId;
  //   req.body.designation = designation;
  //   req.body.emailId = email;
  req.body.image = req.files.image;
  req.body.image.filetype = req.files.image.mimetype;
  req.body.image.data = req.files.image.data;

  const uploadImage = req.files.image;

  const imagePath = path.join(
    dirname,
    "/home/shameena/Desktop/project back up/aug5/utils/uploadImages/" +
      `${uploadImage.name}`
  );

  await uploadImage.mv(imagePath);
  const detail = await leaveDetails.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: detail.name, image: "image added" });
};

export { createImage };
