import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

  const [allPlants, setAllPlants] = useState([]);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });

      if (response.data.success) {
        console.log("All products fetched");
        // Update state only if data changes
        if (JSON.stringify(response.data.products) !== JSON.stringify(allPlants)) {
          setAllPlants(response.data.products);
        }
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching products");
    }
  };

  // Fetch products on mount
  useEffect(() => {
 
    console.log("useEffect triggered with backendUrl:", backendUrl, "and token:", token);
 
    fetchProducts();
 
  }, [backendUrl, token]); // Re-fetch only if backendUrl or token changes

  // Refresh products method for manual re-fetching
  const refreshProducts = () => {
    fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{ backendUrl, allPlants, refreshProducts, token, setToken }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductContext, ProductProvider };
