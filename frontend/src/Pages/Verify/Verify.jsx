import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCart, backendUrl } = useContext(CartContext);
  const [searchParams] = useSearchParams(); // Get query parameters correctly

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      console.log("Verifying payment for Order ID:", orderId, "Success:", success);

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCart([]); // Clear cart if successful
        toast.success("Payment Verified! 🎉");
        navigate("/userorders");
      } else {
        toast.error("Payment Failed ❌");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Verifying Payment...</h2>
      </div>
      <Footer />
    </>
  );
};

export default Verify;
