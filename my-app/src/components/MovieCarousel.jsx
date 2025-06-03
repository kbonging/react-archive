// components/MovieCarousel.jsx
import React, { useRef, useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { movieImages } from '../assets/movieImages';

export default function MovieCarousel({ currentIndex, setCurrentIndex }) {
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollAmount = 184;

  const handleScroll = (direction) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const checkScrollEnd = () => {
    const container = containerRef.current;
    if (!container) return;
    const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
    setShowMore(isEnd);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkScrollEnd);
    return () => container.removeEventListener('scroll', checkScrollEnd);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX);
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="bg-black mt-2 pb-12">
      <div className="w-full px-8 md:px-16 lg:px-24 relative">
        <h2 className="text-2xl font-bold text-white mb-6">추천 영화</h2>

        {/* 좌측 이동 버튼 */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 pl-2">
          <button
            onClick={() => handleScroll(-1)}
            className="bg-black bg-opacity-60 p-3 rounded-full hover:bg-opacity-80"
          >
            <i className="fas fa-chevron-left text-white"></i>
          </button>
        </div>

        {/* 우측 이동 버튼 */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pr-2">
          <button
            onClick={() => handleScroll(1)}
            className="bg-black bg-opacity-60 p-3 rounded-full hover:bg-opacity-80"
          >
            <i className="fas fa-chevron-right text-white"></i>
          </button>
        </div>

        {/* 카드 리스트 */}
        <div
          ref={containerRef}
          className={`flex space-x-6 overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '1rem', paddingRight: '1rem' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {movieImages.map((src, idx) => (
            <MovieCard
              key={idx}
              index={idx}
              image={src}
              title={src.includes('베테랑') ? '베테랑' : src.includes('venom') ? 'Venom' : '아이언맨'}
              onClick={() => handleCardClick(idx)}
              selected={idx === currentIndex}
            />
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* 더보기 버튼 */}
        {showMore && (
          <button
            onClick={() => alert('더 많은 영화를 불러옵니다...')}
            className="absolute top-[-25px] right-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg z-20"
          >
            ...
          </button>
        )}
      </div>
    </section>
  );
}