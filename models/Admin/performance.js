import Mongoose from "mongoose";

const performanceModel = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide Name"],
    },
    behaviour: {
      type: Number,
      required: [true, "Please provide behaviour"],
    },
    compliance: {
      type: Number,
      required: [true, "Please provide JobKnowledge "],
    },
    grasping: {
      type: Number,
      required: [true, "Please provide Compliance "],
    },
    initiative: {
      type: Number,
      required: [true, "Please provide initiative"],
    },
    jobKnowledge: {
      type: Number,
      required: [true, "Please provide Grasping "],
    },
    proactiveness: {
      type: Number,
      required: [true, "Please provide Proactiveness "],
    },
    targetAchivement: {
      type: Number,
      required: [true, "Please provide Regular Work"],
    },
    teamManagement: {
      type: Number,
      required: [true, "Please provide Leadership Skill "],
    },
    newBusiness: {
      type: Number,
      required: [true, "Please provide Identifing New Business"],
    },
    leadership: {
      type: Number,
      required: [true, "Please provide Team Management"],
    },
    regularWork: {
      type: Number,
      required: [true, "Please provide Target Achivement"],
    },
    proactiveness: {
      type: Number,
      required: [true, "Please provide Target Achivement"],
    },
    empCommentsId: {
      type: Mongoose.Types.ObjectId,
    },
    createdFor: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please select the Employee "],
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide createdBy"],
    },
    adminId: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
    },
    empId: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
    },
    starRating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model("performanceDetails", performanceModel);
