import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
<div className="w-full rounded-lg overflow-hidden shadow-md">
  <img
    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-auto object-cover"
  />
  {/* <p className="mt-2 text-white text-center truncate">{movie.title}</p> */}
</div>
  );
}
