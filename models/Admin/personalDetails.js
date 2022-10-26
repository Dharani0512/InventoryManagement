import Mongoose from "mongoose";
// Employee Id 	Employee Name 	Account Number 	Bank Name 	IFSC Code 	Salary 	Month 	Action
const personalModal = new Mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Please provide Employee Id "],
    },
    name: {
      type: String,
      required: [true, "Please provide Employee Id"],
    },
    gender: {
      type: String,
      required: [true, "Please select any one"],
      enum: ["Male", "Female", "Not Prefered to Say"],
      default: "Male",
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    designation: {
      type: String,
      required: [true, "please provide Designation"],
    },
    date_of_birth: {
      type: String,
      required: [true, "Please provide your Date of birth"],
    },
    currentAddress: {
      type: String,
      required: [true, "Please provide your current Address"],
    },
    accountNumber: {
      type: Number,
      required: [true, "Please provide Account Number"],
    },
    bankName: {
      type: String,
      required: [true, "Please provide Your Bank Name"],
    },
    ifscCode: {
      type: String,
      required: [true, "Please provide your IFSC Code"],
    },
    panNumber: {
      type: String,
      required: [true, "Please provide PAN Number"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Please provide Blood group"],
    },
    contactNo: {
      type: String,
      required: [true, " Please provide Contact Number "],
    },
    emergencyContact: {
      type: String,
      required: [true, "Please Provide Emergency contact "],
    },

    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide user"],
    },
    createdFor: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide created For"],
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
    },
  },
  { timestamps: true }
);

export default Mongoose.model("personalDetails", personalModal);
