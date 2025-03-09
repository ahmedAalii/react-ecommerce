import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../Hooks/useProducts';
// Contexts
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {
  const { addProductToWihlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const { data: products, isError, error, isLoading } = useProducts();

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    try {
      const response = await addProductToCart(id);
      response.data.status === 'success'
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
    } catch {
      toast.error('Failed to add product to cart');
    }
    setLoading(false);
  }

  async function toggleWishlist(id) {
    try {
      const response = await addProductToWihlist(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        setWishlist((prevWishlist) =>
          prevWishlist.includes(id)
            ? prevWishlist.filter((item) => item !== id)
            : [...prevWishlist, id]
        );
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
  }

  if (isLoading) return <div className="spinner">Loading...</div>;
  if (isError) return <h3 className="text-red-500 text-center">Error: {error.message}</h3>;

  return (
    <div className="container mx-auto px-4">
      <h3 className="font-semibold text-2xl mt-5 pt-8 text-emerald-500">Recent Products</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
        {products?.map((product) => (
          <div key={product.id} className="p-2">
            <div className="product p-3 shadow-md rounded-lg relative bg-white">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img
                  src={product.imageCover}
                  className="w-full h-[200px] object-cover rounded-md"
                  alt={product.title}
                />
                <h3 className="text-emerald-500 text-sm mt-2">{product.category.name}</h3>
                <h3 className="font-semibold text-md truncate">{product.title}</h3>
                <div className="flex justify-between p-2 text-sm">
                  <span>{product.price} EGP</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i> {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product.id)}
                className="bg-emerald-500 text-white w-full py-1 mt-2 rounded-md hover:bg-emerald-600 transition duration-200"
                disabled={loading && currentId === product.id}
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  'Add To Cart'
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3"
              >
                <i
                  className={`fas fa-heart text-2xl ${
                    wishlist.includes(product.id) ? 'text-red-600' : 'text-gray-400'
                  }`}
                ></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
