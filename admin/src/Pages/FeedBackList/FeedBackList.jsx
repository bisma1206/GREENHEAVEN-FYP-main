import { useState, useEffect } from "react";
import { backendUrl } from "../../App"; // Assuming backendUrl is properly exported from App.js
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion

const FeedbackList = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchAllFeedbacks();
  }, []); 

  const fetchAllFeedbacks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/feedback`, {
        headers: { Authorization: `Bearer ${token}` }, // Authorization header
      });

      if (response.status === 200) {
        setFeedbacks(response.data.feedbacks); // Assuming response data has feedbacks array
      } else {
        toast.error("Failed to fetch feedbacks.");
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error(
        "Error fetching feedbacks: " +
          (error?.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div
      className="p-6 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-lg ">
        <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
          🌟Feedback & Ratings Hub
        </h1>

        <div className="space-y-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <motion.div
                key={feedback._id}
                className="p-5 bg-white shadow-lg rounded-lg border-l-4 border-green-500 hover:shadow-xl transition-all backdrop-blur-md bg-opacity-60 transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} // Add transition here
              >
                {/* Flexbox layout for user name and date */}
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-lg">{feedback.userId.name}</p>
                  <p className="text-sm text-gray-900">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Rating stars in front of the feedback message */}
                <div className="flex items-center mt-2 mb-2">
                  {/* Loop through to create 5 stars, some filled, some unfilled */}
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < feedback.rating
                          ? "text-green-600" // Filled star (colored)
                          : "text-gray-300" // Empty star (unfilled)
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-800 font-bold">{feedback.message}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-800">No Feedback Provided Yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
