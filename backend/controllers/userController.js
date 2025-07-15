import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, profilePic, bio } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // take number btw 5-10 wrna ye bht time le ga
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = userModel({
      name,
      email,
      password: hashPassword,
      phone,
      profilePic,
      bio,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    //this _id is automatically generated in database

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for userlogin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, bio } = req.body;
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let profilePic = user.profilePic;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });
      profilePic = uploadResult.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.profilePic = profilePic;

    await user.save();
    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Profile Picture
const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { profilePic: uploadResult.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile picture updated!",
      profilePic: uploadResult.secure_url,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCount = async (req, res) => {
  try {
    // Get the total count of users from the user model
    const userCount = await userModel.countDocuments();
    res.json({ userCount }); // Return the count as part of the response
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Error fetching user count" });
  }
};

const sendResetPasswordCode = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    let user = await userModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    console.log("Token expiration:", user.resetTokenExpiration);

    await user.save();

    // Send email with reset token
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5000/api/user/reset/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reset code sent to your email!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error sending reset code" });
  }
};
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;
  

  try {
    console.log("Received token:", resetToken);
    console.log("New password from body:", newPassword);

    const user = await userModel.findOne({
      resetToken: resetToken.trim(),
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      console.log("❌ No user found with valid reset token or token expired");
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save(); // This might be failing if schema doesn't support reset fields
    console.log("✅ Password updated successfully");

    res.json({
      success: true,
      message: "Password has been reset successfully!",
    });
  } catch (error) {
    console.error("🔥 Error resetting password:", error); // Full error log
    res
      .status(500)
      .json({ success: false, message: "Error resetting password" });
  }
};

// Backend (Express)
const resetPasswordPage = async (req, res) => {
  const { resetToken } = req.params;

  try {
    // Find the user by reset token and check if the token is valid and not expired
    const user = await userModel.findOne({
      resetToken: resetToken.trim(),
      resetTokenExpiration: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      // If user is not found or the reset token is invalid/expired
      console.warn("No user found with valid reset token:", resetToken);
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    console.log("Generated reset token:", resetToken);
    console.log("Token expiration:", user.resetTokenExpiration);

    // If the token is valid, render the HTML page with a password reset form
    res.send(`
     <html>
  <head>
    <title>Reset Your Password</title>
    <!-- Link to Font Awesome for the eye icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-image: url('https://i.pinimg.com/736x/06/08/6a/06086aaf1555e6e4d23b5ee05686282e.jpg'); /* Background image */
        background-size: cover;
        background-position: center;
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .container {
        padding: 30px;
        border-radius: 8px;
        width: 350px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      h2 {
        text-align: center;
        color: green;
        font-size: 24px;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        font-weight: extrabold;
      }

      .form-group {
        margin-bottom: 20px;
        position: relative;
      }

      label {
        display: block;
        font-weight: bold;
        color: green;
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
      }

      input[type="password"] {
        width: 100%;
        padding: 14px;
        padding-right: 40px; /* Add space for the eye icon */
        margin-top: 8px;
        margin-bottom: 15px;
        border: 1px solid #4CAF50;
        border-radius: 4px;
        color: #333;
        font-size: 16px;
        box-sizing: border-box; /* Prevents padding from affecting the width */
      }

      button {
        width: 100%;
        padding: 12px;
        background-color: green;
        color: white;
        font-size: 16px;
        border: 4px solid #4CAF50;
        margin-top: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      }

      button:hover {
        background-color: #45a049;
      }

      .error-message {
        color: red;
        font-size: 14px;
        margin-top: 10px;
      }

      /* Style for the eye icon */
      .eye-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%); 
        cursor: pointer;
        color: #4CAF50;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Reset Your Password</h2>
      <form action="/api/user/reset/reset-password/${resetToken}" method="POST">
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <div class="input-container">
            <input type="password" name="newPassword" id="newPassword" placeholder="Enter your new password" required />
            <i class="fas fa-eye eye-icon" id="toggleNewPassword" onclick="togglePassword('newPassword')"></i>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-container">
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required />
            <i class="fas fa-eye eye-icon" id="toggleConfirmPassword" onclick="togglePassword('confirmPassword')"></i>
          </div>
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p class="error-message" id="error-message"></p>
    </div>

    <script>
      // Function to toggle the password visibility
      function togglePassword(id) {
        var inputField = document.getElementById(id);
        var icon = document.getElementById("toggle" + id.charAt(0).toUpperCase() + id.slice(1));

        // Toggle the type of input between password and text
        if (inputField.type === "password") {
          inputField.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          inputField.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    </script>
  </body>
</html>

    `);
  } catch (error) {
    // If any error occurs during the process
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error rendering reset password page" });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateProfile,
  updateProfilePic,
  getUserCount,
  sendResetPasswordCode,
  resetPassword,
  resetPasswordPage,
};
