import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import chatbotRoutes from "./routes/chatRoutes.js"; // ✅ Fixed import
import feedbackRoutes from "./routes/feedbackRoutes.js"; // ✅ Fixed import
import resetRouter from "./routes/userResetRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

connectdb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); //html form submission

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/chatbot", chatbotRoutes); // ✅ Ensure this is correct
app.use("/api/feedback", feedbackRoutes);
app.use("/api/user/reset", resetRouter);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
