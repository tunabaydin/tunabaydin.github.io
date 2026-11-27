import "./App.css";
import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { languageTags, localizedLocation } from "./locales";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import PastLives from "./pages/PastLives";
import DetailRouter from "./pages/DetailRouter";

function LocalizedRoutes() {
  const { lang } = useParams();
  const location = useLocation();
  const normalized = lang.toLowerCase();
  const language = Object.hasOwn(languageTags, normalized) ? normalized : "en";

  useEffect(() => {
    document.documentElement.lang = languageTags[language];
  }, [language]);

  if (lang !== language) {
    return <Navigate to={localizedLocation(location, language)} replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en/welcome" replace />} />
      <Route path="/:lang" element={<LocalizedRoutes />}>
        <Route index element={<Home />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="pastlives" element={<PastLives />} />
        <Route path=":slug" element={<DetailRouter />} />
      </Route>
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;