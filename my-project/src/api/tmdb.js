import axios from "axios";

const API_KEY = "756004d44a98ff07e34549cdd940f3c4";
const BASE_URL = "https://api.themoviedb.org/3";

const categoryMap = {
  popular: "/movie/popular", // 인기 영화
  now_playing: "/movie/now_playing", // 현재 상영중
  upcoming: "/movie/upcoming", // 개봉 예정 (이거 이미 개봉한 내용도 나옴)
  trending: "/trending/movie/day", // 오늘의 영화화
  top_rated: "/movie/top_rated" // 최고 평점
  // 필요한 경우 사용자 정의 로직도 가능
};

export async function fetchMoviesByCategory(category, page = 1) {
  const endpoint = categoryMap[category];
  if (!endpoint) throw new Error(`지원하지 않는 카테고리: ${category}`);

  const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
    params: { api_key: API_KEY, language: "ko-KR", page, region:"KR" },
  });

  return data.results;
}

//검색기능
export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) throw new Error("검색 중 오류 발생");
  return res.json(); // { page, results: [ {...}, ... ], total_pages, total_results }
}

//상세페이지 호출
export async function fetchMovieDetails(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY, language: "ko-KR" },
  });
  return data;
}

//출연자 정보 요청
export async function fetchMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=ko`);
  if (!res.ok) throw new Error('출연진 정보를 불러오는 중 오류가 발생했습니다.');
  return res.json();  // { cast: [...], crew: [...] }
}

// export async function fetchTrending() {
//   const { data } = await axios.get(`${BASE_URL}/trending/movie/week`, {
//     params: { api_key: API_KEY },
//   });
//   return data.results;
// }
// export async function fetchPopular(page = 1) {
//   const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
//     params: { api_key: API_KEY, page },
//   });
//   return data.results;
// }

// // 현재 상영중
// export async function fetchNowPlaying(page = 1) {
//   const { data } = await axios.get(`${BASE_URL}/movie/now_playing?language=ko-KR`, {
//     params: { api_key: API_KEY, page },
//   });
//   return data.results;
// }
