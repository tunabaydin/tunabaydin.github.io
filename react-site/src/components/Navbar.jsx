import { Link, useLocation, useParams } from "react-router-dom";
import { languageTags, localizedLocation } from "../locales";
import { siteContent } from "../content/siteContent";
import useFixedElementHeight from "../hooks/useFixedElementHeight";

export default function Navbar() {
  const { lang } = useParams();
  const navRef = useFixedElementHeight("--nav-height");

  const content = siteContent[lang] || siteContent.en;
  const currentLang = lang || "en";
  const beginningLabels = {
  en: "Back to the beginning",
  tr: "Başlangıca dön",
  no: "Tilbake til begynnelsen",
};
  const location = useLocation();

  return (
    <nav ref={navRef} className="top-nav" aria-label="Primary">
      <div className="nav-inner">
        <div className="nav-main">
          <a className="nav-item" href={`/${currentLang}/welcome`}>
  {beginningLabels[currentLang] || beginningLabels.en}
</a>
         <a className="nav-item" href={`/${currentLang}/#top`}>{content.nav.home}</a>
<a className="nav-item" href={`/${currentLang}/#home-art`}>{content.nav.art}</a>
<a className="nav-item" href={`/${currentLang}/#home-projects`}>{content.nav.projects}</a>
<a className="nav-item" href={`/${currentLang}/#home-artist`}>{content.nav.artist}</a>
<a className="nav-item" href={`/${currentLang}/#home-contact`}>{content.nav.contact}</a>
        </div>

        <div className="nav-lang" aria-label="Language">
          {Object.keys(languageTags).map((language) => (
            <Link
              key={language}
              className="nav-item lang-item"
              to={localizedLocation(location, language)}
            >
              {language.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
