import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<Home />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;