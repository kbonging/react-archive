// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import MovieSet from '../components/MovieSet';
import { fetchMoviesByCategory } from '../api/tmdb';

export default function Home() {
  const [popular, setPopular]     = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [now, pop] = await Promise.all([
          fetchMoviesByCategory('now_playing'),
          fetchMoviesByCategory('popular'),
        ]);
        setNowPlaying(now);
        setPopular(pop);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-20 h-20 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 1) 배경 + 오버레이 */}
      <Banner />

      {/* 2) 카드 컨텐츠: 반드시 Banner 오버레이(z-10) 위에 올라오도록 z-index를 높여줌 */}
      <div className="relative z-20 min-h-screen bg-black bg-opacity-0">
        <Header />

        {/* Header 아래로 내려오도록 충분한 패딩 */}
        <div className="container mx-auto px-4 pt-[570px] pb-12">
          <MovieSet movies={nowPlaying} title="상영중" />
          <MovieSet movies={popular}    title="인기 영화" />
        </div>
      </div>
    </div>
  );
}
