// src/pages/MovieDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../api/tmdb";

export default function MovieDetailPage() {
  const { id } = useParams();           // URL에서 movie ID를 받아옴
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) 영화 기본 상세 정보 로딩
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMovieDetails(id)
      .then((data) => {
        setMovie(data);
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
              <button className="flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200">
                <i className="fas fa-plus text-xl mr-2"></i> 찜하기
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
