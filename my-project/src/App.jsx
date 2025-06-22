// src/App.jsx

import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
<div className="pt-[30px] bg-black text-white min-h-screen flex flex-col">
  <Header />
  <div className="flex-grow">
    <AppRouter />
  </div>
  <Footer />
</div>

      </BrowserRouter>
    </>
  );
}
