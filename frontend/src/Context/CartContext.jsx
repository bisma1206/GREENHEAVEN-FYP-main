import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Add product to the cart
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      if (!token) {
        toast.error("User not logged in!");
        return;
      }

      console.log("Token being sent:", token); // Log the token for debugging

      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        {
          itemId: product.id,
          name: product.name,
          size: product.size,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
        }, // Send item details
        { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
      );

      console.log("Backend response:", response.data); // Debug backend response

      if (response.data.success) {
        setCart(response.data.cartData); // Update the cart state
        console.log("size", product.size);

        toast.success("Product added to cart!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      toast.error("Failed to add product to cart.");
    }
  };

  // Update product quantity in the cart
  const updateCartItem = async (itemId, size, quantity) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCart(response.data.cartData); // Update state with backend data
        toast.success("Cart updated successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating cart item:", error.message);
      toast.error("Failed to update cart.");
    }
  };

  // Fetch user cart from the backend
  const getUserCart = async () => {
    try {
      if (!token) return; // Skip if no token
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCart(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
      toast.error("Failed to load cart.");
    }
  };

  // Remove product from the cart
  const removeFromCart = async (itemId, size) => {
    try {
      await updateCartItem(itemId, size, 0); // Set quantity to 0 to remove item
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared.");
  };

  // Fetch cart when the token changes
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  // Function to handle login and cart update
  const handleLogin = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken); // This will trigger `useEffect` and call `getUserCart`
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        backendUrl,
        token,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getUserCart,
        handleLogin, // Expose handleLogin
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// PropTypes validation
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
