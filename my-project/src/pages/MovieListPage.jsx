// src/pages/MovieListPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

const CATEGORY_TITLES = {
  now_playing: "상영중",
  popular: "인기",
  upcoming: "개봉 예정",
  top_rated: "최고 평점",
  favorite: "찜 목록",
};

export default function MovieListPage(){
  const { category } = useParams(); // URL: /movies/:category
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesByCategory(category).then(setMovies).catch(console.error);
  }, [category]);

  return (
    <div className="bg-black min-h-screen text-white px-4 md:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8">
        {CATEGORY_TITLES[category] || "영화"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}