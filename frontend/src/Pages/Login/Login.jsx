// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ProductContext } from "../../Context/ProductContext";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { CartContext } from "../../Context/CartContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing Eye icons

// const Login = () => {
//   const { token, setToken, backendUrl } = useContext(ProductContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); 
//   const navigate = useNavigate();

//   const { handleLogin } = useContext(CartContext);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     // Check if all fields are empty
//     if (!email && !password) {
//       toast.error("All fields are required. Please fill the form.");
//       return;
//     }

//     try {
//       const response = await axios.post(backendUrl + "/api/user/login", {
//         email,
//         password,
//       });

//       console.log(response.data);

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setToken(response.data.token);
//         handleLogin(response.data.token);
//         navigate("/");
//       } else if (response.data.message === "Invalid credentials") {
//         toast.error(
//           "Invalid credentials. Please check your password or email."
//         );
//       } else if (response.data.message === "User does not exist") {
//         toast.error("User does not exist. Please register.");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/"); // Navigate when token is present
//     }
//   }, [token, navigate]);

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-screen bg-green-50">
//       <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Left Section */}
//         <div
//           className="hidden md:flex flex-col justify-center items-center w-1/2 p-8"
//           style={{
//             backgroundImage:
//               "url('b.jpg')",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
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
//           <h2
//             className="text-2xl font-bold text-[#438A4B] mb-6 uppercase"
//             style={{
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             Welcome
//           </h2>
//           <form onSubmit={submitHandler} className="w-full max-w-sm">
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
//               <div className="text-right mt-2">
//                 <Link to="/reset-password" className="text-[#438A4B] text-sm hover:underline font-bold">
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-[#438A4B] text-white font-semibold rounded-md hover:bg-[#2C6C35] transition"
//             >
//               Login
//             </button>
//           </form>
//           <div className="mt-4 text-sm text-center">
//             <p>
//               <span>Don't have an account?</span>{" "}
//               <Link
//                 to="/signup"
//                 className="text-[#438A4B] font-semibold hover:underline"
//               >
//                 Register Now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { toast } from "react-toastify";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing Eye icons

const Login = () => {
  const { token, setToken, backendUrl } = useContext(ProductContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { handleLogin } = useContext(CartContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if all fields are empty
    if (!email && !password) {
      toast.error("All fields are required. Please fill the form.");
      return;
    }

    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        handleLogin(response.data.token);
        navigate("/");
      } else if (response.data.message === "Invalid credentials") {
        toast.error(
          "Invalid credentials. Please check your password or email."
        );
      } else if (response.data.message === "User does not exist") {
        toast.error("User does not exist. Please register.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Navigate when token is present
    }
  }, [token, navigate]);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-green-50">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div
          className="md:flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('b.jpg')",
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
          <h2
            className="text-2xl font-bold text-[#438A4B] mb-6 uppercase"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Welcome
          </h2>
          <form onSubmit={submitHandler} className="w-full max-w-sm">
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
              <div className="text-right mt-2">
                <Link to="/reset-password" className="text-[#438A4B] text-sm hover:underline font-bold">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#438A4B] text-white font-semibold rounded-md hover:bg-[#2C6C35] transition"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <p>
              <span>Don't have an account?</span>{" "}
              <Link
                to="/signup"
                className="text-[#438A4B] font-semibold hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
