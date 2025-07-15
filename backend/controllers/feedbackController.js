import Feedback from "../models/feedbackModel.js"; // Import the Feedback model

// Add feedback
export const addFeedback = async (req, res) => {
  try {
    const { userId, message, rating } = req.body;
    if (!userId || !message || !rating) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const newFeedback = new Feedback({
      userId,
      message,
      rating,
    });

    await newFeedback.save();

    res.json({
      success: true,
      message: "Feedback added successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});

    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get feedback by user
export const getFeedbackByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId });

    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error fetching feedback for user:", error);
    res.json({ success: false, message: error.message });
  }
};
