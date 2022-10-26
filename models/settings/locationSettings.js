import Mongoose from "mongoose";

const locationOptions = new Mongoose.Schema({
  listOfLocation: {
    type: String,
    required: [true, "Please provide atleast one location"],
  },
});

export default Mongoose.model("locationOptions", locationOptions);
