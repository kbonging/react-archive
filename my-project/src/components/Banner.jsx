// src/components/Banner.jsx
import React, { useEffect, useState } from 'react';
import { fetchMoviesByCategory } from '../api/tmdb';

const BACKDROP_SIZE  = 'w1280';
const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/${BACKDROP_SIZE}`;
const INTERVAL       = 7000;
const FADE_DURATION  = 3000;  // 이제 3000ms = 3초로 늘렸습니다.

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const [index,  setIndex]  = useState(0);
  const [isFadingOut, setFade] = useState(false);

  //  trending 영화 불러오기
  useEffect(() => {
    fetchMoviesByCategory('trending')
      .then(setMovies)
      .catch(console.error);
  }, []);

  // 일정 간격마다 페이드 트리거
  useEffect(() => {
    if (!movies.length) return;
    const timer = setInterval(() => setFade(true), INTERVAL);
    return () => clearInterval(timer);
  }, [movies]);

  //  애니메이션이 끝나면 인덱스 변경
  const onTransitionEnd = () => {
    if (!isFadingOut) return;
    setIndex(i => (i + 1) % movies.length);
    setFade(false);
  };

  if (!movies.length) {
    return <div className="h-screen bg-gray-900" />;
  }

  const backdropUrl = `${IMAGE_BASE_URL}${movies[index].backdrop_path}`;

  return (
    <>
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* 트렌지션션 */}
      <div
        className="fixed inset-0 z-10 bg-black pointer-events-none"
        style={{
          opacity: isFadingOut ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: `${FADE_DURATION}ms`,
          transitionTimingFunction: 'ease-in-out',
        }}
        onTransitionEnd={onTransitionEnd}
      />
    </>
  );
}
