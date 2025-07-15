import {
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-12 relative">
      {/* Wavy Line at the Bottom (visible only on large screens) */}
      <div className="absolute bottom-0 w-full overflow-hidden lg:block hidden">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1442 180" 
          preserveAspectRatio="none"
        >
         <defs>
  <linearGradient id="greenWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    {/* Richer green with subtle white shade */}
    <stop offset="0%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} /> {/* Darker green */}
    <stop offset="100%" style={{ stopColor: "#F1F1F1", stopOpacity: 0.7 }} /> {/* Subtle white */}
  </linearGradient>
</defs>
<path
  fill="url(#greenWhiteGradient)"
            d="M0,128L48,128C96,128,192,128,288,112C384,96,480,64,576,74.7C672,85,768,128,864,128C960,128,1056,96,1152,90.7C1248,85,1344,128,1392,128C1440,128,1440,180,1392,180H0Z"  
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8 relative z-10">
        {/* Left Section: Logo and About */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <span className="text-green-800 font-extrabold uppercase text-lg md:text-xl mr-2 drop-shadow-lg">
              GREEN
            </span>
            <span className="text-green-800 font-extrabold uppercase text-lg md:text-xl drop-shadow-lg">
              HEAVEN
            </span>
          </h1>
          <p className="text-sm font-bold">
            Green Heaven is dedicated to bringing greenery and sustainable
            solutions to every home. Let us help you make your space greener and
            your life healthier.
          </p>
        </div>

        {/* Middle Section: Company Links */}
        <div>
          <h2 className="text-green-800 font-extrabold mb-4">Company</h2>
          <ul className="space-y-2 text-sm font-bold">
            <li className="flex items-center gap-2">
              <FaHome className=" text-xl text-[#438A4B]" />
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaInfoCircle className=" text-xl text-[#438A4B]" />
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className=" text-xl text-[#438A4B]" />
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaShieldAlt className=" text-xl text-[#438A4B]" />
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Get in Touch */}
        <div>
          <h2 className="text-green-800 font-extrabold mb-4">Get in Touch</h2>
          <ul className="space-y-2 text-sm font-bold">
            <li className="flex items-center gap-2">
              <FaPhone className=" text-xl text-[#438A4B]" /> +1-000-000-0000
            </li>
            <li className="flex font-extrabold items-center gap-2">
              <FaEnvelope className=" text-xl text-green-800" />
              <a
                href="mailto:greenheaven@gmail.com"
                className="hover:underline"
              >
                greenheaven061@gmail.com
              </a>
            </li>
            <li className="flex font-extrabold items-center gap-2">
              <FaInstagram className="text-green-800 text-xl" />
              <a href="https://www.instagram.com" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#438A4B] text-white text-center mt-8 py-3 md:hidden">
        <p className="text-xs font-semibold">
          © 2024 GREEN HEAVEN - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
