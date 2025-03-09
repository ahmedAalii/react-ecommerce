import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res);

        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-12 text-center tracking-wide">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link to={`/productsdetails/${product._id}`}>
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
            >
              <div className="relative">
                <img
                  src={product.imageCover}
                  className="w-full h-56 object-cover"
                  alt={product.title}
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                  ${product.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h3>

                <div className="flex items-center mt-3 space-x-3">
                  {product.brand?.image && (
                    <img
                      src={product.brand.image}
                      alt={product.brand.name}
                      className="w-8 h-8 rounded-full border"
                    />
                  )}
                  <p className="text-sm text-gray-700">{product.brand?.name || "No Brand"}</p>
                </div>

                <div className="mt-4">
                  <p className="text-md text-gray-600"> Rating: <span className="font-medium text-gray-800">{product.ratingsAverage}</span></p>
                  <p className="text-md text-gray-600"> Quantity: <span className="font-medium text-gray-800">{product.quantity}</span></p>
                  <p className="text-md text-gray-600"> Sold: <span className="font-medium text-gray-800">{product.sold}</span></p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );


}
