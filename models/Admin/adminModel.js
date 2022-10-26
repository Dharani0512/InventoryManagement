const Mongoose = require("mongoose");

const AttendanceModel = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  working_days: {
    type: String,
    required: true,
  },
  total_working_days: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model("attendanceDetails", AttendanceModel);
