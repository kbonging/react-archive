// src/App.jsx
import Home from "./pages/Home";
import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* 컨텍스트추가할거면 추가 */}
        <Header />
        <Home>
          <AppRouter />
        </Home>
        {/* 컨텍스트추가할거면 추가 */}
      </BrowserRouter>
    </>
  );
}
