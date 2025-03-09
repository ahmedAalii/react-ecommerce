import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function Checkout() {

  let { checkout } = useContext(CartContext)
  

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () =>
      handleCheckout(`66bde5c2ed0dc0016c690575`, `http://localhost:5173`)
  });

  async function handleCheckout(cartId, url) {
    let response = await checkout(cartId, url, formik.values)
    console.log(response);

  }


  return <>
    <h1 className="text-center text-3xl font-semibold text-gray-900 mt-10">Check Out Now</h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_details" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
      </div>

      <div className="relative z-0 w-full mb-2 group">
        <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
        {formik.errors.phone && formik.touched.phone ? <div className="text-red-500 text-xs">{formik.errors.phone}</div> : null}
      </div>

      <div className="relative z-0 w-full mb-2 group">
        <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="floating_city" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
        {formik.errors.city && formik.touched.city ? <div className="text-red-500 text-xs">{formik.errors.city}</div> : null}
      </div>

      <div>
        <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Check Out
        </button>
      </div>
    </form>
  </>
}
