import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, name, size, quantity, price,image } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    console.log(size);
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || []; // Ensure cartData is an array

    // Check if the item already exists in the cart
    const existingItem = cartData.find(
      (item) => item.itemId === itemId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
 // Increment quantity
    } else {
      // Add new item if it doesn't exist
      cartData.push({ 
        itemId, 
        name,
        size, 
        quantity,
        price : Number(price),
        image,
       });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({ success: true, message: "Added to cart", cartData: updatedUser.cartData });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Validate the incoming data
    if (!userId || !itemId || !size || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || [];

    // Check if the item exists in the cart
    const existingItem = cartData.find(
      (item) => item.itemId === itemId && item.size === size
    );

    if (existingItem) {
      if (quantity > 0) {
        existingItem.quantity = quantity; // Update quantity
      } else {
        // Remove the item if quantity is 0
        cartData = cartData.filter(
          (item) => !(item.itemId === itemId && item.size === size)
        );
      }
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }

    // Save the updated cart data
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({ success: true, message: "Cart updated successfully", cartData: updatedUser.cartData });
  } catch (error) {
    console.error("Error in updateCart:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData.map((item) => ({
      ...item,
      itemId: item.itemId || item._id, // Ensure `itemId` is present
    }));

    res.json({ success: true, cartData });
    // console.log(cartData);


  } catch (error) {
    console.error("Error in getUserCart:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { addToCart, updateCart, getUserCart };
