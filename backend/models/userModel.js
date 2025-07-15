import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png",
    }, // Profile Picture URL
    bio: { type: String, default: "Welcome to my profile!" }, // Bio Field
    phone: { type: String, default: "Add Your Phone-Number" }, // Phone Number
    cartData: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    resetToken: { type: String, index: true },
    resetTokenExpiration: { type: Date },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("users", userSchema);
export default userModel;
