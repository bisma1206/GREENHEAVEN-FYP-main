import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const PlantCare = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { allPlants } = useContext(ProductContext); // Access products from context

  // Filter plants based on the search term
  const filteredPlants = allPlants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-50 pb-10 relative">
        {/* Hero Section */}
        <header className="relative flex flex-col sm:flex-row justify-between items-center h-[75vh]">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)", // Apply clip-path here
            }}
          >
            <source src="/flowers.mp4" type="video/mp4" />
          </video>
          {/* Text Section */}
          <div className="w-full text-left text-white px-8 relative z-10">
            <h1 className="text-6xl text-center font-bold text-white-900 drop-shadow-lg">
              EcoGrowth Guide
            </h1>
            <p className="mt-4 text-lg text-center text-white-900 drop-shadow-md">
              Caring for plants is a pleasant activity that can turn into a real
              hobby.
            </p>
          </div>
        </header>

        {/* Plant Guides Section */}
        <section className="py-10 px-6">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            EcoGrowth Guide
          </h2>
          {/* Search Bar Below Paragraph */}
          <div className="w-full py-0 px-2 mb-8">
            <div className="max-w-xl text-left">
              {" "}
              {/* Changed to text-right for right alignment */}
              <input
                type="text"
                placeholder="Search for a plant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-2/3 py-1 px-2 rounded text-gray-700 focus:outline-none shadow-md mb-1 border-2 border-green-300" // Adjusted padding and width
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <div
                  key={plant._id} // Use unique ID from product
                  onClick={() =>
                    navigate(`/plantguide/${plant.name}`, { state: { plant } })
                  }
                  className="bg-green shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-full h-60 flex justify-center items-center">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-green-800">
                      {plant.name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No plants found matching your search.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
      {/* Floating Buttons */}
      <FloatingButtons />
    </>
  );
};

export default PlantCare;
