import React from 'react';
import Slider from 'react-slick';
import slide1 from '../../assets/slider-image-1.jpeg';
import slide2 from '../../assets/slider-image-2.jpeg';
import slide3 from '../../assets/slider-image-3.jpeg';
import grocery1 from '../../assets/grocery-banner.png';
import grocery2 from '../../assets/grocery-banner-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    focusOnSelect: true,
    arrows: false,
  };

  return (
    <div className="container mx-auto px-4 my-5">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Slider Section */}
        <div className="md:w-3/4 w-full">
          <Slider {...settings}>
            <img className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" src={slide1} alt="slide1" />
            <img className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" src={grocery1} alt="grocery1" />
            <img className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" src={grocery2} alt="grocery2" />
          </Slider>
        </div>

        {/* Side Images Section */}
        <div className="md:w-1/4 w-full flex flex-col gap-2">
          <img className="w-full h-[150px] md:h-[200px] object-cover rounded-lg" src={slide2} alt="slide2" />
          <img className="w-full h-[150px] md:h-[200px] object-cover rounded-lg" src={slide3} alt="slide3" />
        </div>
      </div>
    </div>
  );
}
