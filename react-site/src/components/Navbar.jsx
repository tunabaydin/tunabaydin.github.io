import { useLocation, useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export default function Navbar() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const currentLang = lang || "en";
  const location = useLocation();
  const pathAfterLang = location.pathname.replace(/^\/(en|tr|no)/, "") || "";

  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="nav-inner">
        <div className="nav-main">
         <a className="nav-item" href={`/${currentLang}/#top`}>{content.nav.home}</a>
<a className="nav-item" href={`/${currentLang}/#home-art`}>{content.nav.art}</a>
<a className="nav-item" href={`/${currentLang}/#home-projects`}>{content.nav.projects}</a>
<a className="nav-item" href={`/${currentLang}/#home-artist`}>{content.nav.artist}</a>
<a className="nav-item" href={`/${currentLang}/#home-contact`}>{content.nav.contact}</a>
        </div>

        <div className="nav-lang" aria-label="Language">
         <a className="nav-item lang-item" href={`/en${pathAfterLang}`}>EN</a>
<a className="nav-item lang-item" href={`/tr${pathAfterLang}`}>TR</a>
<a className="nav-item lang-item" href={`/no${pathAfterLang}`}>NO</a>
        </div>
      </div>
    </nav>
  );
}