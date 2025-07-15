import express from "express";
import {
  sendResetPasswordCode,
  resetPassword,
  resetPasswordPage,
} from "../controllers/userController.js";

const resetRouter = express.Router();

// Route to request password reset code
resetRouter.post("/reset-password-request", sendResetPasswordCode);
resetRouter.get("/reset-password/:resetToken", resetPasswordPage);
resetRouter.post("/reset-password/:resetToken", resetPassword);

// Route to reset password

export default resetRouter;
