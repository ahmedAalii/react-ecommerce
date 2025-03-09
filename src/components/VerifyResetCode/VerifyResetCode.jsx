import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleVerifyCode(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      if (response.data.status === "Success") {
        navigate("/reset-password"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid reset code.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Verify Reset Code
      </h2>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}

      <form onSubmit={handleVerifyCode} className="mt-5">
        <input
          type="text"
          name="resetCode"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-emerald-600 focus:ring-emerald-600"
          placeholder="Enter Reset Code"
          required
        />

        <button
          type="submit"
          className="w-full mt-4 bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-800"
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
