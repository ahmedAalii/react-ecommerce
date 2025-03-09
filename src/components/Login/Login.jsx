import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'; 


export default function Login() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const { setuserLogin } = useContext(UserContext); 

  const [isLoading, setisLoading] = useState(false)

  function handleLogin(values) {
    setisLoading(true)

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)

      .then((res) => {
        setisLoading(false)
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token)
          setuserLogin(res.data.token)
          navigate("/")
        }
      })

      .catch((res) => {
        setisLoading(false)
        console.log(res.response.data.message)
        setApiError(res.response.data.message)
      })
  }

  let myValidation = yup.object().shape({
    email: yup.string().email("Not valid").required("Email is required"),
    password: yup.string().min(6, "Min length is 6").required("Password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin
  })

  return <>
    {ApiError && <div className="text-red-500 text-center">{ApiError}</div>}

    <h1 className="text-center text-3xl font-semibold text-gray-900 mt-10">Login</h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        {formik.errors.email && formik.touched.email ? <div className="text-red-500 text-xs">{formik.errors.email}</div> : null}
      </div>

      <div className="relative z-0 w-full mb-2 group">
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        {formik.errors.password && formik.touched.password ? <div className="text-red-500 text-xs">{formik.errors.password}</div> : null}
      </div>

      {/* Forgot Password Link */}
      <div className="text-right mb-5">
        <Link to="/login/forgotpassword" className="text-sm text-emerald-600 hover:underline">Forgot Password?</Link>
      </div>

      <div>
        <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Login"}
        </button>

        <p className="text-center mt-5">Do not have an account? <Link to="/register" className="text-emerald-600">Register</Link></p>
      </div>
    </form>
  </>
}
