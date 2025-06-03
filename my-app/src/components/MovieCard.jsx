// components/MovieCard.jsx
import React from 'react';

export default function MovieCard({ index, image, title, onClick, selected }) {
  return (
    <div
      className={`min-w-[160px] flex-shrink-0 ${selected ? 'border-4 border-red-600 rounded-lg' : ''}`}
      data-index={index}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="rounded-lg w-[160px] h-[240px] object-cover shadow-lg"
        draggable={false}
      />
      <p className="mt-2 text-center text-white">{title}</p>
    </div>
  );
}