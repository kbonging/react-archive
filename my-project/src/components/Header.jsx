// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import useDebounced from "../hooks/useDebounced";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 300);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    searchMovies(debouncedQuery)
      .then((data) => setResults(data.results || []))
      .catch(() => setResults([]));
  }, [debouncedQuery]);

  const onSearch = (term) => {
    const t = term.trim();
    if (!t) return;
    setSearchOpen(false);
    navigate(`/search?query=${encodeURIComponent(t)}`);
  };

  return (
    <>
      {/* 1) 고정 헤더 */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-lg backdrop-blur-sm">
        <div className=" mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 + 네비게이션 */}
          <div className="flex items-center gap-x-8">
            <Link to="/">
              <div className="text-red-600 text-3xl font-extrabold drop-shadow-lg">
                PVING
              </div>
            </Link>
            <nav className="flex items-center space-x-7 text-sm font-semibold">
              <Link
                to="/movies/now_playing"
                className="relative text-[#d9d9d9] hover:text-red-500 group"
              >
                상영중
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              <Link
                to="/movies/upcoming"
                className="relative text-[#d9d9d9] hover:text-red-500 group"
              >
                개봉 예정
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              <Link
                to="/movies/trending"
                className="relative text-[#d9d9d9] hover:text-red-500 group"
              >
                오늘의 영화
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              <Link
                to="/movies/favorite"
                className="relative text-[#d9d9d9] hover:text-red-500 group"
              >
                찜 목록
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </nav>
          </div>

          {/* 검색 아이콘 + 프로필 */}
          <div className="flex items-center gap-x-6 relative">
            <button
              onClick={() => {
                setSearchOpen((o) => !o);
                setQuery("");
                setResults([]);
              }}
              className="p-2 hover:text-red-500"
              aria-label="검색 열기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <button className="p-2 hover:text-red-500" aria-label="프로필">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            </button>

            {/* 모달 오버레이 */}
            {searchOpen && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-80 z-40"
                onClick={() => setSearchOpen(false)}
              />
            )}

            {/* 3) 슬라이드 패널 */}
            <div
              className={`fixed inset-x-0 top-0 z-50 transform transition-transform duration-300 ${
                searchOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <div className="mt-16 w-full bg-gray-700 opacity-95 px-4 py-6 h-[calc(100vh-4rem)] text-white">
                {/* 검색창 */}
                <div className="flex items-center justify-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch(query);
                    }}
                    placeholder="제목을 입력해주세요"
                    className="w-2/3 bg-gray-700 border-b border-gray-300 placeholder-gray-300 text-white rounded-none px-4 py-2 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="ml-4 p-2 hover:text-red-500"
                    aria-label="검색 닫기"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* 검색 결과 */}
                <div
                  className="pt-5 px-[100px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-2 max-h-full overflow-y-auto hide-scrollbar"
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                >
                  {results.length > 0 ? (
                    results.map((movie) => {
                      const poster = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "/no-poster.png";
                      return (
                        <Link
                          key={movie.id}
                          to={`/movies/detail/${movie.id}`}
                          onClick={() => onSearch(movie.title)}
                          className="flex flex-col items-center"
                        >
                          <img
                            src={poster}
                            alt={movie.title}
                            className="h-40 rounded-lg mb-1 "
                          />
                          <p className="text-[10px] truncate text-white">
                            {movie.title}
                          </p>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-gray-400">검색 결과가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
