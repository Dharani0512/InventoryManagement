import Mongoose from "mongoose";
//models -> admin ->
const CurrentYearModel = new Mongoose.Schema({
  currentYear: {
    type: Number,
    default: 2022,
  },
});

export default Mongoose.model("currentYearmodal", CurrentYearModel);
