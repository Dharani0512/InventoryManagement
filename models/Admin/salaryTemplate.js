import Mongoose from "mongoose";

const salaryTemplate = new Mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "please provide Employee Id"],
    },
    name: {
      type: String,
      required: [true, "please provide Employee Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    // Account details
    accountNumber: {
      type: Number,
      // required: [true, "Please provide Account Number"],
    },
    bankName: {
      type: String,
      required: [true, "Please provide Your Bank Name"],
    },
    ifscCode: {
      type: String,
      required: [true, "Please provide your IFSC Code"],
    },
    // deduction
    pf: {
      type: Number,
      required: [true, "please provide pf"],
    },
    esi: {
      type: Number,
      required: [true, "please provide esi"],
    },
    leaveDeduction: {
      type: Number,
      ref: "leaveDetails.exceedLeave",
      //required: [true, "please provide leaveDeduction"],
    },
    // Salary calculation
    basicSalary: {
      type: Number,
      required: [true, "please provide basic salary"],
    },
    hra: {
      type: Number,
      required: [true, "please provide hra"],
    },
    conveyance: {
      type: Number,
      required: [true, "please provide conveyance"],
    },
    professionalTax: {
      type: Number,
      required: [true, "please provide professsional Tax"],
    },
    incomeTax: {
      type: Number,
      required: [true, "please provide incomeTax"],
    },

    // salary Status
    salaryStatus: {
      type: String,
      enum: ["pending", "salary paid"],
      default: "pending",
    },

    // Addition

    lta: {
      type: Number,
      required: [true, "please provide LTA"],
    },
    diwaliBonus: {
      type: Number,
      required: [true, "please provide Diwali Bonus"],
    },
    gratuity: {
      type: Number,
      required: [true, "please provide Gratuity"],
    },
    medicalAllowance: {
      type: Number,
      required: [true, "please provide medical allowance"],
    },
    // additional information
    division: {
      type: String,
      required: [true, "Please Provide division"],
    },
    branch: {
      type: String,
      required: [true, "Please provide branch"],
    },
    pfNo: {
      type: String,
      required: [true, "Plese provide pfNo"],
    },
    grade: {
      type: String,
      required: [true, "Please prove the Grade"],
    },
    designation: {
      type: String,
      required: [true, "Please prove the designation"],
    },
    basic: {
      type: String,
      required: [true, "Please prove the basic "],
    },
    department: {
      type: String,
      required: [true, "Please prove the department"],
    },
    date_of_join: {
      type: String,
      required: [true, "Please prove the date_of_join"],
    },
    category: {
      type: String,
      required: [true, "Please prove the category"],
    },
    empCode: {
      type: String,
      required: [true, "Please prove the Emp Code"],
    },
    grade: {
      type: String,
      required: [true, "Please prove the Grade"],
    },
    paymentSuccess: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      // required: [true, "please provide user"],
    },
    createdFor: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide CreatedFor"],
    },
    adminId: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide adminId"],
    },
    empId: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide empId"],
    },
    state: {
      type: String,
      // required: [true, "Please Provide State"],
    },
  },
  { timestamps: true }
);

export default Mongoose.model("salaryTemplate", salaryTemplate);
