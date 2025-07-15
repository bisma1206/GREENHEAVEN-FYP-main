import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home/Home"));
const Collection = lazy(() => import("./Pages/Collection/Collection"));
const Product = lazy(() => import("./Pages/Product/Product"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const About = lazy(() => import("./Pages/About/About"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Login = lazy(() => import("./Pages/Login/Login"));
const PlaceOrder = lazy(() => import("./Pages/PlaceOrder/PlaceOrder"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const PlantCare = lazy(() => import("./Pages/PlantCare/PlantCare"));
const PlantDetail = lazy(() => import("./Pages/PlantDetail/PlantDetail"));
const Faqs = lazy(() => import("./Pages/Faqs/Faqs"));
const ShippingInfo = lazy(() => import("./Pages/ShippingInfo/ShippingInfo"));
const Signup = lazy(() => import("./Pages/Signup/Signup"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const Verify = lazy(() => import("./Pages/Verify/Verify"));
const MyProfile = lazy(() => import("./Pages/MyProfle/MyProfile"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy/PrivacyPolicy"));

// Contexts & Utilities
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { CartProvider } from "./Context/CartContext";
import { ProductProvider } from "./Context/ProductContext";
import { UserProvider } from "./Context/UserContext";

// Loader Fallback
import Loader from "./Components/Loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChangePass from "./Pages/ChangePass/ChangePass";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <ProductProvider>
              <ScrollToTop />
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:productID" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/place-order" element={<PlaceOrder />} />
                  <Route path="/userorders" element={<Orders />} />
                  <Route path="/faqs" element={<Faqs />} />
                  <Route path="/shipping" element={<ShippingInfo />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/plantguide" element={<PlantCare />} />
                  <Route
                    path="/plantguide/:plantName"
                    element={<PlantDetail pathToPage="/plantguide" />}
                  />
                  <Route
                    path="/collection/:plantName"
                    element={<PlantDetail pathToPage="/collection" />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  {/* <Route
                    path="/reset-password/:resetToken"
                    element={<ChangePass />}
                  /> */}

                  {/* Add the Privacy Policy route */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
              </Suspense>
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
