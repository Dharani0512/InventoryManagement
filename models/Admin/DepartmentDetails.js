import Mongoose from "mongoose";

const DepartmentDetailsTemplate = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Name"],
  },
  employeeId: {
    type: String,
    required: [true, "Please provide Employee Id"],
  },
  designation: {
    type: String,
    required: [true, "Please provide Designation"],
  },
  email: {
    type: String,
    required: [true, "Please provide Email"],
  },
  gender: {
    type: String,
    required: [true, "Please provide Gender"],
  },
  state: {
    type: String,
    required: [true, "Please provide state"],
  },
  workingLocation: {
    type: String,
    // required: [true, "Please provide WorkLoaction"],
  },
  employeeStatus: {
    type: String,
    enum: ["Working", "Not Working"],
    default: "Working",
    // default: "Working",
    // required: [true, "Please provide Employee Status"],
  },
  department: {
    type: String,
    required: [true, "Please provide Department"],
  },
  createdBy: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  adminId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  empId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  createdFor: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    // required: [true, "Please provide createdfor"],
  },
});

export default Mongoose.model("departmentDetails", DepartmentDetailsTemplate);
