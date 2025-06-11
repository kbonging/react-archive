// src/pages/MovieListPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

export default function MovieListPage(){
  const { category } = useParams(); // URL: /movies/:category
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesByCategory(category).then(setMovies).catch(console.error);
  }, [category]);

  return (
    <div>
        <h2>{category} 영화</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
    </div>
  );
}