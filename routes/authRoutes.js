import express from "express";
const router = express.Router();
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUser,
  getAllUser,
  updateUserAdmin,
  deleteUsersAdmin,
  
} from "../controllers/authControllers.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register).get(authenticateUser, getAllUser);

router
  .route("/register/:id")
  .patch(authenticateUser, updateUserAdmin)
  .delete(authenticateUser, deleteUsersAdmin);

router.post('/verify-email', verifyEmail);
router.route("/login").post(login);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
//router.post('/logout', logout)

// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
