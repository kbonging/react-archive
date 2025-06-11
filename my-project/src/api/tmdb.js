import axios from "axios";

const API_KEY = "api키";
const BASE_URL = "https://api.themoviedb.org/3";

const categoryMap = {
  popular: "/movie/popular",
  now_playing: "/movie/now_playing",
  upcoming: "/movie/upcoming",
  trending: "/trending/movie/week",
  // 필요한 경우 사용자 정의 로직도 가능
};

export async function fetchMoviesByCategory(category, page = 1) {
  const endpoint = categoryMap[category];
  if (!endpoint) throw new Error(`지원하지 않는 카테고리: ${category}`);
  
  const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
    params: { api_key: API_KEY, language: "ko-KR", page },
  });
  
  return data.results;
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