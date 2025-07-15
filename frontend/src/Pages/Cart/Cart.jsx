// import { useContext, useMemo } from "react";
// import { CartContext } from "../../Context/CartContext";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../../Components/Footer/Footer";
// import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
// import { Link } from "react-router-dom";
// import CartItems from "./CartItems";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart, updateCartItem } = useContext(CartContext);

//   const handleRemoveItem = (id, size) => {
//     removeFromCart(id, size);
//   };

//   const handleUpdateItem = (itemId, size, quantity) => {
//     updateCartItem(itemId, size, quantity);
//   };

//   // 🛠 Optimize total calculation
//   const totalPrice = useMemo(
//     () => cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0),
//     [cart]
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />
//       <div className="container mx-auto p-6 flex flex-col">
//         <h1
//           className="text-3xl font-bold mb-6"
//           style={{
//             color: "#006400",
//             textShadow: "3px 3px 6px rgba(0, 0, 0, 0.4)", // 🛠 Improved visibility
//           }}
//         >
//           Shopping Cart
//         </h1>

//         {cart.length > 0 ? (
//           <>
//             <div className="space-y-4">
//               {cart.map((item) => (
//                 <CartItems key={item.id || item._id} item={item} onRemove={handleRemoveItem} onUpdate={handleUpdateItem} />
//               ))}
//             </div>

//             <div className="mt-8 bg-white shadow-md rounded-lg p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
//               <div className="flex justify-between text-gray-600 mb-2">
//                 <span>Subtotal:</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600 mb-4">
//                 <span>Shipping:</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between text-gray-800 text-lg font-bold">
//                 <span>Total:</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
//                 <button
//                   onClick={clearCart}
//                   className="px-4 py-2 w-full md:w-auto text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Clear Cart
//                 </button>
//                 <Link
//                   to="/place-order"
//                   className="px-4 py-2 w-full md:w-auto text-white bg-[#438A4B] rounded-lg hover:bg-[#2C6C35] transition"
//                 >
//                   Proceed to Checkout
//                 </Link>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
//             <p className="text-gray-500 mb-6">Looks like you haven’t added anything to your cart yet.</p>
//             <Link
//               to="/collection"
//               className="px-4 py-2 text-white bg-[#438A4B] rounded-lg hover:bg-[#2C6C35] transition"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         )}
//       </div>
//       <FloatingButtons />
//       <Footer />
//     </div>
//   );
// };

// export default Cart;

import { useContext, useMemo } from "react";
import { CartContext } from "../../Context/CartContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartItem } =
    useContext(CartContext);

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  const handleUpdateItem = (itemId, size, quantity) => {
    updateCartItem(itemId, size, quantity);
  };

  // 🛠 Optimize total calculation
  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      ),
    [cart]
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h1
            className="text-3xl font-extrabold text-green-600 mb-6 text-center"
            style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)" }}
          >
            🛒EcoHeaven Mart
          </h1>

          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItems
                  key={item.id || item._id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdate={handleUpdateItem}
                />
              ))}
            </div>
          ) : (
            // Empty Cart Section
            <div className="text-center mb-6">
              {/* Empty Cart Image */}
              <img
                src="https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-58552.jpg"
                alt="Empty Cart"
                className="mx-auto mb-4 w-32 h-32 object-cover" // Adjust size of the image
              />

              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Your cart is Empty:(
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <Link
                to="/collection"
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
        {/* SUMMARY */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-extrabold text-green-600 mb-4 text-center">
          VerdantSnapshot
          </h2>
          {/* Quote Section */}
          <div className="text-center text-green-600 text-xl font-semibold mb-6">
            <p>
              “Just like plants need sunlight to grow, your dreams need
              GreenHeaven to bloom. 🌿💰”
            </p>
          </div>
          {/* Image */}

          <div className="w-4/5 md:w-3/5 mb-6">
            {" "}
            {/* Increased width from 3/4 to 4/5 on mobile and from 1/2 to 3/5 on larger screens */}
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/indoor-plants-for-mental-health-669e9bb4e8793.jpg?crop=0.673xw:1.00xh;0.322xw,0&resize=640:*"
              alt="Indoor Plants"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Items Count */}
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items</span>
            {cart.length}
          </div>
          {/* Green Line and Space after Items */}
          <div className="border-b-2 border-green-500 mb-4"></div>

          {/* Subtotal */}
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          {/* Green Line and Space after Subtotal */}
          <div className="border-b-2 border-green-500 mb-4"></div>

          {/* Shipping */}
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          {/* Green Line and Space after Shipping */}
          <div className="border-b-2 border-green-500 mb-4"></div>

          {/* Total */}
          <div className="flex justify-between text-gray-800 text-lg font-bold mb-6">
            <span className="text-green-600">Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          {/* Green Line and Space after Total */}
          <div className="border-b-2 border-green-500 mb-6"></div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 w-full md:w-auto text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
            <Link
              to="/place-order"
              className="px-4 py-2 w-full md:w-auto text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Cart;
