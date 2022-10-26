import express from "express";
import {
  createOrder,
  order,
  paymentVerify,
  razorpayment,
  verification,
} from "../controllers/admin/payment.js";
const router = express.Router();

// razorpay payment

router.route("/razorPayment").post(razorpayment);
router.route("/verification").post(verification);
router.route("/order").post(order);

export default router;
