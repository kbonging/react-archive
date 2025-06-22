import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import useDebounced from "../hooks/useDebounced";
import MovieCard from "./MovieCard";
import { MENU_ITEMS } from "../util/constants";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);// 검색창 열림 여부 (데스크탑 슬라이드용)
  const [menuOpen, setMenuOpen] = useState(false);    // 모바일 햄버거 메뉴 열림 여부
  const [query, setQuery] = useState("");               // 검색어 입력값
  const debouncedQuery = useDebounced(query, 300);      // 디바운스된 검색어
  const [results, setResults] = useState([]);            // 검색 결과 배열
  const location = useLocation();
  const menuItems = MENU_ITEMS;

  // 브라우저 너비가 770px 이상으로 바뀌면 상태 초기화 해서 모바일 버전때 나오는 검색을 닫아주는 역할 
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 770) {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 검색어가 입력되면 API 호출
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    searchMovies(debouncedQuery)
      .then((data) => setResults(data.results || []))
      .catch(() => setResults([]));
  }, [debouncedQuery]);

  // 검색 제출 함수 
  const onSearch = (term) => {
    const t = term.trim();
    if (!t) return;
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* 고정 헤더 */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-lg backdrop-blur-sm">
        <div className="mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-x-8">
            <Link to="/">
              <div className="text-red-600 text-3xl font-extrabold drop-shadow-lg">
                PVING
              </div>
            </Link>

            {/* 데스크탑 메뉴 */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold">
              {menuItems.map(({ path, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative ${
                      isActive ? "text-red-500" : "text-[#d9d9d9]"
                    } hover:text-red-500 group`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 검색 & 햄버거 */}
          <div className="flex items-center gap-x-4">
            {/* 데스크탑 검색 */}
            <button
              onClick={() => {
                setSearchOpen((o) => !o);
                setQuery("");
                setResults([]);
              }}
              className="hidden md:block p-2 hover:text-red-500"
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

            {/* 모바일 햄버거 */}
            <button
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setQuery("");
                setResults([]);
              }}
              className="md:hidden p-2"
              aria-label="햄버거 메뉴 열기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 슬라이드 검색창 */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-80 z-40 transition-opacity duration-300 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSearchOpen(false)}
      />

      {/* 슬라이드 검색창 (항상 렌더링됨) */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 transform ease-in-out ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full bg-gray-700 opacity-95 px-4 py-32 h-screen text-white z-50">
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
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

          <div className="pt-5 px-[100px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-2 max-h-full overflow-y-auto hide-scrollbar">
            {results.length > 0 ? (
              results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSearch={onSearch} />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-32">
                <p className="text-gray-400 text-center text-sm">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 z-50 px-6 py-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xl font-bold">메뉴</span>
            <button onClick={() => setMenuOpen(false)} className="text-white">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
              placeholder="검색어 입력"
              className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
            />
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto hide-scrollbar mb-4">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSearch={onSearch} />
              ))}
            </div>
          )}
          {query && results.length === 0 && (
            <p className="text-gray-400 text-center text-sm mb-4">검색 결과가 없습니다.</p>
          )}

          <nav className="flex flex-col space-y-4 text-white font-semibold ">
            {menuItems.map(({ path, label }) => (
              <Link className="hover:bg-red-700 hover:rounded-md" key={path} to={path} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
