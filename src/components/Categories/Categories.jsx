import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);

      })
      .catch((err) => {
        console.error(err);
        setLoading(false);

      });
  }

  useEffect(() => {
    getCategories();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-extrabold text-emerald-600 mb-8 text-center">
        All Categories
      </h2>

      <div className="flex flex-wrap -m-4">
        {categories.length > 0 ? categories.map((category) => (
          <div key={category._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <Link to={`categorydetails/${category._id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <img
                  src={category.image}
                  className="w-full h-48 object-fit rounded-t-lg"
                  alt={category.name}
                />
                <div className="p-4 text-center bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        )) : (
          <div className="w-full text-center text-gray-500">Loading Categories...</div>
        )}
      </div>
    </div>
  );
}
