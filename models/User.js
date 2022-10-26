import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongoose from "mongoose";
import validator from "validator";

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  adminId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  empId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
    },
    unique: true,
  },
  employeeId: {
    type: String,
    required: [true, "Please Enter your Employee Id "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },

  role: {
    type: String,
    enum: ["Admin", "Employee", "stateAdmin"],
    default: "Employee",
  },
  state: {
    type: String,
    required: [false, "state"],
  },

  verificationToken: String,

  isVerified: {
    type: Boolean,
    default: false,
  },
  verfied: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // console.log(this.password);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this.adminId, empId: this._id, stateAdminId: this.empId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default Mongoose.model("user", UserSchema);
