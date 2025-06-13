// scr/api/favorites.js

// import axios from "axios";

const STORAGE_KEY = "favorite_movies";

export function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}