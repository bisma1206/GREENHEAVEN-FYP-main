import userModel from "../models/userModel.js";

// Add products to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId, name, price, image } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let wishlist = user.wishlist || [];

    // Check if item is already in wishlist
    const exists = wishlist.find((item) => item.itemId === itemId);
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Item already in wishlist" });
    }

    wishlist.push({ itemId, name, price, image });

    await userModel.findByIdAndUpdate(userId, { wishlist }, { new: true });

    res.json({ success: true, message: "Added to wishlist", wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((item) => item.itemId !== itemId);

    await user.save();

    res.json({
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToWishlist, removeFromWishlist, getUserWishlist };
