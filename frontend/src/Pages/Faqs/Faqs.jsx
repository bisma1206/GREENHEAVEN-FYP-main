// import { useState } from "react";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
// import { Link } from "react-router-dom";

// const Faqs = () => {
//   const faqSections = [
//     {
//       title: "🌱 Sweepstakes",
//       questions: [
//         {
//           question: "What are the Sweepstakes rules?",
//           answer:
//             "Sweepstakes rules vary by campaign and are usually provided in the campaign's terms and conditions.",
//         },
//       ],
//     },
//     {
//       title: "🚚 Shipping & Delivery",
//       questions: [
//         {
//           question: "Do I need to sign for my delivery?",
//           answer:
//             "No signature is required for delivery to ensure contactless delivery unless otherwise specified.",
//         },
//         {
//           question: "Where do you deliver?",
//           answer:
//             "We deliver across all 50 states in the US. However, some states may have restrictions on specific plant species.",
//         },
//       ],
//     },
//     {
//       title: "🌿 Product Questions",
//       questions: [
//         {
//           question: "Will my house plant look like the picture?",
//           answer:
//             "We strive to deliver plants that resemble the image on our website. However, slight variations may occur due to natural growth.",
//         },
//       ],
//     },
//     {
//       title: "💬 Customer Service",
//       questions: [
//         {
//           question: "How can I reach out to the Green Heaven team?",
//           answer:
//             "You can contact us via email at support@greenheaven.com or call our hotline at (123) 456-7890.",
//         },
//       ],
//     },
//   ];

//   const [openQuestion, setOpenQuestion] = useState(null);

//   const toggleQuestion = (index) => {
//     setOpenQuestion((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen p-6"
//         style={{
//           background: "linear-gradient(to bottom, #d0f5d7, #e8f5e9)", // Green and white gradient background
//         }}
//       >
//         {/* Header Section */}
//         <header className="text-center py-8">
//           <div className="md:w-full">
//             <h1
//               className="text-3xl font-bold text-green-700"
//               style={{
//                 textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Shadow effect on text
//               }}
//             >
//               Frequently Asked Questions
//             </h1>
//             <p className="text-gray-600 mt-4">
//               We’re here to help! Browse through the questions below to find the
//               answers you need.
//             </p>
//           </div>
//           {/* <div className="mt-6 w-full flex justify-center">
//             <img
//               src="https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-indoor-plant-flowerpot-png-image_11669796.png"
//               alt="Decorative plant"
//               className="h-40 w-40 rounded-lg shadow-md transition-transform duration-500 hover:scale-110" // Increased width and hover effect
//             />
//           </div> */}
//         </header>

//         {/* FAQs Section */}
//         <div className="max-w-4xl mx-auto space-y-8">
//           {faqSections.map((section, sectionIndex) => (
//             <div
//               key={sectionIndex}
//               className="rounded-lg shadow-md p-6"
//               style={{
//                 background: "linear-gradient(to bottom, #ffffff, #ecfdf5)", // Green and white box gradient
//               }}
//             >
//               <h2 className="text-xl font-semibold text-green-700 flex items-center">
//                 {section.title}
//               </h2>
//               <ul className="mt-4">
//                 {section.questions.map((item, questionIndex) => {
//                   const currentIndex = `${sectionIndex}-${questionIndex}`;
//                   return (
//                     <li key={questionIndex} className="mb-4">
//                       <button
//                         onClick={() => toggleQuestion(currentIndex)}
//                         className="flex justify-between w-full text-left text-gray-700 hover:text-green-600 cursor-pointer"
//                       >
//                         <span>☀ {item.question}</span>
//                         <span>{openQuestion === currentIndex ? "▲" : "▼"}</span>
//                       </button>
//                       {openQuestion === currentIndex && (
//                         <p className="mt-2 text-gray-600">{item.answer}</p>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Footer Section */}
//         <footer className="text-center mt-12">
//           <p className="text-gray-600">
//             Can’t find your question?{" "}
//             <Link to="/contact" className="text-[#438A4B] font-bold cursor-pointer hover:underline">
//               Contact us
//             </Link>{" "}
//             for more help!
//           </p>
//         </footer>
//       </div>
//       <FloatingButtons />
//       <Footer />
//     </>
//   );
// };

