import { useContext, useRef, useState, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import {
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const BestSellerItems = () => {
  const { allPlants = [], backendUrl } = useContext(ProductContext);
  const { user, token } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
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
  }, [user, backendUrl, token]);

  const bestSellers = allPlants?.filter((plant) => plant.bestSeller) || [];
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
        toast[isWishlisted ? "info" : "success"](res.data.message);

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
    <motion.div
      className="p-8 bg-gradient-to-br from-green-100 to-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
        See What's Popular
      </h1>
      <div className="relative">
        <motion.button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 bg-white bg-opacity-80 backdrop-blur-lg text-green-700 rounded-full shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white z-10"
        >
          <FaChevronLeft className="text-2xl" />
        </motion.button>
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4"
          style={{
            scrollBehavior: "smooth",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {bestSellers.map((plant, index) => (
            <motion.div
              key={plant._id}
              className="inline-block relative bg-white bg-opacity-90 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              style={{ width: "240px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.button
                className="absolute top-3 right-3 text-green-600 text-xl z-10 hover:text-red-500 transition-all"
                whileTap={{ scale: 1.2 }}
                onClick={() => toggleWishlist(plant)}
              >
                {wishlist.some((item) => item.itemId === plant._id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-green-500 transition" />
                )}
              </motion.button>
              <ProductDetail product={plant} />
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 bg-white bg-opacity-80 backdrop-blur-lg text-green-700 rounded-full shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white z-10"
        >
          <FaChevronRight className="text-2xl" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BestSellerItems;
