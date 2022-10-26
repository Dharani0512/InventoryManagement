import Mongoose from "mongoose";

const departmentOptions = new Mongoose.Schema({
  listOfDepartment: {
    type: String,
    required: [true, "Please provide atleast one Department"],
  },
});

export default Mongoose.model("departmentOptions", departmentOptions);
