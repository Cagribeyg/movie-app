import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import MovieDetailPage from "./pages/MoviePage/MovieDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
