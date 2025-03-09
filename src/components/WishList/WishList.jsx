import React, { useEffect, useState, useContext } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import emptywishlist from "../../assets/11329060.png";

export default function WishList() {
  const { getLoggedUserWishlist, deleteWishlistItem } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(0);

  async function getWishlistItem() {
    try {
      const response = await getLoggedUserWishlist();
      if (response.data.status === "success") {
        setWishlistDetails(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(productId) {
    try {
      let response = await deleteWishlistItem(productId);
      if (response.data.status === "success") {
        setWishlistDetails((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== productId)
        );
        // toast.success("Product Removed!");
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to remove product!");
    }
  }

  async function addToCart(id) {
    setCurrentId(id);
    try {
      let response = await addProductToCart(id);

      if (response.data.status === 'success') {
        toast.success(response.data.message);

        // Remove the product from wishlistDetails after adding to cart
        setWishlistDetails((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== id)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart!");
    }
  }


  useEffect(() => {
    getWishlistItem();
  }, []);

  if (loading) {
    return <p>Loading your wishlist...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {wishlistDetails.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={emptywishlist} alt="emptywishlist" className="w-32 h-32 mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty!</h1>
          <p className="text-gray-600 mb-4">
            Browse our categories and discover our best deals!
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistDetails.map((product) => (
            <div
              key={product._id}
              className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:shadow-md h-full"
            >
              <Link to={`/productdetails/${product._id}`}>
                <img className="rounded-t-lg w-full h-48 object-cover" src={product.imageCover} alt={product.title} />
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <Link to={`/productdetails/${product._id}`}>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 flex-grow">
                  {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
                </p>
                <div className="flex items-center gap-2">
                  {product.priceAfterDiscount ? (
                    <>
                      <p className="text-lg font-semibold text-red-600">${product.priceAfterDiscount}</p>
                      <p className="text-md line-through text-gray-500">${product.price}</p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-blue-600">
                      ${product.price ?? 'N/A'}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product._id).then(deleteItem(product._id))}
                  className="mt-3 bg-green-600 text-white px-3 py-2 rounded-lg"
                >
                  {currentId === product._id ? 'Adding...' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => deleteItem(product._id)}
                  className="mt-3 bg-red-700 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
