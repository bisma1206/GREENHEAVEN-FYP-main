import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineHeart,
} from "react-icons/hi2";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { CartContext } from "../../Context/CartContext";
import { ProductContext } from "../../Context/ProductContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { token, setToken } = useContext(ProductContext);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const logout = () => {
    navigate("/landing");
    localStorage.removeItem("token");
    setToken("");
    setCart([]); // Consider persisting cart for guest users
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
      <div className="text-white relative z-20">
        <div className="h-16 bg-[#0b5a2a] shadow-md flex items-center px-4 justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/Black_and_Green_Typographical_Green_Energy_Logo__7_-removebg-preview.png"
              alt="Green Heaven Logo"
              className="h-28  w-auto object-contain"

            />
          </Link>
    
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 flex-grow justify-center">
            {[
              { path: "/", label: "Home", Icon: HiOutlineHome },
              { path: "/collection", label: "Collection", Icon: HiOutlineCalendarDays },
              { path: "/about", label: "About Us", Icon: HiOutlineHomeModern },
              { path: "/contact", label: "Contact", Icon: HiOutlineUsers },
            ].map(({ path, label, Icon }) => (
              <NavLink
                key={path}
                to={path}
                className="flex items-center gap-2 text-lg font-bold transition hover:text-green-300"
              >
                <Icon className="w-6 h-6" />
                {label}
              </NavLink>
            ))}
          </nav>
    
          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Help Dropdown */}
            <div className="relative dropdown-container z-30">
              <button
                onClick={() => toggleDropdown("help")}
                className="flex items-center gap-1 cursor-pointer"
                aria-label="Help menu"
              >
                <HiOutlineQuestionMarkCircle className="w-6 h-6 hover:text-green-300" />
                <HiOutlineChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "help" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "help" && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-40">
                  <ul className="p-2">
                    <li className="hover:bg-gray-100 rounded-md">
                      <NavLink
                        to="/faqs"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-gray-600 hover:text-green-600"
                      >
                        FAQs
                      </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md">
                      <NavLink
                        to="/shipping"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-gray-600 hover:text-green-600"
                      >
                        Shipping Info
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
    
            {/* Profile Dropdown */}
            <div className="relative dropdown-container z-30">
              {token ? (
                <button
                  onClick={() => toggleDropdown("profile")}
                  className="flex items-center gap-1 cursor-pointer"
                  aria-label="Profile menu"
                >
                  <HiOutlineUser className="w-6 h-6 hover:text-green-300" />
                  <HiOutlineChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "profile" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link to="/login">
                  <HiOutlineUser className="w-6 h-6 hover:text-green-300" />
                </Link>
              )}
    
              {activeDropdown === "profile" && token && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-40">
                  <ul className="p-2">
                    <li className="hover:bg-gray-100 rounded-md">
                      <NavLink
                        to="/profile"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-gray-600 hover:text-green-600"
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md">
                      <NavLink
                        to="/wishlist"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-gray-600 hover:text-green-600 flex items-center gap-2"
                      >
                        Wishlist <HiOutlineHeart className="w-4 h-4 text-red-500" />
                      </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md">
                      <NavLink
                        to="/userorders"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-gray-600 hover:text-green-600"
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:text-green-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
    
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <HiOutlineShoppingCart className="w-6 h-6 hover:text-green-300" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold text-white bg-green-700 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
    
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
    
        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#064420] p-4 z-40">
            {[
              { path: "/", label: "Home" },
              { path: "/collection", label: "Collection" },
              { path: "/about", label: "About Us" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className="block text-white text-lg font-bold py-2"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

export default Navbar;
