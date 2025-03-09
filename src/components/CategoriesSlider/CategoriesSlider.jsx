import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768, // Small screens
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 500, // Extra small screens
        settings: { slidesToShow: 2 }
      }
    ]
  };

  function getCategories() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 my-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Shop Popular Categories Now</h3>
      
      {categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="p-2">
              <img className="w-full h-[150px] md:h-[200px] object-cover rounded-lg shadow-sm" src={category.image} alt={category.name} />
              <h3 className="text-center text-sm md:text-base font-medium mt-2">{category.name}</h3>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Loading categories...</p>
      )}
    </div>
  );
}
