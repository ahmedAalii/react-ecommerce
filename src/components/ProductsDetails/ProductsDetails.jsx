import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-3xl">
      <h2 className="text-3xl font-bold text-emerald-600 mb-4 text-center">{product.title}</h2>
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-80 object-contain mx-auto"
      />
      <div className="text-gray-700">
        <p className="mb-2"><span className="font-semibold">Price:</span> ${product.price}</p>
        <p className="mb-2"><span className="font-semibold">Brand:</span> {product.brand?.name}</p>
        <p className="mb-2"><span className="font-semibold">Rating:</span> {product.ratingsAverage} / 5</p>
        <p className="mb-2"><span className="font-semibold">Quantity:</span> {product.quantity}</p>
        <p className="mb-2"><span className="font-semibold">Sold:</span> {product.sold}</p>
      </div>
    </div>
  );
}
