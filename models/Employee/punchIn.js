import Mongoose from "mongoose";

const punchIN = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "please fill the personal Details form"],
  },
  attendanceType: {
    type: String,
    required: [true, "please provide attendance type "],
  },
  loginTime: {
    type: String,
    required: [true, "Please Provide Login Time"],
  },
  logoutTime: {
    type: String,
  },
  remarks: {
    type: String,
  },
  currentStatus: {
    type: String,
    enum: ["working", "absent"],
    default: "working",
    required: [true, "please mention absent or presant"],
  },
  createdBy: {
    type: Mongoose.Types.ObjectId,
    ref: "user",
    required: [true, "please provide user"],
  },
});

export default Mongoose.model("punchIn", punchIN);
