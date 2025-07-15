import express from "express";
import {
  addFeedback,
  getAllFeedback,
  getFeedbackByUser,
} from "../controllers/feedbackController.js";
import authUser from "../middleware/auth.js"; // Assuming this middleware checks user authentication

const feedbackRouter = express.Router();

// Post feedback
feedbackRouter.post("/add", authUser, addFeedback); // User must be authenticated to add feedback

// Get all feedback (admin feature)
feedbackRouter.get("/", getAllFeedback); // Admin or user can get all feedback

// Get feedback by user ID
feedbackRouter.get("/:userId", authUser, getFeedbackByUser); // Only authenticated user can see their feedback

export default feedbackRouter;
