import Mongoose from "mongoose";

const projects = new Mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: [true, "Please provide the Project Name"],
    },
    projectDescription: {
      type: String,
      required: [true, "Please provide some Description"],
    },
    countryState: {
      type: String,
      required: [true, "Please provide the state"],
    },
    district: {
      type: String,
      required: [true, "Please provide the district"],
    },
    assignedTo: {
      type: String,
      required: [true, "Please provide the assignedTo"],
    },
    estimatedStart: {
      type: String,
      required: [true, "Please provide the estimatedStart"],
    },
    estimatedEnd: {
      type: String,
      required: [true, "Please provide the estimatedEnd"],
    },
    actualStart: {
      type: String,
      required: [true, "Please provide the actualStart"],
    },
    actualEnd: {
      type: String,
      required: [true, "Please provide the actualEnd"],
    },
    estimatedCost: {
      type: String,
      required: [true, "Please provide the estimatedCost"],
    },
    actualCost: {
      type: String,
      required: [true, "Please provide the actualCost"],
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide createdBy"],
    },
    projectLocationId: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide project location id "],
    },
  },
  { timestamps: true }
);

export default Mongoose.model("projects", projects);
