import { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // For entering email or phone
  const [resetToken, setResetToken] = useState(""); // For storing the reset token
  const [newPassword, setNewPassword] = useState(""); // For storing the new password
  const [isResetting, setIsResetting] = useState(false); // For preventing double submits
  
  // Send the reset code to the user
  const handleSendCode = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/reset/reset-password-request",
        { emailOrPhone }
      );
      alert(res.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Reset the user's password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setIsResetting(true);
      const res = await axios.post(
        `http://localhost:5000/api/user/reset/reset-password/${resetToken}`,
        { newPassword }
      );
      alert(res.data.message); // Show success message
      setIsResetting(false);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      setIsResetting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <h2 className="text-3xl font-bold">
            <span style={{ color: "white" }}>GREEN</span>{" "}
            <span
              style={{
                color: "#90EE90", // Light green color for "HEAVEN"
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Shadow effect
              }}
              className="font-bold"
            >
              HEAVEN
            </span>
          </h2>
          <p>
            Step into Green Heaven – a sanctuary where every leaf whispers
            peace.
          </p>
        </div>

        {/* Right Section */}
        <div className="login-form">
          <h2
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              fontWeight: "bold",
            }}
          >
            {resetToken ? "Reset Password" : "Request Password Reset"}
          </h2>

          <form>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                onChange={(e) => setEmailOrPhone(e.target.value)}
                type="text"
                id="Email"
                placeholder="Enter your Email"
                className="form-input"
              />
            </div>

            {resetToken && (
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  id="new-password"
                  placeholder="Enter your new password"
                  className="form-input"
                />
              </div>
            )}

            <button
              onClick={resetToken ? handleResetPassword : handleSendCode}
              className="code-button font-bold"
              disabled={isResetting}
            >
              {resetToken ? "Reset Password" : "Send Code"}
            </button>
          </form>

          <div className="login-again">
            <p>
              <span>Remember your password?</span> <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
