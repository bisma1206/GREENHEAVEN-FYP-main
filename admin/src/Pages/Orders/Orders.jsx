// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { ExpenseContext } from "../../Context/ExpenseContext";

// const Orders = ({ token }) => {

//   const [orders, setOrders] = useState([]);

//   const { fetchExpenses } = useContext(ExpenseContext);

//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/list",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus, orderAmount) => {
//     try {
//       console.log(orderId, newStatus);
//       const response = await axios.post(
//         backendUrl + "/api/order/status",
//         { orderId, status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } } // ✅ Ensure correct header format
//       );
  
//       if (response.data.success) {
//         if (newStatus === "Delivered") {
//           await axios.post(
//             `${backendUrl}/api/expenses/add`,
//             {
//               text: `Earning from Order ${orderId}`,
//               amount: orderAmount,
//               type: "earned",
//             },
//             { headers: { Authorization: `Bearer ${token}` } } // ✅ Ensure correct header format
//           );
//           toast.success("Earnings added!");
//           fetchExpenses(); // ✅ Refresh expenses
//         }
//         await fetchAllOrders();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
  
//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         Order Management
//       </h1>

//       {orders.length > 0 ? (
//         <div className="space-y-6">
//           {orders.map((order, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg p-6 border border-gray-300 flex flex-col gap-4"
//             >
//               {/* Client Name */}
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {order.address.firstName} {order.address.lastName}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Order #{index + 1} |{" "}
//                   {new Date(order.date).toLocaleDateString()}
//                 </p>
//               </div>

//               {/* Order Items */}
//               <div>
//                 {order.items.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-4 border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
//                   >
//                     <img
//                       src={item.image || "/placeholder.jpg"}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded-md border"
//                     />
//                     <div>
//                       <p className="text-gray-700 font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         Quantity: {item.quantity} | Size: {item.size}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Shipping Address */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-600">
//                   Shipping Address:
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {order.address.street}, {order.address.city},{" "}
//                   {order.address.state}, {order.address.zipcode}
//                 </p>
//                 <p className="text-sm text-gray-500">{order.address.phone}</p>
//               </div>

//               {/* Order Summary */}
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-800 font-semibold">
//                   Total: $ {order.amount}
//                 </p>
//                 <select
//                   className="px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={order.status}
//                   onChange={(e) =>
//                     updateOrderStatus(order._id, e.target.value, order.amount)
//                   }
//                 >
//                   <option value="Order Placed">Order Placed</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-8">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ExpenseContext } from "../../Context/ExpenseContext";
import { motion } from "framer-motion"; // Import Framer Motion

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { fetchExpenses } = useContext(ExpenseContext);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, orderAmount) => {
    try {
      console.log(orderId, newStatus);
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        if (newStatus === "Delivered") {
          await axios.post(
            `${backendUrl}/api/expenses/add`,
            {
              text: `Earning from Order ${orderId}`,
              amount: orderAmount,
              type: "earned",
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          toast.success("Earnings added!");
          fetchExpenses();
        }
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div
      className="p-6 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-green-800">
          🍃GreenSprout Orders
        </h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={index}
                className="shadow-lg rounded-lg p-6 border border-green-600 flex flex-col gap-4"
                whileHover={{ scale: 1.05 }} // Add hover effect to scale the card
                transition={{ duration: 0.3 }}
              >
                {/* Client Name */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-extrabold text-gray-900">
                    {order.address.firstName} {order.address.lastName}
                  </h2>
                  <p className="text-lg font-extrabold text-gray-900">
                    Order #{index + 1} |{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                    >
                      <motion.img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                        whileHover={{ scale: 1.5 }} // Add hover effect to image
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <p className="text-green-900 font-extrabold">{item.name}</p>
                        <p className="text-sm font-bold text-gray-900">
                          Quantity: {item.quantity} | Size: {item.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Shipping Address:
                  </h3>
                  <p className="text-sm text-gray-800">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-800">{order.address.phone}</p>
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 text-lg font-bold">
                    Total: $ {order.amount}
                  </p>
                  <select
                    className="px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value, order.amount)
                    }
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center font-bold text-gray-900 mt-8">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;

