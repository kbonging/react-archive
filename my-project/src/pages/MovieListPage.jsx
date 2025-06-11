// src/pages/MovieListPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

const CATEGORY_TITLES = {
  now_playing: "상영중",
  popular: "인기",
  upcoming: "개봉 예정",
  top_rated: "최고 평점",
  favorite: "찜 목록",
};

export default function MovieListPage(){
  const { category } = useParams(); // URL: /movies/:category
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchMultiplePages = async () => {
      try {
        const pagesToFetch = 3; // 3페이지 = 60개 영화
        let collectedMovies = [];

        for(let page = 1; page <= pagesToFetch; page++){
          const data = await fetchMoviesByCategory(category, page);
          console.log(data);
          if(data){
            collectedMovies = collectedMovies.concat(data);
          }
        }

        setMovies(collectedMovies);
      } catch(e) {
        console.log(e);
        setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMultiplePages();

  }, [category]);
    if(loading) return <div className="text-white p-10">로딩 중...</div>;
  return (
    <div className="bg-black min-h-screen text-white py-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">
            {CATEGORY_TITLES[category] || "영화"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
        </div>
    </div>
  );
}