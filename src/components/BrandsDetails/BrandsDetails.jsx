import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BrandsDetails() {
  const [brand, setBrand] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getBrand() {
      try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        setBrand(res.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getBrand();
  }, [id]);

  if (!brand) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-emerald-600 mb-4 text-center">
        Brand Details
      </h2>
      <img
        src={brand.image}
        alt={brand.name}
        className="w-32 h-32 object-cover rounded-full mb-4 border border-gray-300"
      />
      <h3 className="text-xl font-semibold text-gray-800">{brand.name}</h3>
    </div>
  );
}
