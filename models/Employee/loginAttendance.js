import Mongoose from "mongoose";

const loginAttendance = new Mongoose.Schema(
  {
    loginTime: {
      type: String,
    },
    logoutTime: {
      type: String,
    },
    date: {
      type: String,
      required: [true, "please provide Date"],
    },
    date2: {
      type: String,
    },
    attendanceType: {
      type: String,
      required: [true, "please provide AttendanceType"],
    },
    attendanceName: {
      type: String,
    },
    attendanceEmail: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Please turn on gps "],
    },
    latitude: {
      type: String,
      required: ["true", "Please provide Latitude"],
    },
    longitude: {
      type: String,
      required: ["true", "Please provide Longitude"],
    },
    role: {
      type: String,
    },
    state: {
      type: String,
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide user"],
    },
    adminId: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    empId: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default Mongoose.model("loginAttendance", loginAttendance);

