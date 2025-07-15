import React from "react";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden relative z-0">
        {/* Hero Section */}
        <section
          className="relative text-white text-center h-[75vh] w-full flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://wallpapers.com/images/hd/green-flower-background-ze00991e4unypoys.jpg')",
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)", // Cut effect at the bottom
          }}
        >
          {/* Reduce overlay opacity */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Increase z-index of text */}
          <div className="relative z-20 text-center">
            <h1 className="text-4xl font-bold opacity-100 transition-opacity duration-1000">
            About Our Green <span className="text-green-500 drop-shadow-lg">Heaven</span> 
            </h1>
            <p className="mt-4 text-lg opacity-100 transition-opacity duration-1000">
              Where nature meets passion and sustainability thrives.
            </p>
          </div>
        </section>
        {/* Company Story Section */}
        <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-12 px-4 sm:px-8 transition-all duration-700 ease-in-out transform hover:scale-105">
          {/* Text Content */}
          <div className="w-full md:w-1/2 md:pr-8 animate-slide-in-left">
            <h2 className="text-3xl font-bold text-green-800">
              Established in 2025, Green Heaven is a sanctuary for plant lovers
              and sustainability enthusiasts.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-justify">
              From a simple idea to create a greener world, Green Heaven has
              flourished into a thriving community that inspires individuals to
              reconnect with nature. Our mission is to transform living spaces
              into lush, vibrant environments while fostering an appreciation
              for sustainability. Through innovation, quality, and a commitment
              to environmental responsibility, we continue to grow and bring
              nature closer to people’s lives. Join us in cultivating a world
              where greenery and well-being coexist harmoniously.
            </p>
          </div>
          {/* Images with Overlay Effect */}
          <div className="w-full md:w-1/2 flex flex-col items-center relative animate-slide-in-right">
            <img
              src="https://media.istockphoto.com/id/673479008/photo/young-plant.jpg?s=612x612&w=0&k=20&c=5KubqbciZ--IZ5VzoDCVwMRxVNAkqHYyqDwlNuX84m4="
              alt="Gardening Work"
              className="w-48 h-48 object-cover rounded-lg shadow-lg absolute top-10 left-10 transform rotate-6 border-4 border-white hover:scale-110 transition-transform duration-700"
            />
            <img
              src="https://images.stockcake.com/public/5/c/3/5c3ec60f-5588-47d4-9d6c-9e64b5b318a9_large/generations-planting-together-stockcake.jpg"
              alt="Gardening Woman"
              className="w-56 h-56 object-cover rounded-lg shadow-lg relative z-10 border-4 border-white hover:scale-110 transition-transform duration-700"
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-4 sm:px-8 bg-green-50 rounded-lg shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-green-800">
            What Our Happy Clients Say
          </h2>
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-lg shadow-xl bg-white border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-700">
              <p className="text-gray-600 italic">
                “Green Heaven has truly transformed my garden into a paradise.
                Their expertise and support have been invaluable!”
              </p>
              <div className="mt-4 flex items-center">
                <img
                  src="https://img.freepik.com/premium-photo/beautiful-animated-garden-animated-young-small-beautiful-girl-is-plucking-flower_531533-1639.jpg?w=360"
                  alt="Client Photo"
                  className="w-12 h-12 rounded-full border-2 border-green-500"
                />
                <div className="ml-4">
                  <h4 className="text-base font-bold text-green-800">
                    Isabella Martinez
                  </h4>
                  <p className="text-sm text-gray-500">
                    Eco-Friendly Homeowner
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="p-6 rounded-lg shadow-xl bg-white border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-700">
              <p className="text-gray-600 italic">
                “Their guidance and high-quality plants have made my journey as
                a beginner gardener an absolute joy!”
              </p>
              <div className="mt-4 flex items-center">
                <img
                  src="https://img.freepik.com/premium-photo/two-young-girls-are-gardening-backyard-they-are-planting-flowers-garden-girls-are-wearing-casual-clothes-are-both-smiling_14117-496870.jpg"
                  alt="Client Photo"
                  className="w-12 h-12 rounded-full border-2 border-green-500"
                />
                <div className="ml-4">
                  <h4 className="text-base font-bold text-green-800">
                    Liam Anderson
                  </h4>
                  <p className="text-sm text-gray-500">Beginner Gardener</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default About;