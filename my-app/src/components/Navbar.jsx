// components/Navbar.jsx
import React, { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-red-500 text-2xl font-bold">PVING</div>
        <nav className="hidden md:flex space-x-6 ml-8">
          <a href="#" className="hover:text-gray-300">상영중</a>
          <a href="#" className="hover:text-gray-300">개봉 예정</a>
          <a href="#" className="hover:text-gray-300">장르별</a>
          <a href="#" className="hover:text-gray-300">내가 찜한 콘텐츠</a>
        </nav>
        <div className="relative ml-auto hidden md:block">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="bg-gray-800 placeholder-gray-400 text-sm py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <div className="md:hidden ml-auto flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none mr-4"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <button className="focus:outline-none">
            <i className="fas fa-user-circle text-xl"></i>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90">
          <nav className="flex flex-col space-y-2 px-4 py-3">
            <a href="#" className="hover:text-gray-300">상영중</a>
            <a href="#" className="hover:text-gray-300">개봉 예정</a>
            <a href="#" className="hover:text-gray-300">장르별</a>
            <a href="#" className="hover:text-gray-300">내가 찜한 콘텐츠</a>
          </nav>
        </div>
      )}
    </header>
  );
}
