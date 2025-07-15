// import { useContext, useState } from "react";
// import { CartContext } from "../../context/CartContext";
// import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
// import Footer from "../../Components/Footer/Footer";
// import Navbar from "../../Components/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../../Context/ProductContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const navigate = useNavigate();

//   const { cart, backendUrl, token, setCart } = useContext(CartContext);

//   // Payment method state
//   const [Method, setMethod] = useState("COD");

//   // Calculate subtotal, shipping fee, and total
//   const calculateSubtotal = () =>
//     cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shippingFee = 50;
//   const totalAmount = calculateSubtotal() + shippingFee;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   const validateForm = () => {
//     for (const key in formData) {
//       if (!formData[key].trim()) {
//         toast.error(
//           `Please fill in the ${key.replace(/([A-Z])/g, " $1")} field!`
//         );
//         return false;
//       }
//     }
//     return true;
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault(); // Prevent page refresh on form submission

//     if (!validateForm()) return;

//     try {
//       const orderItems = cart.map((item) => ({
//         productId: item._id || item.id,
//         name: item.name,
//         size: item.size,
//         quantity: item.quantity,
//         price: item.price,
//         image: item.image,
//       }));

//       const address = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         zipcode: formData.zipcode,
//       };

//       const payload = {
//         address,
//         orderItems,
//         paymentMethod: Method,
//         amount: totalAmount,
//       };

//       console.log("Payload:", payload); // Debugging log

//       switch (Method) {
//         case "COD": {
//           // Wrapping the case block with { }
//           const response = await fetch(`${backendUrl}/api/order/place`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(payload),
//           });

//           const data = await response.json();

//           if (response.ok && data.success) {
//             console.log("Order placed successfully (COD):", data.message);
//             setCart([]);
//             navigate("/userorders");
//           } else {
//             console.error(
//               "Error placing order (COD):",
//               data.message || "Something went wrong"
//             );
//             alert(`Order failed: ${data.message || "Please try again later."}`);
//           }
//           break;
//         }

//         case "Stripe": {
//           const resStripe = await axios.post(
//             backendUrl + "/api/order/stripe",
//             payload,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (resStripe.data.success) {
//             const { session_url } = resStripe.data;
//             window.location.href = session_url;
//           } else {
//             toast.error(resStripe.data.message);
//           }
//           break;
//         }

//         case "Razorpay": {
//           break;
//         }

//         default:
//           console.error("Invalid payment method selected");
//           alert(
//             "Invalid payment method selected. Please choose a valid option."
//           );
//       }
//     } catch (error) {
//       console.error("Error in onSubmitHandler:", error);
//       alert("An error occurred while placing the order. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         background: "linear-gradient(to bottom, #e8f5e9, #c8e6c9)",
//       }}
//     >
//       <Navbar />
//       <div className="flex items-center justify-center py-10 px-4">
//         <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
//           <h1
//             className="text-2xl font-bold text-center mb-6"
//             style={{
//               color: "#006400",
//               textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             Delivery Information
//           </h1>
//           <form
//             onSubmit={onSubmitHandler}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="firstName"
//                 value={formData.firstName}
//                 placeholder="Ali"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="lastName"
//                 value={formData.lastName}
//                 placeholder="Ahmed"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Email Address
//               </label>
//               <input
//                 required
//                 type="email"
//                 onChange={onChangeHandler}
//                 name="email"
//                 value={formData.email}
//                 placeholder="ali.ahmed@example.com"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Phone
//               </label>
//               <input
//                 required
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="phone"
//                 value={formData.phone}
//                 placeholder="+92 300 1234567"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Street
//               </label>
//               <input
//                 required
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="street"
//                 value={formData.street}
//                 placeholder="123 Mall Road"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 City
//               </label>
//               <input
//                 required
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="city"
//                 value={formData.city}
//                 placeholder="Lahore"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Province
//               </label>
//               <input
//                 required
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="state"
//                 value={formData.state}
//                 placeholder="Punjab"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Postal Code
//               </label>
//               <input
//                 required
//                 type="text"
//                 onChange={onChangeHandler}
//                 name="zipcode"
//                 value={formData.zipcode}
//                 placeholder="54000"
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//           </form>
//           <h2 className="text-lg font-bold text-gray-800 mt-10 mb-4">
//             Payment Method
//           </h2>
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={() => setMethod("Stripe")}
//               className={`py-2 px-4 rounded-md ${
//                 Method === "Stripe"
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               Stripe
//             </button>
//             <button
//               type="button"
//               onClick={() => setMethod("Razorpay")}
//               className={`py-2 px-4 rounded-md ${
//                 Method === "Razorpay"
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               Razorpay
//             </button>
//             <button
//               type="button"
//               onClick={() => setMethod("COD")}
//               className={`py-2 px-4 rounded-md ${
//                 Method === "COD"
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               COD
//             </button>
//           </div>
//           <button
//             onClick={onSubmitHandler}
//             className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//       <FloatingButtons />
//       <Footer />
//     </div>
//   );
// };

// export default PlaceOrder;


import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { cart, backendUrl, token, setCart } = useContext(CartContext);

  // Payment method state
  const [Method, setMethod] = useState("COD");

  // Calculate subtotal, shipping fee, and total
  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 50;
  const totalAmount = calculateSubtotal() + shippingFee;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key].trim()) {
        toast.error(
          `Please fill in the ${key.replace(/([A-Z])/g, " $1")} field!`
        );
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    if (!validateForm()) return;

    try {
      const orderItems = cart.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      }));

      const address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      };

      const payload = {
        address,
        orderItems,
        paymentMethod: Method,
        amount: totalAmount,
      };

      console.log("Payload:", payload); // Debugging log

      switch (Method) {
        case "COD": {
          // Wrapping the case block with { }
          const response = await fetch(`${backendUrl}/api/order/place`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            console.log("Order placed successfully (COD):", data.message);
            setCart([]);
            navigate("/userorders");
          } else {
            console.error(
              "Error placing order (COD):",
              data.message || "Something went wrong"
            );
            alert(`Order failed: ${data.message || "Please try again later."}`);
          }
          break;
        }

        case "Stripe": {
          const resStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.href = session_url;
          } else {
            toast.error(resStripe.data.message);
          }
          break;
        }

        default:
          console.error("Invalid payment method selected");
          alert(
            "Invalid payment method selected. Please choose a valid option."
          );
      }
    } catch (error) {
      console.error("Error in onSubmitHandler:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <div
          className="max-w-4xl w-full bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent effect for the form
          }}
        >
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{
              color: "#006400",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            Delivery Information
          </h1>
          <form
            onSubmit={onSubmitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                placeholder="Ali"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                placeholder="Ahmed"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                required
                type="email"
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                placeholder="ali.ahmed@example.com"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                required
                type="text"
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                placeholder="+92 300 1234567"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Street
              </label>
              <input
                required
                type="text"
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                placeholder="123 Mall Road"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                required
                type="text"
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                placeholder="Lahore"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Province
              </label>
              <input
                required
                type="text"
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                placeholder="Punjab"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Postal Code
              </label>
              <input
                required
                type="text"
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                placeholder="54000"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </form>
          <h2 className="text-lg font-bold text-green-800 mt-10 mb-4">
            Payment Method
          </h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMethod("Stripe")}
              className={`py-2 px-4 rounded-md ${
                Method === "Stripe"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Stripe
            </button>
            <button
              type="button"
              onClick={() => setMethod("COD")}
              className={`py-2 px-4 rounded-md ${
                Method === "COD"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              COD
            </button>
          </div>
          <button
            onClick={onSubmitHandler}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default PlaceOrder;
