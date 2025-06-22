import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoriteMovies, removeFavoriteMovie } from "../api/favorites";
import MovieCard from "../components/MovieCard";
import usePageTitle from "../hooks/usePageTitle";

export default function FavoriteMoviesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageTitle(`찜 목록 | PVING`);

  useEffect(() => {
    setLoading(true);
    setFavorites(getFavoriteMovies());
    setLoading(false);
  }, []);

  const handleRemove = (id) => {
    removeFavoriteMovie(id);
    setFavorites(getFavoriteMovies());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-20 h-20 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="text-lg mb-4">찜한 영화가 없습니다.</p>
        <Link to="/movies/popular" className="text-red-500 underline hover:text-red-400 transition">
          인기 영화 목록으로 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">찜 목록</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {favorites.map((movie) => (
          <div key={movie.id} className="relative group">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-2 right-2 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="찜 해제"
              title="찜 해제"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      {/* <div className="mt-10">
        <Link to="/movies/popular" className="text-red-500 underline hover:text-red-400 transition">
          인기 영화 목록으로 돌아가기
        </Link>
      </div> */}
    </div>
  );
}
