import { useState, useEffect, useContext } from "react";
import { backendUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ExpenseContext } from "../../Context/ExpenseContext";

const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const { revenue } = useContext(ExpenseContext);
 

  useEffect(() => {
    fetchOrders();
    fetchUserCount();
  }, []);

  

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/order-count`); // Endpoint for order count
      if (response.status === 200) {
        setOrders(Number(response.data.orderCount)); // Setting the fetched order count to state
        console.log(response.data.orderCount); // Log to check if data is coming in
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(
        "Error fetching orders: " +
          (error?.response?.data?.error || error.message)
      );
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/user-count"
      );
      if (response.status === 200) {
        setUserCount(response.data.userCount); // Set the user count
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center overflow-x-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-lg">
        <h1 className="text-4xl font-extrabold text-green-800 mb-16 mt-5 text-center">
          PlantPro Control Panel
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Overview Cards */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 flex items-center gap-4">
            <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full">
              <img
                src="https://img.freepik.com/premium-vector/person-with-green-blue-logo-that-says-name_1076610-66914.jpg"
                alt="Users"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-3xl font-extrabold">{userCount}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 flex items-center gap-4">
            <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full">
              <img
                src="https://png.pngtree.com/background/20231031/original/pngtree-eco-friendly-shopping-cart-icon-in-3d-render-isolation-against-white-picture-image_5812683.jpg"
                alt="Orders"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Orders</h2>
              <p className="text-3xl font-extrabold">{orders}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 flex items-center gap-4">
            <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full">
              <img
                src="https://img.freepik.com/premium-photo/closeup-potted-plant-table_964463-1715.jpg?w=360"
                alt="Revenue"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Revenue</h2>
              <p className="text-3xl font-extrabold">${revenue}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Selling Products */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 backdrop-blur-md bg-opacity-60">
            <h2 className="text-2xl text-center font-extrabold text-green-800 mb-4">
              Most Selling Top Products!
            </h2>

            <div className="flex items-center mb-4">
              <img
                src="https://picture.lk/files/preview/960x1713/11711313452uqglh6tnqouvkdyvzjzhnzah68asf5k4ik01e5ru3fpgmbstbwqakovf1mekysq881tt9owkowia8g7wjiytzhvehnveknxk80dg.jpg"
                alt="Red Rose"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold p-2 text-green-800">Red Rose</p>
                <p className="text-gray-900 p-2 text-sm justify-text">
                  Red Rose is known for its beauty and symbolism of love. It is
                  often used in bouquets and decorative arrangements.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <img
                src="https://i.pinimg.com/736x/53/b8/ff/53b8ff5238b68e410dbfd150d3fdd754.jpg"
                alt="Tulip"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold p-2 text-green-800">Tulip</p>
                <p className="text-gray-900 p-2 text-sm justify-text">
                  Tulips are spring-blooming flowers known for their vibrant
                  colors and smooth petals. They make an ideal gift for any
                  occasion.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <img
                src="https://img.freepik.com/premium-photo/floral-background-white-terry-jasmine-flower-petals-macro-flowers-backdrop-holiday-design_459897-4553.jpg?w=360"
                alt="Jasmine"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold p-2 text-green-800">Jasmine</p>
                <p className="text-gray-900 p-2 text-sm justify-text">
                  Jasmine flowers are popular for their fragrant aroma and are
                  commonly used in perfumes and traditional medicine.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <img
                src="https://www.ikea.com/nl/en/images/products/aloe-vera-potted-plant-aloe__1368841_pe957973_s5.jpg?f=s"
                alt="Aloe Vera"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold p-2 text-green-800">AloeVera</p>
                <p className="text-gray-900 p-2 text-sm justify-text">
                  Aloe Vera is a popular succulent used for its healing
                  properties. It’s commonly used in skincare and health
                  remedies.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJxZvRq8QVqH3f1y3ZLDbiwv-LlmG7RS0Pg&s"
                alt="Sunflower"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold p-2 text-green-800">Sunflower</p>
                <p className="text-gray-900 p-2 text-sm justify-text">
                  Sunflowers are large and bright flowers that symbolize
                  happiness and positivity. They are widely known for their
                  cheerful appearance.
                </p>
              </div>
            </div>
            <p className="text-gray-900 text-sm text-justify">
              Green Heaven's most selling products are carefully curated to meet
              the needs of our customers. Our collection includes vibrant
              flowers like the Red Rose, Tulip, and Jasmine, each known for
              their unique beauty and fragrance. We also offer plants like Aloe
              Vera and Sunflower, which are not only visually appealing but also
              offer health benefits. These plants are perfect for anyone looking
              to add natural beauty and wellness to their space.
            </p>
          </div>

          {/* Video Section */}
          <div className="shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 backdrop-blur-md bg-opacity-60">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Watch the Latest Promotional Video for Our GreenHeaven Products🌿
            </h2>
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0">
                <video
                  width="400rem"
                  controls
                  muted
                  className="rounded-lg"
                  style={{ border: "4px solid #4caf50" }}
                >
                  <source src="/my.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg p-8 text-center shadow-md mt-12">
          <p className="text-sm font-bold">
            &copy; 2024 Green Heaven Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
