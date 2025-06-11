import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <div className="card-item min-w-[160px] flex-shrink-0 cursor-pointer hover:scale-105 transform transition scroll-snap-align-start">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg w-[160px] h-[240px] object-cover shadow-lg"
        draggable={false}
      />
      {/* 아래 텍스트 영역은 옵션 */}
      {/* 
      <p className="mt-2 text-center text-white text-sm truncate">
        {movie.title}
      </p> 
      */}
    </div>
  );
}
