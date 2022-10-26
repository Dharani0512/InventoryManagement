import Mongoose from "mongoose";

const imageUpload = new Mongoose.Schema({
  image: {
    name: { type: String },
    data: { type: Buffer },
    size: { type: Number },
    filetype: { type: String },
    required: [false, "please Provide a file"],
  },
});

export default Mongoose.model("imageUpload", imageUpload);