// export default Faqs;


import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqSections = [
    {
      title: "🌿 General Information",
      questions: [
        { question: "What is Green Heaven?", answer: "Green Heaven is an eco-friendly brand dedicated to sustainable living through plants and nature-based solutions." },
        { question: "Where are you located?", answer: "Our headquarters is in Lahore, Pakistan, and we deliver nationwide." },
        { question: "What type of products do you offer?", answer: "We offer indoor plants, gardening tools, organic fertilizers, and eco-friendly home decor." },
        { question: "Do you have physical stores?", answer: "Currently, we operate online but plan to expand to physical stores soon." }
      ]
    },
    {
      title: "🚚 Shipping & Delivery",
      questions: [
        { question: "How long does delivery take?", answer: "Delivery typically takes 3-5 business days within major cities and up to 7 days for remote areas." },
        { question: "Do you offer international shipping?", answer: "Currently, we only deliver within Pakistan." },
        { question: "What are the delivery charges?", answer: "Delivery charges vary based on location and order weight. Free delivery is available for orders above Rs. 3000." },
        { question: "Can I track my order?", answer: "Yes, you will receive a tracking number once your order has been dispatched." }
      ]
    },
    {
      title: "🌱 Plant Care & Maintenance",
      questions: [
        { question: "How often should I water my plants?", answer: "It depends on the plant species. Most indoor plants require watering once a week." },
        { question: "What should I do if my plant’s leaves are turning yellow?", answer: "Yellow leaves could be due to overwatering or lack of nutrients. Adjust your watering schedule and check the soil." },
        { question: "Can I grow plants indoors without sunlight?", answer: "Yes, we offer low-light plants that thrive indoors with minimal sunlight." },
        { question: "How do I fertilize my plants?", answer: "Use organic fertilizers every 2-3 months for best results." }
      ]
    },
    {
      title: "💬 Customer Support",
      questions: [
        { question: "How can I contact Green Heaven?", answer: "You can email us at support@greenheaven.com or call our helpline at (123) 456-7890." },
        { question: "What is your return policy?", answer: "We offer a 7-day return policy for damaged or incorrect items." },
        { question: "Do you offer bulk purchases?", answer: "Yes, we provide discounts on bulk orders for businesses and events." },
        { question: "How do I cancel my order?", answer: "Orders can be canceled within 24 hours of placing them." }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredFaqs = faqSections.map((section) => ({
    ...section,
    questions: section.questions.filter((q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.questions.length > 0);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left Section - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <img
              src="/FAQ.png"
              alt="Child with question mark"
              className="w-60 h-auto mt-4"
            />
          </motion.div>
          {/* Right Section - FAQ Header */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-green-900"
            >
              Your Queries, Our Answers!
            </motion.h1>
            <p className="text-green-800 mt-2">Find insights and solutions to the most commonly asked questions about Green Heaven.</p>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg mt-6 flex items-center bg-green-100 rounded-lg p-2 shadow-md transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Describe your issue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none px-4 py-2 text-green-900"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-all duration-300">
                <FaSearch />
              </button>
            </motion.div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-50"
              >
                <h2 className="text-xl font-semibold text-green-700">{section.title}</h2>
                <ul className="mt-4">
                  {section.questions.map((item, questionIndex) => (
                    <li key={questionIndex} className="mb-4 border-b border-green-300 pb-2">
                      <button
                        onClick={() => toggleQuestion(`${sectionIndex}-${questionIndex}`)}
                        className="flex justify-between w-full text-left text-green-900 hover:text-green-700 cursor-pointer font-medium transition-all duration-300"
                      >
                        <span>{item.question}</span>
                        <motion.span
                          animate={{ rotate: openQuestion === `${sectionIndex}-${questionIndex}` ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openQuestion === `${sectionIndex}-${questionIndex}` && (
                          <motion.p
                            className="mt-2 text-black"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
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

export default Faqs;
