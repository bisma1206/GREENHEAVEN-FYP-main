// import { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { ProductContext } from "../../Context/ProductContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const { token, setToken, backendUrl } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Check if all fields are empty
//     if (!name && !email && !password) {
//       toast.error("All fields are required. Please complete the form.");
//       return;
//     }

//     // Validation for full name (no numbers or special characters allowed)
//     const nameRegex = /^[a-zA-Z\s]+$/;
//     if (!nameRegex.test(name)) {
//       toast.error(
//         "Invalid credentials. Full Name should not contain numbers or special characters."
//       );
//       return;
//     }

//     try {
//       console.log("Signup request payload:", { name, email, password });

//       const response = await axios.post(backendUrl + "/api/user/signup", {
//         name,
//         email,
//         password,
//       });

//       console.log(response.data);

//       if (response.data.success) {
//         toast.success("Signup successfully!");
//         setToken(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         navigate("/login");
//       } else if (response.data.message === "User already exists") {
//         toast.error("User already exists with this email.");
//       } else if (response.data.message === "Weak password") {
//         toast.error("Please choose a stronger password.");
//       } else if (response.data.message === "Invalid credentials") {
//         toast.error("Invalid credentials. Please try again.");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       // Handle errors from the server or network
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message || "An error occurred.");
//       } else {
//         toast.error(error.message || "An error occurred.");
//       }
//     }
//   };

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-green-50">
//       <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Left Section */}
//         <div
//           className="hidden md:flex flex-col justify-center items-center w-1/2 p-8"
//           style={{
//             backgroundImage:
//               "url('b.jpg')",
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//           }}
//         >
//           {/* Logo */}
//           <div className="flex items-center -mt-8">
//             <img
//               src="/images/Black_and_Green_Typographical_Green_Energy_Logo__7_-removebg-preview.png"
//               alt="Green Heaven Logo"
//               className="h-28.5 w-auto object-contain"

//             />
//           </div>
//           <p className="mt-4 text-center text-white">
//             Step into Green Heaven – a sanctuary where every leaf whispers peace.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-12">
//           <h2 className="text-2xl font-bold text-[#438A4B] mb-6">
//             Create Your Account
//           </h2>
//           <form onSubmit={handleSignup} className="w-full max-w-sm">
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 />
//                 {/* Toggle eye icon */}
//                 <span
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-[#438A4B] text-white font-semibold rounded-md hover:bg-[#2C6C35] transition"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="mt-4 text-sm text-center">
//             <p>
//               <span>Already have an account?</span>{" "}
//               <Link
//                 to="/login"
//                 className="text-[#438A4B] font-semibold hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "../../Context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { token, setToken, backendUrl } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if all fields are empty
    if (!name && !email && !password) {
      toast.error("All fields are required. Please complete the form.");
      return;
    }

    // Validation for full name (no numbers or special characters allowed)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error(
        "Invalid credentials. Full Name should not contain numbers or special characters."
      );
      return;
    }

    try {
      console.log("Signup request payload:", { name, email, password });

      const response = await axios.post(backendUrl + "/api/user/signup", {
        name,
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        toast.success("Signup successfully!");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else if (response.data.message === "User already exists") {
        toast.error("User already exists with this email.");
      } else if (response.data.message === "Weak password") {
        toast.error("Please choose a stronger password.");
      } else if (response.data.message === "Invalid credentials") {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle errors from the server or network
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error(error.message || "An error occurred.");
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div
          className="md:flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-cover bg-center"
          style={{
            backgroundImage: "url('b.jpg')", // Use your image path here
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Logo */}
          <div className="flex items-center -mt-8">
            <img
              src="/images/Black_and_Green_Typographical_Green_Energy_Logo__7_-removebg-preview.png"
              alt="Green Heaven Logo"
              className="h-28.5 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-center text-white">
            Step into Green Heaven – a sanctuary where every leaf whispers peace.
          </p>
        </div>

        {/* Right Section (Form Section) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-12">
          <h2 className="text-2xl font-bold text-[#438A4B] mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSignup} className="w-full max-w-sm">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                {/* Toggle eye icon */}
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#438A4B] text-white font-semibold rounded-md hover:bg-[#2C6C35] transition"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <p>
              <span>Already have an account?</span>{" "}
              <Link
                to="/login"
                className="text-[#438A4B] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
