import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { setuserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      setIsLoading(false);
      if (res.data.message === "success") {
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setApiError(error.response?.data?.message || "Something went wrong!");
    }
  }

  const validationSchema = yup.object({
    name: yup.string().min(3, "Min length is 3").max(10, "Max length is 10").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Min length is 6").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Register</h1>
        {apiError && <div className="text-red-500 text-sm text-center mt-2">{apiError}</div>}

        <form onSubmit={formik.handleSubmit} className="mt-6">
          {[
            { name: "name", type: "text", label: "Name" },
            { name: "email", type: "email", label: "Email" },
            { name: "password", type: "password", label: "Password" },
            { name: "rePassword", type: "password", label: "Confirm Password" },
            { name: "phone", type: "tel", label: "Phone" },
          ].map(({ name, type, label }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 text-sm font-medium">{label}</label>
              <input
                type={type}
                name={name}
                {...formik.getFieldProps(name)}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-400 focus:border-emerald-500"
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-emerald-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
