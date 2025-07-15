// import { useState, useContext } from "react";
// import axios from "axios";
// import { FaTimes } from "react-icons/fa";
// import { UserContext } from "../../Context/UserContext"; // ✅ Import UserContext
// import { toast } from "react-toastify";

// const backendUrl = "http://localhost:5000/api/feedback/add"; // ✅ Backend API

// const FeedbackModal = ({ setFeedbackOpen }) => {
//   const { user } = useContext(UserContext);
//   const [message, setMessage] = useState("");
//   const [rating, setRating] = useState(5);
//   const [loading, setLoading] = useState(false);


//   const token = localStorage.getItem("token");

//   const handleSubmit = async () => {

//     if (!message || rating < 1 || rating > 5) {
//       toast.error("Please provide a valid feedback message and rating.");
//       return;
//     }

//     setLoading(true); 

//     try {
//       const response = await axios.post(backendUrl, {
//         userId: user._id, // Pass user ID from context
//         message: message, // Feedback message
//         rating: rating, // Rating
//       },
    
//       {
//         headers: { Authorization: `Bearer ${token}` }, // Include token in headers
//       }
//     );

//       if (response.data.success) {
        
//         toast.success("Thank you for your feedback!");
//         setFeedbackOpen(false); 

//       } else {
        
//         toast.error(response.data.message || "Failed to submit feedback.");
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       toast.error("An error occurred while submitting your feedback.");
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold">We Value Your Feedback</h2>
//           <button
//             onClick={() => setFeedbackOpen(false)}
//             className="text-gray-600 hover:text-red-500"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <textarea
//           className="w-full h-32 border border-gray-300 p-2 rounded-md mt-4"
//           placeholder="Write your feedback here..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <div className="flex justify-between items-center mt-4">
//           <span>Rate Us: </span>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             className="border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackModal;


import { useState, useContext } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext"; // ✅ Import UserContext
import { toast } from "react-toastify";

const backendUrl = "http://localhost:5000/api/feedback/add"; // ✅ Backend API

const FeedbackModal = ({ setFeedbackOpen }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!message || rating < 1 || rating > 5) {
      toast.error("Please provide a valid feedback message and rating.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        backendUrl,
        {
          userId: user._id, // Pass user ID from context
          message: message, // Feedback message
          rating: rating, // Rating
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        }
      );

      if (response.data.success) {
        toast.success("Thank you for your feedback!");
        setFeedbackOpen(false);
      } else {
        toast.error(response.data.message || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting your feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-500">
            Your Opinion Matters! 😊
          </h2>
          <button
            onClick={() => setFeedbackOpen(false)}
            className="text-gray-600 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <textarea
          className="w-full h-32 border border-gray-300 p-2 rounded-md mt-4"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <span className="text-green-500">Rate Us: </span>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-md"
            />
            <span
              className="ml-2"
              style={{ color: "green", fontSize: "1.25rem" }}
            >
              ⭐⭐⭐⭐⭐
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
