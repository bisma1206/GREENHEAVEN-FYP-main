import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import Footer from "../../Components/Footer/Footer";
import StarRating from "../../Components/StarRating/StarRating";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import { CartContext } from "../../Context/CartContext";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = () => {
  const { productID } = useParams();
  const { allPlants } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user, backendUrl, token } = useContext(UserContext);

  const [productdata, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (allPlants && allPlants.length > 0) {
      const product = allPlants.find((item) => item._id === productID);
      if (product) {
        setProductData(product);
        setImage(product.image);
      }
    }
  }, [productID, allPlants]);

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

  const handleAddToCart = () => {
    if (productdata) {
      const item = {
        id: productdata._id,
        size,
        quantity,
        name: productdata.name,
        price: productdata.price,
        image,
      };
      addToCart(item);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Please log in to use wishlist!");
      return;
    }

    const isWishlisted = wishlist.some(
      (item) => item.itemId === productdata._id
    );

    try {
      const res = await axios.post(
        `${backendUrl}/api/wishlist/${isWishlisted ? "remove" : "add"}`,
        {
          userId: user._id,
          itemId: productdata._id,
          name: productdata.name,
          price: productdata.price,
          image: productdata.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setWishlist((prev) =>
          isWishlisted
            ? prev.filter((item) => item.itemId !== productdata._id)
            : [...prev, productdata]
        );
      }
    } catch {
      toast.error("Error updating wishlist");
    }
  };

  if (!allPlants || allPlants.length === 0) {
    return <div>Loading...</div>;
  }

  if (!productdata) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={image}
            alt={productdata.name}
            className="object-cover w-80 h-80 md:w-96 md:h-96 mx-auto my-4 rounded-lg"
          />

          <div className="w-full md:w-1/2 p-6 md:p-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              {productdata.name}
            </h2>

            <p className="text-3xl font-bold text-[#438A4B] mb-6">
              ${productdata.price}
            </p>

            <p>
              <i className="text-gray-500">Wanna rate our product</i>
            </p>
            <StarRating
              maxRating={5}
              color="#438A4B"
              size="23px"
              rating={rating}
              setRating={setRating}
            />

            <p className="text-lg text-gray-600 mb-6">
              {productdata.description}
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Size:
              </label>
              <select
                className="border rounded-md px-3 py-2 w-full"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#438A4B] text-white px-6 py-2 rounded-lg hover:bg-[#2C6C35]"
              >
                Add to Cart
              </button>

              <button
                onClick={toggleWishlist}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                {wishlist.some((item) => item.itemId === productdata._id) ? (
                  <>
                    <FaHeart className="text-red-400" /> Wishlisted
                  </>
                ) : (
                  <>
                    <FaRegHeart className="text-white" /> Add to Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 text-center border-t pt-6">
          <div>
            <span className="text-3xl">☀️</span>
            <h4 className="font-bold">Sunlight</h4>
            <p className="text-gray-600">
              {productdata.specifications.sunlight}
            </p>
          </div>
          <div>
            <span className="text-3xl">💧</span>
            <h4 className="font-bold">Water</h4>
            <p className="text-gray-600">{productdata.specifications.water}</p>
          </div>
          <div>
            <span className="text-3xl">🌱</span>
            <h4 className="font-bold">Soil</h4>
            <p className="text-gray-600">{productdata.specifications.soil}</p>
          </div>
          <div>
            <span className="text-3xl">📏</span>
            <h4 className="font-bold">Height</h4>
            <p className="text-gray-600">{productdata.specifications.height}</p>
          </div>
        </div>

        <RelatedProducts currentProduct={productdata} allProducts={allPlants} />
      </div>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Product;
