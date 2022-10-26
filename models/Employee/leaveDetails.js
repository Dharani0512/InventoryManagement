import Mongoose from "mongoose";
/*
models => employee => leaveDetails
*/
const leaveModal = new Mongoose.Schema(
  {
    employeeId: {
      type: String,
      ref: "salaryDetails",
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    role: {
      type: String,
    },
    emailId: {
      type: String,
    },
    leaveType: {
      type: String,
      enum: [
        "Casual Leave",
        "Medical Leave",
        "Maternity Leave",
        "Earned Leave",
      ],
      default: "Casual Leave",
      required: [true, "Please mention Leave Type"],
    },
    fromDate: {
      type: Date,
      required: [true, "Please provide FromDate"],
    },
    toDate: {
      type: Date,
      required: [true, "Please Provide toDate"],
    },
    reason: {
      type: String,
      required: [true, "Please Provide reason"],
    },
    totalDays: {
      type: Number,
      required: [true, "Please Provide totalDays"],
    },
    image: {
      name: { type: String },
      size: { type: Number },
      filetype: { type: String },
      required: [false, "please Provide a file"],
    },
    filePath: {
      type: String,
      required: [true, " please provid path "],
    },
    defaultLeavePerYear: {
      type: Number,
      default: 12,
    },
    balanceleaveDays: {
      type: Number,
      default: 12,
    },
    leaveTaken: {
      type: Number, //front end
      default: 0,
    },
    leaveTakenBefore: {
      type: Number,
    },
    status: {
      type: String,
      required: [true],
      default: "pending",
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide user"],
    },
    createdFor: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide createdfor"],
    },
    exceedLeave: {
      type: Number,
      default: 0,
    },
    nextMonth: {
      type: String,
      default: "2022/6/30",
    },
    count: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      ref: "User",
    },
    state: {
      type: String,
      ref: "User",
    },
  },

  { timestamps: true }
);

export default Mongoose.model("leaveDetails", leaveModal);
