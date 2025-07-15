import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Sidebar = lazy(() => import("./Components/Sidebar/Sidebar"));
const AddItem = lazy(() => import("./Pages/AddItem/AddItem"));
const ListItem = lazy(() => import("./Pages/ListItem/ListItem"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const Login = lazy(() => import("./Components/Login/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const EditProduct = lazy(() => import("./Pages/EditProduct/EditProduct"));
const ExpenseTrack = lazy(() => import("./Pages/Expense/ExpenseTrack"));
const FeedbackList = lazy(() => import("./Pages/FeedBackList/FeedBackList"));
const Report = lazy(() => import("./Pages/Report/Report"));

import Loader from "./Components/Loader/Loader";
import { ExpenseProvider } from "./Context/ExpenseContext";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <ExpenseProvider>
        <ToastContainer />
        {token === "" ? (
          <Suspense fallback={<Loader />}>
            <Login setToken={setToken} />
          </Suspense>
        ) : (
          <BrowserRouter>
            <div className="flex">
              <Suspense fallback={<Loader />}>
                <Sidebar />
              </Suspense>
              <div className="flex-grow">
                <Suspense fallback={<Loader />}>
                  <Navbar setToken={setToken} />
                </Suspense>
                <div className="p-6">
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/add" element={<AddItem token={token} />} />
                      <Route
                        path="/feedbacks"
                        element={<FeedbackList token={token} />}
                      />
                      <Route
                        path="/list"
                        element={<ListItem token={token} />}
                      />
                      <Route
                        path="/orders"
                        element={<Orders token={token} />}
                      />
                      <Route
                        path="/edit/:id"
                        element={<EditProduct token={token} />}
                      />
                      <Route
                        path="/expenses"
                        element={<ExpenseTrack token={token} />}
                      />
                      <Route path="/report" element={<Report />} />
                    </Routes>
                  </Suspense>
                </div>
              </div>
            </div>
          </BrowserRouter>
        )}
      </ExpenseProvider>
    </>
  );
};

export default App;
