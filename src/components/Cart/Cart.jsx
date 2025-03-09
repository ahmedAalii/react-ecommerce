import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import emptycart from '../../assets/11329060.png';

export default function Cart() {
  let { getLoggedUserCart, updateCartPoductQuantity, deleteCartItem } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCartItem() {
    try {
      let response = await getLoggedUserCart();
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProduct(id, count) {
    if (count === 0) {
      deleteItem(id);
    } else {
      let response = await updateCartPoductQuantity(id, count);
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
        toast.success('Product Updated!');
      } else {
        toast.error('Product Cannot Be Updated');
      }
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
      toast.success('Product Removed!');
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading your cart...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {CartDetails?.products.length > 0 ? (
        <>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Total: {CartDetails?.totalCartPrice} $</h2>
            <Link
              to="/checkout"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>

          <div className="relative overflow-x-auto shadow-md rounded-lg mt-6">
            <table className="w-full text-sm text-gray-600">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products.map((product) => (
                  <tr key={product.product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 h-16 object-cover rounded-md shadow"
                        alt={product.product.title}
                      />
                      <span className="font-medium text-gray-900">{product.product.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateProduct(product.product.id, product.count - 1)}
                          className="h-8 w-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full shadow"
                        >
                          −
                        </button>
                        <span className="text-lg font-medium">{product.count}</span>
                        <button
                          onClick={() => updateProduct(product.product.id, product.count + 1)}
                          className="h-8 w-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full shadow"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{product.price * product.count} $</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={emptycart} alt="Empty Cart" className="w-32 h-32 mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty!</h1>
          <p className="text-gray-600 mb-4">Browse our categories and discover our best deals!</p>
          <Link
            to="/"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
