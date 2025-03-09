import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Categories() {


  const [categories, setCategories] = useState([])

  function getAllCat() {
    axios.get("https://ecommerce.routemisr.com/api/v1/subcategories")
      .then((res) => {
        console.log(res)
        setCategories(res.data.data)
      })
      .catch((res) => {
        console.log(res)
      })
  }

}