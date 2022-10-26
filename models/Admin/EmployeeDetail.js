import Mongoose from "mongoose";

const EmployeeDetailsTemplate = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide Email Id"],
    },
    name: {
      type: String,
      required: [true, "Please provide Name"],
    },
    employeeId: {
      type: String,
      required: [true, "Please provide EmployeeId"],
    },
    designation: {
      type: String,
      required: [true, "Please provide designation"],
    },
    date_of_join: {
      type: String,
      required: [true, "Please provide data of join"],
    },
    date_of_birth: {
      type: String,
      required: [true, "Please provide date of birth"],
    },
    disablility: {
      type: String,
      required: [true, "Please provide disability"],
      enum: ["Yes", "No"],
      default: "No",
    },
    role: {
      type: String,
      default: "Employee",
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdFor: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      // required: [true, "Please provide createdfor"],
    },
    adminId: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
    },
    empId: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      // required: [true, "Please provide state"],
    },
    workingLocation: {
      type: String,
      required: [true, "Please provide work location"],
    },
    lastDate: {
      type: Date,
      default: "2022-06-13",
    },
    logedIn: {
      type: Number,
      default: 0,
    },
    starRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model("empoloyeeDetails", EmployeeDetailsTemplate);
