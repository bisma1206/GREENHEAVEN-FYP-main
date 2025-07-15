// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPaperPlane, FaTimes } from "react-icons/fa";
// import { motion } from "framer-motion";

// const backendUrl = "http://localhost:5000/api/chatbot/chat"; // ✅ Fixed API endpoint

// const ChatBot = ({ setChatOpen }) => {

//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const welcomeMessage = {
//       role: "bot",
//       content: "Welcome! 🌿 How can I assist you today?",
//     };
//     setMessages([welcomeMessage]);
//   }, []);

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const newMessage = { role: "user", content: userInput };
//     setMessages([...messages, newMessage]);
//     setUserInput("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(backendUrl, { message: userInput });
//       const botMessage = { role: "bot", content: response.data.reply };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       setMessages([
//         ...messages,
//         { role: "bot", content: "Oops! Something went wrong." },
//       ]);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Chatbox Container */}
//       <motion.div
//         className="bg-white w-full max-w-md p-5 rounded-lg shadow-xl relative flex flex-col"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Chat Header */}
//         <div className="flex justify-between items-center bg-green-700 text-white text-lg font-semibold p-3 rounded-t-lg">
//           🌿 GreenHeaven Chat
//           <button
//             onClick={() => setChatOpen(false)}
//             className="text-white hover:text-gray-300"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="h-72 overflow-y-auto p-4 flex flex-col gap-2">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-lg text-sm ${
//                 msg.role === "user"
//                   ? "bg-green-100 self-end"
//                   : "bg-gray-200 self-start"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="p-3 rounded-lg bg-gray-200 self-start">
//               Typing...
//             </div>
//           )}
//         </div>

//         {/* Chat Input */}
//         <div className="flex items-center border-t border-gray-300 p-2">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-2 p-2 bg-green-700 text-white rounded-md hover:bg-green-800"
//           >
//             <FaPaperPlane />
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ChatBot;

import { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const backendUrl = "http://localhost:5000/api/chatbot/chat"; // ✅ Fixed API endpoint

const ChatBot = ({ setChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const welcomeMessage = {
      role: "bot",
      content: "Welcome! 🌿 How can I assist you today?",
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setMessages([...messages, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(backendUrl, { message: userInput });
      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages([
        ...messages,
        { role: "bot", content: "Oops! Something went wrong." },
      ]);
    }
    setIsLoading(false);
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Chatbox Container */}
      <motion.div
        className=" w-full max-w-md p-5 rounded-lg shadow-xl relative flex flex-col"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{   background: "linear-gradient(to bottom, #4caf50, #ffffff)" }}
      >
        {/* Chat Header */}
        <div className="flex justify-center items-center bg-green-700 text-white text-lg font-semibold p-3 rounded-t-lg">
          <span className="mr-2">🌿</span> GreenHeaven Chat{" "}
          <span className="ml-2">💚</span>
          <button
            onClick={() => setChatOpen(false)}
            className="absolute top-3 right-3 text-white hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-72 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg font-semibold text-sm ${
                msg.role === "user"
                  ? "bg-green-100 self-end"
                  : "bg-white self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-200 self-start flex items-center gap-2">
              <FaRobot className="animate-spin" /> Typing...
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex items-center border-t border-gray-300 p-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBot;
