import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  getOrderCount,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

//User feature
orderRouter.post("/userorders", authUser,userOrders);

//verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
// Get the total count of orders

orderRouter.get("/order-count", getOrderCount);  // Admin authentication required

export default orderRouter;
