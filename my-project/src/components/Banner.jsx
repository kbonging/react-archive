// src/components/Banner.jsx
import React, { useEffect, useState } from 'react';
import { fetchTrending } from '../api/tmdb';

// BACKDROP_SIZE 옵션: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/${BACKDROP_SIZE}`;
const INTERVAL = 5000;

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchTrending().then(setMovies).catch(console.error);
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % movies.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies.length) {
    return <div className="mt-[72px] h-[500px] bg-gray-900"></div>;
  }

  const movie = movies[index];
  return (
    <section
      className="mt-[63px] h-[600px] w-full relative bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      {/* 프로그레스 바 제거 */}
    </section>
  );
}