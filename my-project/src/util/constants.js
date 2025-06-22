export const CATEGORY_API_PATHS = {
  popular: "/movie/popular",
  now_playing: "/movie/now_playing",
  upcoming: "/movie/upcoming",
  trending: "/trending/movie/day",
  top_rated: "/movie/top_rated",
};


export const CATEGORY_TITLES = {
  popular: "인기",
  now_playing: "상영중",
  upcoming: "개봉 예정",
  trending: "오늘의 영화",
  top_rated: "평점순",
  favorite: "찜 목록", // API 연동은 없지만 내부에서 사용
};

export const MENU_ITEMS = [
    { path: "/movies/popular", label: "인기 영화" },
    { path: "/movies/now_playing", label: "상영중" },
    { path: "/movies/upcoming", label: "개봉 예정" },
    { path: "/movies/trending", label: "오늘의 영화" },
    { path: "/movies/top_rated", label: "평점순" },
    { path: "/movies/favorite", label: "찜 목록" },
]