import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const PrivacyPolicy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const policySections = [
    {
      title: "🌿 GreenHeaven Vission & Values",
      content:
        "At Green Heaven, we are committed to promoting sustainable living through the power of plants and nature-based solutions. Our vision is to inspire individuals and communities to embrace eco-friendly practices and contribute to a greener planet. We uphold values of environmental responsibility, transparency, and customer well-being. As part of our commitment, we collect and use information to better serve our customers, enhance their experience, and continuously improve our services. Your trust in us is crucial, and we are dedicated to protecting your data while making sure we provide the highest level of service and sustainability.",
    },
    {
      title: "🚚 Shipping & Delivery",
      content:
        "We process your information to fulfill orders and ensure timely delivery. Delivery typically takes 3-5 business days in major cities, with up to 7 days for remote areas.",
    },
    {
      title: "🌱 Gardening Tips",
      content:
        "We provide tailored recommendations for plant care, including proper watering schedules, and advice for common issues like yellowing leaves or nutrient deficiencies.",
    },
    {
      title: "💬 Customer Support",
      content:
        "If you need assistance, you can reach out to our customer support team at support@greenheaven.com or call our helpline at (123) 456-7890. We’re here to help with returns, exchanges, and more.",
    },
    {
      title: "🔒 Data Security",
      content:
        "We value your privacy and take necessary steps to ensure that your personal information is stored securely and is only accessible by authorized personnel.",
    },
    {
      title: "🔄 Your Rights Over Your Information",
      content:
        "You have the right to access, update, or delete your personal data at any time. You can also request us to stop processing your data for certain purposes.",
    },
    {
      title: "📊 How We Retain Your Information",
      content:
        "We retain your information only for as long as necessary to fulfill the purposes outlined in this privacy policy, such as processing orders and improving our services.",
    },
  ];

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredSections = policySections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')", // Background image URL
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Privacy Policy Header */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-green-800"
          >
            Data Protection Policy
          </motion.h1>
          <p className="text-green-800 mt-2">
            Learn how we handle your data and protect your privacy.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg mt-6 flex items-center bg-white rounded-lg p-2 shadow-md transition-all duration-300 mx-auto"
          >
            <input
              type="text"
              placeholder="Searching....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none px-4 py-2 text-gray-900"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-all duration-300">
              <FaSearch />
            </button>
          </motion.div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-50"
              >
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="flex justify-between w-full text-left text-green-700 hover:text-green-600 cursor-pointer font-medium transition-all duration-300"
                >
                  <span>{section.title}</span>
                  <span className="text-lg">{openSection === sectionIndex ? "▲" : "▼"}</span>
                </button>
                <AnimatePresence>
                  {openSection === sectionIndex && (
                    <motion.p
                      className="mt-4 text-black justify"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {section.content}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-green-900 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No results found.
            </motion.p>
          )}
        </div>
      </motion.div>
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
