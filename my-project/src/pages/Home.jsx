import Header from "../components/Header";
import Banner from "../components/Banner";
import React, { useEffect, useState } from "react";
import { fetchPopular, fetchNowPlaying } from "../api/tmdb";
import MovieSet from "../components/MovieSet";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    fetchPopular().then(setPopular).catch(console.error);
    fetchNowPlaying().then(setNowPlaying).catch(console.error);
  }, []);

  // console.log(popular);
  // console.log(nowPlaying);
  return (
    <div className="bg-black text-white min-h-screen">
      <Banner />
      <MovieSet movies={nowPlaying} title="상영중" />
      <MovieSet movies={popular} title="인기 영화" />
    </div>
  );
}
