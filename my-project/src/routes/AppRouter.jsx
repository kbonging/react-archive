// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieListPage from "../pages/MovieListPage";
import MovieDetailPage from "../pages/MovieDetailPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 풀경로로 각각 선언 */}
      <Route
        path="/movies/now_playing"
        element={<MovieListPage category="now_playing" />}
      />
      <Route
        path="/movies/upcoming"
        element={<MovieListPage category="upcoming" />}
      />
      <Route
        path="/movies/trending"
        element={<MovieListPage category="trending" />}
      />
      <Route
        path="/movies/favorite"
        element={<MovieListPage category="favorite" />}
      />

      <Route path="/movies/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}
