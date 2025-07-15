import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";

import axios from "axios";

const MyOrders = () => {
  const { backendUrl, token } = useContext(CartContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderData(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')", // Background image URL
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-5xl w-full py-8 px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-8 text-center shadow-sm">
            VerdantOrder Tracking 🌿
          </h1>
          {orderData.length > 0 ? (
            <div className="space-y-8">
              {orderData.map((order, index) => (
                <div
                  key={index}
                  className={`bg-white border border-green-400 shadow-xl rounded-lg p-6 flex flex-col gap-4 relative backdrop-blur-sm bg-opacity-30 ${
                    index === 0 ? "border-green-500" : ""
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-2 rounded-t-lg ${
                      index === 0 ? "bg-green-500" : "bg-green-500"
                    }`}
                  />

                  {/* Order Summary */}
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                      {/* Unique Order Name */}
                      <p className="relative top-1 left-2 font-bold text-green-700 bg-green-300 px-3 py-1 rounded-full shadow-md mb-3">
                        Order #{index + 1}
                      </p>
                      <p className="text-sm font-bold text-gray-600">
                        Placed on: {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-bold text-gray-600">
                        Payment: {order.paymentMethod}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {order.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">
                        Total: $ {order.amount}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-green-300 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-green-50 rounded-lg p-4 shadow-md hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <img
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover border border-gray-200 rounded"
                        />
                        <div className="ml-4">
                          <p className="font-semibold text-green-800">
                            {item.name}
                          </p>
                          <p className="text-sm font-bold text-gray-600">
                            Size: {item.size}
                          </p>
                          <p className="text-sm font-bold text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-bold text-gray-800">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Track Order Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={loadOrderData}
                      className="px-6 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 shadow-md"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-lg font-bold text-green-800">
                No Orders Yet🛒
              </h2>
              <p className="text-gray-600 mt-2">
                You haven't made any purchases so far. Start browsing and shop today!🌱
              </p>
              <button className="mt-4 px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700">
                Order Now
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default MyOrders;
