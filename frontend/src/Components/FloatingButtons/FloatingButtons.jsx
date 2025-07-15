import { useState } from "react";
import { FiEdit3 } from "react-icons/fi"; // Feedback icon
import { MdChat } from "react-icons/md"; // Chat icon
import FeedbackModal from "../feedbackModel/feedbackModel";
import ChatBot from "../ChatBot/ChatBot";

const FloatingButtons = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      {/* Floating Chat and Feedback Buttons */}
      <div className="fixed bottom-10 right-4 flex flex-col gap-4 z-50">
        <button
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 flex items-center justify-center"
          onClick={() => setFeedbackOpen(true)}
        >
          <FiEdit3 className="w-6 h-6" />
          <span className="sr-only">Feedback</span>
        </button>
        <button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-400 flex items-center justify-center"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <MdChat className="w-6 h-6" />
          <span className="sr-only">Chat</span>
        </button>
      </div>

      {/* Chat Modal */}
      {chatOpen && <ChatBot setChatOpen={setChatOpen} />}

      {/* Feedback Modal */}
      {feedbackOpen && <FeedbackModal setFeedbackOpen={setFeedbackOpen} />}
    </>
  );
};

export default FloatingButtons;
