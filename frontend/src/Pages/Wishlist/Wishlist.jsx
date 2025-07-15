import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // Wishlist Remove Icon
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { user, backendUrl, token } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from backend
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
  }, [user]);

  // Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/wishlist/remove`,
        { userId: user._id, itemId: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.info("Item removed from wishlist 🗑️");
        setWishlist((prev) => prev.filter((item) => item.itemId !== productId));
      }
    } catch {
      toast.error("Error removing item from wishlist");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          Floral Favorites💚
          </h2>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-green-500 text-lg">
                Your wishlist is empty!😢
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4205/4205142.png"
                alt="Empty Wishlist"
                className="w-40 mt-4 opacity-60"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.itemId}
                  className="relative bg-gray-50 p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
                >
                  <button
                    className="absolute top-3 right-3 text-[#438A4B] text-xl hover:text-[#2C6C35] transition"
                    onClick={() => removeFromWishlist(item.itemId)}
                  >
                    <FaHeart />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-md border border-gray-200"
                  />

                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-semibold text-md mt-2">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.itemId)}
                    className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-[#438A4B] rounded-md hover:bg-[#2C6C35] transition"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </>
  );
};

export default Wishlist;
