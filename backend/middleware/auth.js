import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.body.userId = decoded.id; // Attach the userId to the request body

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;
