import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChangePass = () => {
  const { resetToken } = useParams(); // Get reset token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/reset/reset-password/${resetToken}`,
        { newPassword },
        {
          headers: {
            "Content-Type": "application/json", // ✅ Fix!
          },
        }
      );
      console.log(res.data, resetToken);
      setSuccessMessage("Password reset successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login after password reset
      }, 2000); // Wait 2 seconds before redirecting
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error resetting password."
      );
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handlePasswordChange}>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ChangePass;
