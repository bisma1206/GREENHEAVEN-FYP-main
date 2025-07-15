import express from "express";
import {
  updateProfile,
  updateProfilePic,
  getUserProfile,
  loginUser,
  registerUser,
  adminLogin,
  getUserCount,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/admin", adminLogin);

// Profile Routes
router.get("/profile", authUser, getUserProfile);
router.post(
  "/profile/update",
  authUser,
  upload.single("profilePic"),
  updateProfile
);
router.post(
  "/updateProfilePic",
  authUser,
  upload.single("profilePic"),
  updateProfilePic
);

router.get("/user-count", getUserCount);

export default router;
