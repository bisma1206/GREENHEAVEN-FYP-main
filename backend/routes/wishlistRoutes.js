import express from "express";
import { addToWishlist, removeFromWishlist, getUserWishlist } from "../controllers/wishlistController.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authUser, addToWishlist);
router.post("/remove", authUser, removeFromWishlist);
router.get("/:userId", authUser, getUserWishlist);

export default router;
