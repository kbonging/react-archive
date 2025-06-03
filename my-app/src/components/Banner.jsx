// components/Banner.jsx
import React, { useEffect, useRef } from 'react';
import { movieImages } from '../assets/movieImages';

export default function Banner({ currentIndex }) {
  const progressRef = useRef(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (bar) {
      bar.classList.remove('animate');
      void bar.offsetWidth;
      bar.classList.add('animate');
    }
  }, [currentIndex]);

  return (
    <section
      id="banner"
      className="mt-[72px] h-[500px] w-full relative"
      style={{
        backgroundImage: `url(${movieImages[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none" />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[15%] h-[2px] bg-white bg-opacity-20 overflow-hidden rounded">
        <div
          ref={progressRef}
          className="h-full bg-red-600 animate"
          style={{ animation: 'fillProgress 5s linear forwards' }}
        />
      </div>
    </section>
  );
}