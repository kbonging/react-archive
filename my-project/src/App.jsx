// src/App.jsx

import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* 컨텍스트추가할거면 추가 */}
        <Header />
        <AppRouter />
        {/* 컨텍스트추가할거면 추가 */}
      </BrowserRouter>
    </>
  );
}
