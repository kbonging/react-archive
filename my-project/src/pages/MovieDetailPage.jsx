// src/pages/MovieDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../api/tmdb";
import { isFavoriteMovie, addFavoriteMovie, removeFavoriteMovie } from "../api/favorites";
import usePageTitle from "../hooks/usePageTitle";

export default function MovieDetailPage() {
  const { id } = useParams();           // URL에서 movie ID를 받아옴
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // 찜 여부 설정

  usePageTitle(movie ? `${movie.title} | PVING` : "영화 상세페이지 | PVING");

  // 1) 영화 기본 상세 정보 로딩
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchMovieDetails(id)
    .then((data) => {
      setMovie(data);
      setIsLiked(isFavoriteMovie(data.id));
    })
    .catch((err) => {
      console.error(err);
      setError("영화 상세 정보를 불러오는 중 오류가 발생했습니다.");
    });
  }, [id]);
  
  // 2) 영화 출연진(credits) 로딩
  useEffect(() => {
    fetchMovieCredits(id)
    .then((data) => {
      setCredits(data.cast || []);
    })
    .catch((err) => {
      console.error(err);
      // 출연진 실패는 치명적이지 않으니 에러 메시지만 콘솔에 남김
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  // 찜 버튼 
  const toggleFavorite = () => {
    if (!movie) return;

    if (isLiked) {
      removeFavoriteMovie(movie.id);
      setIsLiked(false);
    } else {
      addFavoriteMovie(movie);
      setIsLiked(true);
    }
  };

  if (loading || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 배경 이미지 URL
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  // 출연진 상위 5명만 표시
  const topCast = credits.slice(0, 5);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen">
        <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-start gap-8">
          {/* 좌측: 텍스트 */}
          <div className="flex-1 text-white space-y-6">
            <h1 className="text-5xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap items-center space-x-3 text-sm">
              <span className="px-2 py-1 bg-red-600 rounded">15+</span>
              <span className="px-2 py-1 bg-gray-800 rounded">
                {movie.release_date.slice(0, 4)}
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded">
                {movie.genres.map((g) => g.name).join(", ")}
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>

            <div className="flex space-x-4">
              <button onClick={toggleFavorite} className="flex items-center space-x-2 p-2">
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                )}
                <span className={`text-sm font-medium ${isLiked ? "text-red-500" : "text-gray-500"}`}>
                  찜
                </span>
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600"
              >
                뒤로가기
              </Link>
            </div>

            <p className="leading-relaxed">{movie.overview}</p>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="font-semibold mb-1">제작사</dt>
                <dd>
                  {movie.production_companies
                    .map((c) => c.name)
                    .join(", ") || "정보 없음"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">출연</dt>
                {topCast.length > 0 ? (
                  <dd>
                    {topCast.map((c, i) => (
                      <span key={c.cast_id}>
                        {c.name}
                        {i < topCast.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    {credits.length > topCast.length && " 외 ..."}
                  </dd>
                ) : (
                  <dd>정보 없음</dd>
                )}
              </div>
            </dl>
          </div>

          {/* 우측: 포스터 */}
          <div className="w-64 flex-shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-poster.png"
              }
              alt={movie.title}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
