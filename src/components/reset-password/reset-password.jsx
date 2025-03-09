import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword }
      );
      console.log(response.data); // Log response for debugging

      if (true) {
        toast.success("Password reset successfully! Redirecting...");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster /> 
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Reset Password
      </h2>

      <form onSubmit={handleResetPassword} className="mt-5">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-emerald-600 focus:ring-emerald-600"
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:border-emerald-600 focus:ring-emerald-600"
          placeholder="New Password"
          required
        />

        <button
          type="submit"
          className="w-full mt-4 bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-800"
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
