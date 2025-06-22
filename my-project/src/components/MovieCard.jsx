import React from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md bg-black">
        <Link
          key={movie.id}
          to={`/movies/detail/${movie.id}`}
        >
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      {/* <p className="mt-2 text-white text-center truncate">{movie.title}</p> */}
    </div>
  );
}
