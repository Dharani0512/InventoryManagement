import Mongoose from "mongoose";

const departmentOptions = new Mongoose.Schema({
  listOfDepartment: {
    type: String,
    required: [true, "Please provide atleast one department"],
  },
});

export default Mongoose.model("departmentOptions", departmentOptions);
// we need one array

// at first the array will be empty

// then we need to update the array

//                                        //
