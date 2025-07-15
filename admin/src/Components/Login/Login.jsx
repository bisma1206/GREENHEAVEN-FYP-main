import { useState } from "react";
import { backendUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Check if fields are empty
      if (!email.trim() || !password.trim()) {
        toast.error("All fields are required. Please complete the form.");
        return;
      }

      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/06/08/6a/06086aaf1555e6e4d23b5ee05686282e.jpg')", // Background image URL
      }}
    >
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 rounded-lg shadow-2xl hover:shadow-2xl">
        {/* Left Section */}
        <div className="text-center">
        <div className="flex items-center">
        <h1
            className="text-2xl font-extrabold text-green-800 mb-6 uppercase text-center"
            style={{
              textShadow: "2px 5px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            }}
          >
            GREEN HEAVEN
          </h1>

          </div>
        </div>

        {/* Form Section */}
        <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
          <h2
            className="text-2xl font-extrabold text-green-800 mb-6 uppercase text-center"
            style={{
              textShadow: "2px 5px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            }}
          >
            Admin Portal Access
          </h2>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none shadow-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 font-bold shadow-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired, // `setToken` is a required function
};
