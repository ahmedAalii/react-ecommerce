import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext"; // ✅ Import UserContext

export default function Register() {
  const navigate = useNavigate();
  const { setuserLogin } = useContext(UserContext); // ✅ Get setuserLogin from context
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function handleRegister(values) {
    try {
      setisLoading(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );

      setisLoading(false);
      if (res.data.message === "success") {
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        navigate("/");
      }
    } catch (error) {
      setisLoading(false);
      setApiError(error.response?.data?.message || "Something went wrong!");
    }
  }

  let myValidation = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min length is 3")
      .max(10, "Max length is 10")
      .required("Name is required"),
    email: yup.string().email("Not valid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Min length is 6")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    onSubmit: handleRegister,
  });

  return (
    <>
      {ApiError && <div className="text-red-500 text-center">{ApiError}</div>}

      <h1 className="text-center text-3xl font-semibold text-gray-900 mt-10">
        Register
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">
            Name
          </label>
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs">{formik.errors.name}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label>Email</label>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label>Password</label>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            {...formik.getFieldProps("rePassword")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label>Confirm Password</label>
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="text-red-500 text-xs">
              {formik.errors.rePassword}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            {...formik.getFieldProps("phone")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label>Phone</label>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-xs">{formik.errors.phone}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
