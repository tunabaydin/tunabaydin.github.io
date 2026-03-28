import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PastLives from "./pages/PastLives";
import ArtDetail from "./pages/ArtDetail";
import DetailRouter from "./pages/DetailRouter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<Home />} />
      <Route path="/:lang/pastlives" element={<PastLives />} />
      <Route path="/:lang/:slug" element={<DetailRouter />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;