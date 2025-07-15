import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = "usd";
const delivery_fee = 10;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, orderItems, amount, address, paymentMethod } = req.body;

    // Validate that orderItems is not empty
    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items in the order." });
    }

    // Create order data
    const orderData = {
      userId,
      items: orderItems,
      address,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: paymentMethod !== "COD", // If COD, payment is false
      date: Date.now(),
    };

    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Placing order using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, orderItems, amount, address, paymentMethod } = req.body;

    const { origin } = req.headers; //frontned url like localhost://5173

    const orderData = {
      userId,
      items: orderItems,
      address,
      amount,
      paymentMethod: paymentMethod || "Stripe",
      payment: paymentMethod !== "COD", // If COD, payment is false
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = orderItems.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe requires amount in cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: delivery_fee * 100, // Stripe requires amount in cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//verify stripe payment

const verifyStripe = async (req, res) => {
  const { orderId, userId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: [] });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: error.message });
  }
};



//All orders data for admin pannel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: error.message });
  }
};

// UserOrder data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, amount } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status }, amount);

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get the total count of orders
const getOrderCount = async (req, res) => {
  try {
    const orderCount = await orderModel.countDocuments();

    // console.log("Order Count: ", orderCount);

    res.json({ success: true, orderCount });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  getOrderCount,
};
