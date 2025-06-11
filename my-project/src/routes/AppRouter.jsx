import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MovieListPage from "../pages/MovieListPage";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:category" element={<MovieListPage />}/>
      </Routes>
    </>
  );
}
