// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieCarousel from './components/MovieCarousel';
import { movieImages } from './assets/movieImages';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movieImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Banner currentIndex={currentIndex} />
      <div className="h-[60px]" />
      <MovieCarousel
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default App;