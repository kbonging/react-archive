// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieCarousel from './components/MovieCarousel';
import { movieImages } from './assets/movieImages';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % movieImages.length;
        setKey((k) => k + 1); // 프로그레스 바 리셋
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Banner currentIndex={currentIndex} key={key} />
      <div className="h-[60px]" />
      <MovieCarousel
        currentIndex={currentIndex}
        setCurrentIndex={(idx) => {
          setCurrentIndex(idx);
          setKey((k) => k + 1);
        }}
      />
    </div>
  );
}

export default App;