import { useParams } from "react-router-dom"; 
// 이부분 수정할게요 봉중이형 라우터 좀 수정해서 상세페이지 로 이동하려면 경로가 중복이되서 카테고리 랑 상세랑 이렇게 수정했어어
import { useEffect, useState } from "react";
import { fetchMoviesByCategory } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

const CATEGORY_TITLES = {
  now_playing: "상영중",
  popular: "인기",
  upcoming: "개봉 예정",
  top_rated: "최고 평점",
  favorite: "찜 목록",
  trending: "오늘의 영화",
};

export default function MovieListPage() {
  const { category } = useParams(); // URL: /movies/:category  
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 존재 여부

  // 초기 및 카테고리 변경 시 1페이지 불러오기
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);

    fetchMoviesByCategory(category, 1)
      .then((data) => {
        if (data && data.length > 0) {
          setMovies(data);
          if (data.length < 20) setHasMore(false); // 20개 미만이면 더 없음으로 처리 (API 페이지당 20개 가정)
        } else {
          setMovies([]);
          setHasMore(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [category]);

  // 더보기 클릭 핸들러
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchMoviesByCategory(category, nextPage);
      if (data && data.length > 0) {
        setMovies((prev) => [...prev, ...data]);
        setCurrentPage(nextPage);
        if (data.length < 20) setHasMore(false); // 다음 페이지도 20개 미만이면 끝
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setError("추가 영화 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white py-10">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-20 h-20 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-10">{error}</div>
      ) : (
        <>
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">
              {CATEGORY_TITLES[category] || "영화"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 ">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="w-[1000px] y-30 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="더보기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-12 h-12 text-red-500"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
            </div>
          )}
          {loadingMore && (
            <>
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-20 h-20 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-center mt-4 text-white">더 불러오는 중...</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
