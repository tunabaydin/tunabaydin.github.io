import "./App.css";
import { useEffect } from "react";
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { languageTags, localizedLocation } from "./locales";
import { redirectForLocation, supportedPaths } from "./siteRoutes";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import PastLives from "./pages/PastLives";
import DetailRouter from "./pages/DetailRouter";

const notFoundLabels = {
  en: ["Page not found", "Back to home"],
  tr: ["Sayfa bulunamadı", "Ana sayfaya dön"],
  no: ["Siden ble ikke funnet", "Tilbake til forsiden"],
};

function NotFound() {
  const { lang } = useParams();
  const normalized = lang?.toLowerCase();
  const language = Object.hasOwn(languageTags, normalized) ? normalized : "en";
  const [heading, home] = notFoundLabels[language];

  useEffect(() => {
    document.documentElement.lang = languageTags[language];
  }, [language]);

  return (
    <main className="page">
      <div className="card">
        <h1>{heading}</h1>
        <Link to={`/${language}/`}>{home}</Link>
      </div>
    </main>
  );
}

function LocalizedRoutes() {
  const { lang } = useParams();
  const location = useLocation();
  const normalized = lang.toLowerCase();
  const language = Object.hasOwn(languageTags, normalized) ? normalized : "en";

  useEffect(() => {
    document.documentElement.lang = languageTags[language];
  }, [language]);

  if (lang !== language) {
    const target = localizedLocation(location, language);
    const route = target.pathname.replace(/\/$/, "") + "/";
    return /^[a-z]{2}$/i.test(lang) && supportedPaths.has(route)
      ? <Navigate to={target} replace />
      : <NotFound />;
  }

  return <Outlet />;
}

function App() {
  const redirect = redirectForLocation(useLocation());

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <Routes>
      <Route path="/:lang" element={<LocalizedRoutes />}>
        <Route index element={<Home />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="pastlives" element={<PastLives />} />
        <Route path=":slug" element={<DetailRouter missingPage={<NotFound />} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;