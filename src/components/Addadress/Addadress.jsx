import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddAddress = () => {
  const [address, setAddress] = useState({
    name: "",
    details: "",
    phone: "",
    city: ""
  });

  const [addressId, setAddressId] = useState(null); // Store the new address ID

  let headers = { token: localStorage.getItem("userToken") };

  async function addAddress() {
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/addresses", address, { headers });
      toast.success(res.data.message || "Address added successfully!");

      // Check if response contains address data
      if (res.data.data && res.data.data.length > 0) {
        const newAddress = res.data.data[res.data.data.length - 1]; // Get last address
        setAddressId(newAddress._id); // Store new address ID
      } else {
        toast.error("Could not retrieve address ID.");
      }

      console.log(res);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address.");
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAddress();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Manage Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={address.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="details"
          placeholder="Details"
          value={address.details}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={address.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Address
        </button>
      </form>

      {addressId && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <p className="text-center text-gray-700">Your Address ID:</p>
          <p className="text-center font-semibold text-blue-600">{addressId}</p>
        </div>
      )}
      <button
        className="text-right mt-4">
        <Link to={`/get-address/${addressId}`} className="text-sm text-emerald-600 hover:underline">
          View Address Details
        </Link>
      </button>
    </div>
  );
};

export default AddAddress;
