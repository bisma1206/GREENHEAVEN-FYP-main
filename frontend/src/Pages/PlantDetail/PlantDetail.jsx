import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const PlantDetail = ({ pathToPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};

  // Callback if no plant data is available
  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <p className="text-gray-500 text-lg">No plant data available.</p>
        <button
          onClick={() => navigate("/plantcare")}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <header className="bg-white shadow-md py-6">
          <h1 className="text-center text-3xl font-extrabold text-[#438A4B] drop-shadow-md">
            {plant.name}
          </h1>
        </header>

        {/* Card Section */}
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden flex flex-col sm:flex-row gap-6 p-6 transition-transform duration-300 hover:scale-[1.02]">
          {/* Image Section (Left) */}
          <img
            src={plant.image}
            alt={plant.name}
            className="w-64 h-64 object-cover rounded-lg shadow-md border-4 border-[#438A4B]"
          />

          {/* Details Section (Right) */}
          <div className="sm:w-2/3 flex flex-col justify-center space-y-4">
            <h2 className="text-4xl font-extrabold text-[#438A4B]">
              {plant.name}
            </h2>
            <p className="text-lg text-gray-800 font-semibold">
              Price:{" "}
              <span className="text-green-600 font-bold">${plant.price}</span>
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              {plant.description}
            </p>

            {/* Specifications */}
            <div className="bg-green-50 p-4 rounded-lg shadow-inner border-l-4 border-[#438A4B]">
              <h3 className="text-xl font-bold text-[#438A4B]">
                🌿 Specifications:
              </h3>
              <ul className="list-none mt-3 space-y-2 text-gray-700">
                <li>
                  ☀️ <strong>Sunlight:</strong> {plant.specifications.sunlight}
                </li>
                <li>
                  💧 <strong>Water:</strong> {plant.specifications.water}
                </li>
                <li>
                  🌱 <strong>Soil:</strong> {plant.specifications.soil}
                </li>
                <li>
                  📏 <strong>Height:</strong> {plant.specifications.height}
                </li>
                <li>
                  ⏳ <strong>Lifespan:</strong> {plant.specifications.lifespan}
                </li>
              </ul>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(pathToPage || "/plantcare")}
              className="mt-6 px-6 py-3 bg-[#438A4B] text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
              &larr; Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

PlantDetail.propTypes = {
  pathToPage: PropTypes.string.isRequired,
};

export default PlantDetail;
