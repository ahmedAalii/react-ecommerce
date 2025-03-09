import React, { useEffect, useState } from 'react';
import style from './CategoryDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoryDetails() {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  function getCategory(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        setCategory(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getCategory(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto mt-10">
      <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
        Your Category is {category.name}
      </h2>
      <img
        src={category.image}
        alt={category.name}
        className="w-24 h-24 object-cover rounded-full mb-3 border border-gray-300"
      />
      <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
    </div>
  );
}
