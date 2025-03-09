import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      toast.success("Reset code sent! Check your email.");
      navigate("/login/verifyresetcode");
    } catch (err) {
      toast.error("" + (err.response?.data?.message || "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email, and we’ll send you a reset code.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
