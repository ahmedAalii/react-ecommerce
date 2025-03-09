import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const { id, category } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    focusOnSelect: true,
  };

  // Fetch product details
  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [id]);

  // Fetch related products
  const getRelatedProducts = useCallback(async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const related = data.data.filter((prod) => prod.category.name === category);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }, [category]);

  // Fetch data on component mount
  useEffect(() => {
    getProduct();
    getRelatedProducts();
  }, [getProduct, getRelatedProducts]);

  // Add product to cart
  async function addToCart(productId) {
    setCurrentId(productId);
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      toast[response.data.status === 'success' ? 'success' : 'error'](response.data.message);
    } catch (error) {
      toast.error('An error occurred while adding to cart');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      {product ? (
        <div className="flex flex-wrap items-center">
          {/* Product Images */}
          <div className="w-full md:w-1/3">
            <Slider {...settings}>
              {product.images?.map((src, index) => (
                <img key={index} src={src} className="w-full rounded-lg" alt="Product" />
              ))}
            </Slider>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-2/3 p-6">
            <h3 className="text-2xl font-semibold">{product.title}</h3>
            <p className="text-gray-600 my-3">{product.description}</p>
            <h4 className="text-lg text-emerald-500">{product.category?.name}</h4>
            <div className="flex justify-between items-center p-3 my-5 border-t border-b border-gray-300">
              <span className="text-lg font-bold">{product.price} EGP</span>
              <span className="text-yellow-500">
                <i className="fas fa-star"></i> {product.ratingsAverage}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product.id)}
              className="bg-emerald-500 text-white px-6 py-2 rounded-md transition hover:bg-emerald-600 flex items-center"
            >
              {loading && currentId === product.id ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product details...</p>
      )}

      {/* Related Products */}
      <h3 className="text-2xl font-semibold my-6 text-emerald-500">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full rounded-md" alt="Product" />
                <h4 className="text-emerald-500 mt-2">{product.category.name}</h4>
                <h3 className="text-lg font-semibold">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product.id)}
                className="w-full bg-emerald-500 text-white mt-3 px-4 py-2 rounded-md transition hover:bg-emerald-600 flex items-center justify-center"
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
}
