import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlinePlusCircle,
  HiOutlineStar,
  HiOutlineChartBar,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Automatically switch between collapsed and expanded modes based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false); // Expanded on larger screens
      } else {
        setIsCollapsed(true); // Collapsed on smaller screens
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`bg-green-800 h-auto text-white shadow-md flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between px-4"
        } h-16 border-b border-green-300`}
      >
        {!isCollapsed ? (
          <>
            <span className="text-lg md:text-xl font-extrabold tracking-wide">
              <span
                style={{
                  color: "white",
                  textShadow: "2px 7px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                GREEN
              </span>
              <span
                style={{
                  color: "#90ee90", // Light green color
                  textShadow: "2px 7px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                HEAVEN
              </span>
            </span>
          </>
        ) : (
          <img
            src="/images.png" // Replace with your logo path
            alt="Green Heaven Logo"
            className="w-10 h-10"
          />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlineHome className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Dashboard</span>
          )}
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlinePlusCircle className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Add Items</span>
          )}
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlineClipboardList className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">List Items</span>
          )}
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlineShoppingCart className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Orders</span>
          )}
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlineChartBar className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Expense</span>
          )}
        </NavLink>

        {/* Adding the Reviews and Report Links */}
        <NavLink
          to="/feedbacks"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlineStar className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Reviews</span>
          )}
        </NavLink>

        <NavLink
          to="/report"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all ${
              isActive
                ? "bg-green-700 text-white shadow-lg"
                : "hover:bg-green-800"
            } ${isCollapsed ? "justify-center" : ""}`
          }
        >
          <HiOutlinePencilAlt className="w-6 md:w-7 lg:w-8" />
          {!isCollapsed && (
            <span className="text-lg md:text-base font-extrabold">Report</span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
