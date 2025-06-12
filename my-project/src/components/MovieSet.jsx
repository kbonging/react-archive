// src/components/MovieRow.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const CARD_WIDTH = 160 + 24; // 카드 너비 + 마진

export default function MovieSet({ movies, title }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // 스크롤 버튼 활성화
  const updateScrollButtons = () => {
    const el = rowRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const el = rowRef.current;
    if (el) el.addEventListener("scroll", updateScrollButtons);
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [movies]);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * CARD_WIDTH, behavior: "smooth" });
    }
  };

  // 드래그 핸들러
  const onMouseDown = (e) => {
    if (!e.target.closest(".card-item")) return;
    isDragging.current = true;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollStart.current = rowRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = x - startX.current;
    rowRef.current.scrollLeft = scrollStart.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative h-[320px] ">
      <h2 className="text-2xl font-bold text-white mb-4 mt-4 px-4 pt-4">{title}</h2>
      {canScrollLeft && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80"
          onClick={() => scroll(-1)}
        >
          <FaChevronLeft className="text-white" />
        </button>
      )}
      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80"
          onClick={() => scroll(1)}
        >
          <FaChevronRight className="text-white" />
        </button>
      )}
      <div
        ref={rowRef}
        className="flex space-x-6 overflow-hidden px-4"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card-item min-w-[160px] flex-shrink-0 cursor-pointer hover:scale-105 transform transition scroll-snap-align-start"
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-[160px] h-[240px] object-cover shadow-lg"
              draggable={false}
            />
            {/* <p className="mt-2 text-center text-white text-sm truncate">
              {movie.title}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
