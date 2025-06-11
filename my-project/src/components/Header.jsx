// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const popularSearches = [
  "월드 오브 스트릿 우먼 파이터",
  "나나민박 with 세븐틴",
  "진격의 거인",
  "짱구는 못말려 24",
  "명탐정 코난 2025 (자막)",
  "유 퀴즈 온 더 블럭",
  "벌거벗은 세계사",
  "수하유편홍방자 : 그 시절, 우리",
  "한문철의 블랙박스 리뷰",
  "짱구는 못말려 10",
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const onSearch = (term) => {
    setRecentSearches((prev) =>
      prev.includes(term) ? prev : [term, ...prev].slice(0, 5)
    );
    setSearchOpen(false);
  };

  return (
    <>
      {/* 1) 고정 헤더 */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-lg backdrop-blur-sm">
        <div className="max-w-full px-4 flex items-center justify-between h-16">
          {/* 로고 + 네비게이션 (원본 그대로) */}
          <div className="flex items-center gap-x-12">
            <div className="text-red-600 text-3xl font-extrabold drop-shadow-lg">
              PVING
            </div>
              <nav className="flex items-center space-x-7 text-sm font-semibold">
                <Link to="/movies/now_playing" className="relative text-[#d9d9d9] hover:text-red-500 group">
                  상영중
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
                <Link to="/movies/Upcoming" className="relative text-[#d9d9d9] hover:text-red-500 group">
                  개봉 예정
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
                <Link to="/movies/Genres" className="relative text-[#d9d9d9] hover:text-red-500 group">
                  장르별
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
                <Link to="/movies/favorite" className="relative text-[#d9d9d9] hover:text-red-500 group">
                  찜 목록
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </nav>
          </div>

          {/* 검색 아이콘 + 프로필 */}
          <div className="flex items-center gap-x-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="focus:outline-none text-white hover:text-red-500 transition-colors duration-300"
              aria-label="검색 열기"
            >
              {/* Search SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              className="focus:outline-none text-white hover:text-red-500 transition-colors duration-300"
              aria-label="프로필"
            >
              {/* UserCircle SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2) 모달 오버레이 */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-95 z-40"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {/* 3) 슬라이드 패널 래퍼 (top-0) */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transform transition-all duration-300 ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* 내부 컨테이너만 헤더 높이(4rem) 만큼 아래로 */}
        <div className="mt-[130px] w-full bg-black bg-opacity-0 px-4 py-6 space-y-6">
          {/* 검색 입력창 (밑줄만) */}
          <div className="flex items-center px-[150px]">
            <input
              type="text"
              placeholder="제목, 인물명을 입력해보세요."
              className="flex-grow bg-transparent placeholder-gray-400 text-white text-lg focus:outline-none border-b border-white pb-1"
              onKeyDown={(e) => {
                const v = e.currentTarget.value.trim();
                if (e.key === "Enter" && v) onSearch(v);
              }}
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="ml-4 focus:outline-none text-white hover:text-red-500 transition-colors duration-300"
              aria-label="검색 닫기"
            >
              {/* X SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* 2-컬럼: 최근 검색어 / 인기 검색어 */}
          <div className="grid grid-cols-2 gap-x-12 text-white px-[150px]">
            {/* 좌측: 최근 검색어 */}
            <div>
              <h3 className="text-lg font-semibold mb-2">최근 검색어</h3>
              {recentSearches.length > 0 ? (
                <ul className="space-y-1 text-gray-200">
                  {recentSearches.map((term, idx) => (
                    <li
                      key={idx}
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => onSearch(term)}
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">검색 내역이 없습니다.</p>
              )}
            </div>

            {/* 우측: 실시간 인기 검색어 */}
            <div>
              <h3 className="text-lg font-semibold mb-2">실시간 인기 검색어</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-200">
                {popularSearches.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-6 inline-block text-red-600 font-bold">
                      {idx + 1}
                    </span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-gray-500">
                {new Date().toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                기준
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
