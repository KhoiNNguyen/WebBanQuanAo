import { useState } from 'react';
import React from "react";
import './Slide.css'

import Carousel from 'react-bootstrap/Carousel';



function SlideShow() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='Inner'>
      <Carousel.Item>
        <img src="https://bizweb.dktcdn.net/100/438/408/themes/946371/assets/slider_1.jpg?1713777153245"  alt="Banner Big Redmi 12" />  
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://bizweb.dktcdn.net/100/438/408/themes/946371/assets/slider_1.jpg?1713777153245"  alt="Banner Big Redmi 12" />  
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://bizweb.dktcdn.net/100/438/408/themes/946371/assets/slider_1.jpg?1713777153245"  alt="Banner Big Redmi 12" />  
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;