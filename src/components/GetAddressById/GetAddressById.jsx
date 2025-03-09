import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const GetAddressById = () => {
  const [addressId, setAddressId] = useState("");
  const [loading, setLoading] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]); // Store all user addresses

  let headers = { token: localStorage.getItem("userToken") };

  // Fetch all addresses
  async function fetchAllAddresses() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/addresses", { headers });
      setAllAddresses(res.data.data || []); // Update the list after deletion
    } catch (err) {
      console.error("Error fetching addresses:", err);
      toast.error("Failed to load addresses.");
    }
  }

  // Load addresses on mount
  useEffect(() => {
    fetchAllAddresses();
  }, []);

  // Remove address
  async function removeAddress() {
    if (!addressId.trim()) {
      toast.error("Please enter a valid Address ID.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, { headers });
      toast.success("Address removed successfully!");
      setAddressId(""); // Clear the ID input
      fetchAllAddresses(); // Refresh the list after deletion
    } catch (err) {
      toast.error("Failed to remove address.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Your Addresses:</h2>

      {/* Display all User Addresses */}
      {allAddresses.length > 0 ? (
        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <ul className="text-sm text-gray-700 space-y-3">
            {allAddresses.map((addr) => (
              <li key={addr._id} className="p-3 border rounded-md bg-white shadow">
                <p><strong>ID:</strong> {addr._id}</p>
                <p><strong>Name:</strong> {addr.name}</p>
                <p><strong>Details:</strong> {addr.details}</p>
                <p><strong>Phone:</strong> {addr.phone}</p>
                <p><strong>City:</strong> {addr.city}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No addresses found.</p>
      )}

      {/* Address Removal Input */}
      <input
        type="text"
        placeholder="Enter Address ID to remove"
        value={addressId}
        onChange={(e) => setAddressId(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <button
        onClick={removeAddress}
        disabled={loading}
        className="w-full bg-red-500 text-white mt-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
      >
        {loading ? "Removing..." : "Remove Address"}
      </button>
    </div>
  );
};

export default GetAddressById;
