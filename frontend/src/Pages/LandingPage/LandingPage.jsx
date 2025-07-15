import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center h-[100vh] bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: "url('/Phone Wallpaper Background.png')",
        backgroundSize: "contain"
      }}
    >
      {/* Main Layout with Two Sections */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#2C6C35] mb-4">
            Welcome to GreenHeaven
          </h1>
          <p className="text-lg text-[#2C6C35]">
            Discover a world of sustainability and eco-friendly living.
          </p>
        </div>

        {/* Center Line
        <div className="hidden md:block h-100 w-[2px] bg-gray-400 mx-auto"></div> */}
        
        
        {/* Right Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[#2C6C35] text-lg">Join us and be part of the green revolution!</p>
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3/4 px-8 py-3 bg-gradient-to-r from-[#438A4B] to-[#387837] text-white font-semibold rounded-full hover:opacity-90 transition shadow-lg"
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3/4 px-8 py-3 bg-gradient-to-r from-[#438A4B] to-[#387837] text-white font-semibold rounded-full hover:opacity-90 transition shadow-lg"
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;