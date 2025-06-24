import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-8xl font-bold text-gray-800 mb-[25px]">404</h1>
      <p className="text-xl text-gray-600 mb-[80px]">페이지를 찾을 수 없습니다.</p>

      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
