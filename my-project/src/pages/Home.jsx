import Header from "../components/Header";
import Banner from "../components/Banner";
import React, { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieSet from "../components/MovieSet";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const [popularData, nowPlayingData] = await Promise.all([
          fetchMoviesByCategory('popular'),
          fetchMoviesByCategory('now_playing'),
        ]);

        setPopular(popularData);
        setNowPlaying(nowPlayingData);
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
        // setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
}, []);

  // console.log(popular);
  // console.log(nowPlaying);
  return (
    <>
    {loading ?(
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-20 h-20 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    ) : (
      <div className="bg-black text-white min-h-screen">
      <Banner />
      <MovieSet movies={nowPlaying} title="상영중" />
      <MovieSet movies={popular} title="인기 영화" />
      </div>
    )}
    </>
  );
}
