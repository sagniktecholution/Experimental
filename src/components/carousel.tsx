import React, { useState } from 'react';

export const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div>
      <h1>Image Carousel</h1>
      <button onClick={prevImage}>Previous</button>
      <img src={images[currentIndex]} alt="carousel" />
      <button onClick={nextImage}>Next</button>
    </div>
  );
};
