import Mongoose from "mongoose";

const performanceComments = new Mongoose.Schema(
  {
    singleComments: {
      type: String,
      required: [true, "Please Type anything"],
    },
    performanceId: {
      type: Mongoose.Types.ObjectId,
      required: [true, "Please provide Performance Id "],
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide created by "],
    },
  },
  { timestamps: true }
);

export default Mongoose.model("performanceComments", performanceComments);
