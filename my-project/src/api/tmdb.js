import axios from "axios";

const API_KEY = "api키";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrending() {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return data.results;
}

export async function fetchPopular(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page },
  });
  return data.results;
}

export async function fetchNowPlaying(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/now_playing?language=ko-KR`, {
    params: { api_key: API_KEY, page },
  });
  return data.results;
}