import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getBrands();
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
      <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
        All Brands
      </h2>
      <div className="flex flex-wrap -m-4">
        {brands.map((brand) => (
          <div key={brand._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <Link to={`/brandsdetails/${brand._id}`}>
              <div className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={brand.image}
                  className="w-full h-48 object-cover"
                  alt={brand.name}
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-emerald-500">{brand.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
