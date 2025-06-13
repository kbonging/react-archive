// scr/api/favorites.js

// import axios from "axios";

const STORAGE_KEY = "favorite_movies";

// 찜 목록 조회
export function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// 찜 목록에서 현재 영화를 찜 했는지 유무
export function isFavoriteMovie(id) {
  const favorites = getFavoriteMovies();
  return favorites.some((movie) => movie.id === Number(id));
}

// 찜 등록
export function addFavoriteMovie(movie) {
  const favorites = getFavoriteMovies();
  if (!isFavoriteMovie(movie.id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites, movie]));
  }
}

// 찜 삭제
export function removeFavoriteMovie(id) {
  const favorites = getFavoriteMovies();
  const updated = favorites.filter((movie) => movie.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}