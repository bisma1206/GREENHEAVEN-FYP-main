import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // To store the user ID
  message: { type: String, required: true }, // Feedback message
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating between 1 and 5
  createdAt: { type: Date, default: Date.now }, // Feedback creation timestamp
});

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
