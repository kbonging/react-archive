// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import Home             from "../pages/Home";
import MovieListPage    from "../pages/MovieListPage";
import MovieDetailPage  from "../pages/MovieDetailPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:category" element={<MovieListPage/>} />
      <Route path="/movies/detail/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}
