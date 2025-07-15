// import PropTypes from "prop-types";

// const Navbar = ({ setToken }) => {
//   const handleLogout = () => {
//     setToken("");
//   };

//   return (
//     <header className="bg-gradient-to-r from-green-800 to-green-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
//       {/* Left Section: Title */}
//       <div>
//         {/* <span className="text-sm md:text-base font-medium">Welcome, Admin</span> */}
//         <span className="text-base md:text-lg font-bold">
//           <span
//             style={{
//               color: "#90ee90", // Light green color
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//               fontSize: "1.5rem", // Increased font size
//               fontWeight: "bold",
//             }}
//           >
//             Welcome,
//           </span>{" "}
//           <span
//             style={{
//               color: "white",
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
//               fontSize: "1.5rem", // Increased font size
//               fontWeight: "bold",
//             }}
//           >
//             Admin
//           </span>
//         </span>
//       </div>

//       {/* Right Section: Welcome and Logout */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-md transition-all transform hover:scale-105"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// Navbar.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };


import PropTypes from "prop-types";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
  };

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-700 text-white h-16 flex items-center justify-between px-6 shadow-md">
      {/* Left Section: Title - Centered */}
      <div className="flex-grow text-center">
        <span className="text-base md:text-lg font-bold">
          <span
            style={{
              color: "#90ee90", // Light green color for "Welcome"
              textShadow: "2px 7px 4px rgba(0, 0, 0, 0.5)", // Shadow effect for better contrast
              fontSize: "2rem", // Increased font size
              fontWeight: "bold",
            }}
          >
            Greetings,
          </span>{" "}
          <span
            style={{
              color: "#ffffff", // White for "Admin" text
              textShadow: "2px 7px 4px rgba(0, 0, 0, 0.5)", // Shadow effect for contrast
              fontSize: "2rem", // Increased font size
              fontWeight: "bold",
            }}
          >
           Administrator
          </span>
        </span>
      </div>

      {/* Right Section: Logout Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-md transition-all transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};
