import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import ExchangePolicy from "../../Components/ExchangePolicy/ExchangePolicy";
import BestSellerItems from "../../Components/BestSellerItems/BestSellerItems";

const Home = () => {
  const { allPlants, refreshProducts } = useContext(ProductContext);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const navigate = useNavigate();

  if (!allPlants || allPlants.length === 0) {
    return <div>Loading...</div>;
  }

  // Get unique categories
  const categories = [...new Set(allPlants.map((product) => product.category))];

  const handleCategoryClick = (category) => {
    navigate(`/collection`, { state: { category } });
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-[86vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/c9/0d/ef/c90def4e8d6995aa1e6b9c5c6633f94f.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 p-12 rounded-[2.5rem] backdrop-blur-xl bg-white bg-opacity-20 shadow-2xl max-w-2xl text-center flex flex-col items-center justify-center border border-white border-opacity-30">
          <h2 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg tracking-wide">
            Embrace Nature’s Charm
          </h2>
          <p className="text-white text-md sm:text-lg mt-2 drop-shadow-md leading-relaxed">
            Let your home bloom with elegance and greenery.
          </p>
          <button
            className="mt-4 px-4 sm:px-6 py-2 bg-[#438A4B] text-white rounded-lg hover:bg-[#2C6C35] transition"
            onClick={() => navigate("/collection")}
          >
            SHOP THE COLLECTION
          </button>
        </div>
      </div>

      {/* Search Bar + Plant Categories */}
      <div className="py-10 px-6" style={{ backgroundColor: "#e8f5e9" }}>
        <h2 className="text-center text-2xl font-bold mb-6">
          <span
            className="text-green-900"
            style={{ fontSize: "1.5rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)" }}
          >
            Find Plants
          </span>{" "}
          <span
            className="text-[#4E9A57]"
            style={{ fontSize: "1.5rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)" }}
          >
            You’ll Love
          </span>
        </h2>

        {/* Display Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="flex flex-col items-center text-center cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-500 shadow-lg group-hover:border-green-700 transition-all">
                <img
                  src={allPlants.find((product) => product.category === category)?.image}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-green-700 group-hover:text-green-800 transition">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Images Section */}
      <div className="py-12 px-6 flex flex-wrap justify-center gap-8 bg-[#e8f5e9]">
        {["flower pot.jpg", "Garland.jpg", "water.jpg"].map((src, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-xs">
            <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-t-[50%] rounded-tr-[50%] bg-[#d3c2b6] flex items-center justify-center">
              <img src={src} alt="Plant Image" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            <p className="mt-4 text-gray-700 text-lg">
              {index === 0 && "Bring freshness to your home with vibrant green plants."}
              {index === 1 && "A touch of green, a breath of fresh air."}
              {index === 2 && "Enhance your space with elegant and stylish plants."}
            </p>
          </div>
        ))}
      </div>

      <BestSellerItems />

      {/* Explore More Section */}
      <div className="py-12 px-6 flex flex-col md:flex-row items-center bg-[#e8f5e9] relative overflow-hidden">
      <div className="md:w-1/2 text-center px-6">
      {/* Heading with Nature Theme */}
      <h1 className="text-3xl font-bold text-[#438A4B] leading-tight">
        Nurture Your Plants, Let Them Thrive
      </h1>

      {/* Descriptive Text with Soft Color */}
      <p className="mt-4 text-gray-700 text-lg">
        Caring for plants is an art. With the right knowledge and guidance, 
        your greens can flourish and bring life to your space. Learn the best 
        ways to nurture and maintain your plants effortlessly.
      </p>

      {/* Stylish Button with Hover Animation */}
      <NavLink
        to="/plantguide"
        className="inline-block mt-6 px-6 py-3 text-white font-semibold bg-green-800 rounded-lg shadow-md 
        hover:bg-green-500 transition duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10">Learn Plant Care</span>

        {/* Button Hover Effect */}
        <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300"></span>
      </NavLink>
      </div>

        {/* Image Container */}
        <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
          <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-tl-[50%] rounded-tr-[50%] bg-[#d3c2b6] flex items-center justify-center">
            <img 
              src="caring.jpg" 
              alt="Dried Flowers" 
              className="w-full h-full object-cover scale-105 transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      </div>


      <ExchangePolicy />
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default Home;