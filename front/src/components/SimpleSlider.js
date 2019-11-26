import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

function SimpleSlider() {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="home">
      <Slider {...settings}>
        <div className="homeHeader homeHeader_1">
          <div className="info">
            <h1>Special Days</h1>
            <p>
                Lorem proin gravida nibh enean sonauris hime sollicitudin enean,
lom himenaeos lorem ean consertquat estruda cono pero.
            </p>
            <Link to="/products/7"> <button> View Now</button> </Link>
          </div>
        </div>
        <div className="homeHeader homeHeader_2">
          <div className="info">
            <h1>Plant Lovers</h1>
            <p>
                Lorem proin gravida nibh enean sonauris hime sollicitudin enean,
lom himenaeos lorem ean consertquat estruda cono pero.
            </p>
            <Link to="/products/7"><button type="button"> View Now</button></Link>
          </div>
        </div>
        <div className="homeHeader homeHeader_3">
          <div className="info">
            <h1>Flower Beauty</h1>
            <p>
                Lorem proin gravida nibh enean sonauris hime sollicitudin enean,
lom himenaeos lorem ean consertquat estruda cono pero.
            </p>
            <Link to="/products/7"><button> View Now</button> </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
