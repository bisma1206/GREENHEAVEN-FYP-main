import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa"; // Wishlist & Search Icons
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ProductDetail from "../ProductDetail/ProductDetail";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext"; // User Context for wishlist
import { toast } from "react-toastify";
import axios from "axios";

function Collection() {
  const { user, backendUrl, token } = useContext(UserContext);
  const { allPlants } = useContext(ProductContext);

  const backgroundImages = [
    "https://i.pinimg.com/originals/c1/63/b2/c163b26302904d88c328997eb4c5e99d.jpg",
    "https://i.pinimg.com/originals/81/65/ac/8165ac1865eae415d986c1aa540e37d1.jpg",
    "https://i.pinimg.com/originals/c9/0d/ef/c90def4e8d6995aa1e6b9c5c6633f94f.jpg",
    "https://i.pinimg.com/originals/85/d9/7a/85d97a6103c02f5809f9e25889e9273d.jpg",
    "https://i.pinimg.com/originals/fb/d9/e4/fbd9e4002f477dee065d2cb87ca37bdb.jpg",
    "https://i.pinimg.com/originals/35/f0/b0/35f0b06838809c4466d4950121422ed4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);

  // Fetch Wishlist from Backend when user logs in
  useEffect(() => {
    if (user && token) {
      axios
        .get(`${backendUrl}/api/wishlist/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setWishlist(res.data.wishlist);
          }
        })
        .catch(() => toast.error("Error fetching wishlist"));
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const categories = [...new Set(allPlants.map((plant) => plant.category))];
  const filteredPlants = allPlants.filter(
    (plant) =>
      (selectedCategory === "" || plant.category === selectedCategory) &&
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle Wishlist Function
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please log in to use wishlist!");
      return;
    }

    const isWishlisted = wishlist.some((item) => item.itemId === product._id);

    try {
      const res = await axios.post(
        `${backendUrl}/api/wishlist/${isWishlisted ? "remove" : "add"}`,
        {
          userId: user._id,
          itemId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setWishlist((prev) =>
          isWishlisted
            ? prev.filter((item) => item.itemId !== product._id)
            : [...prev, product]
        );
      }
    } catch {
      toast.error("Error updating wishlist");
    }
  };

  return (
    <>
      <Navbar />

      {/* 🌿 Hero Section */}
      <div
        className="relative flex items-center justify-center h-[86vh] bg-cover bg-center transition-all duration-1000 z-0"
        style={{
          backgroundImage: `url('${backgroundImages[currentImage]}')`,
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-2xl text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg animate-fadeInScale">
            Bring Nature Into Your Home 🌿
          </h2>
          <p className="text-lg sm:text-xl mt-4 drop-shadow-md leading-relaxed animate-fadeInScale">
            Experience the harmony of nature and elegance with our handpicked
            collection.
          </p>
        </div>
      </div>

      {/* 🛍️ Filters & Search Section */}
      <div className="relative bg-white shadow-md p-5 flex items-center justify-between overflow-hidden">
        {/* Filters on the left */}
        <div className="flex items-center gap-3">
          <button
            className="block lg:hidden px-4 py-2 bg-green-700 text-white rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Close Filters" : "Show Filters"}
          </button>

          <div
            className={`flex flex-wrap gap-2 transition-transform transform ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <button
              className={`text-sm lg:text-base px-3 lg:px-4 py-2 border ${
                selectedCategory === ""
                  ? "bg-[#438A4B] text-white"
                  : "border-[#438A4B] text-green-700 hover:bg-green-700 hover:text-white"
              } rounded-md transition`}
              onClick={() => setSelectedCategory("")}
            >
              All Plants
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`text-sm lg:text-base px-3 lg:px-4 py-2 border ${
                  selectedCategory === category
                    ? "bg-[#438A4B] text-white"
                    : "border-[#438A4B] text-green-700 hover:bg-green-700 hover:text-white"
                } rounded-md transition`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar on the right */}
        <form className="flex items-center border border-[#438A4B] rounded-md px-3 py-1 w-full max-w-xs lg:max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-gray-700 px-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-green-700" />
        </form>
      </div>

      {/*Product Grid Section */}
      <section className="relative z-0 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 bg-gray-100">
        {filteredPlants.map((product) => (
          <div key={product._id} className="relative group">
            <button
              className="absolute top-3 right-3 text-[#438A4B] text-xl z-10"
              onClick={() => toggleWishlist(product)}
            >
              {wishlist.some((item) => item.itemId === product._id) ? (
                <FaHeart className="text-[#438A4B]" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-[#2C6C35] transition" />
              )}
            </button>
            <ProductDetail product={product} />
          </div>
        ))}
      </section>

      <FloatingButtons />
      <Footer />

      {/* 🌿 Media Queries for responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Make the filter section show as a dropdown on mobile */
          .translate-x-0 {
            transform: translateX(0) !important;
          }

          .-translate-x-full {
            transform: translateX(-100%) !important;
          }

          .lg\\:translate-x-0 {
            transform: translateX(0) !important;
          }

          /* Styling for the "Show Filters" button for mobile view */
          .block.lg\\:hidden {
            display: block;
          }
          .hidden.lg\\:block {
            display: none !important;
          }

          /* Prevent extra space on mobile */
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </>
  );
}

export default Collection;
