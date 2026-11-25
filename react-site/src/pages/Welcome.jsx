import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { spaceImages } from "../data/spaceImages";
import "./Welcome.css";

const labels = {
  en: {
    welcome: "Welcome.",
    question: "What do you feel like doing?",
    art: "Browse art",
    explore: "Explore in any direction",
    about: "Get to know me",
    another: "Show me something else in the universe",
  },
  tr: {
    welcome: "Hoş geldiniz.",
    question: "Ne yapmak istersiniz?",
    art: "Sanat eserlerini keşfet",
    explore: "Dilediğin yönde keşfe çık",
    about: "Beni tanı",
    another: "Evrende başka bir şey göster",
  },
  no: {
    welcome: "Velkommen.",
    question: "Hva har du lyst til å gjøre?",
    art: "Utforsk kunsten",
    explore: "Utforsk i hvilken som helst retning",
    about: "Bli kjent med meg",
    another: "Vis meg noe annet i universet",
  },
};

export default function Welcome() {
  const { lang } = useParams();
  const currentLang = labels[lang] ? lang : "en";
  const text = labels[currentLang];

  const [spaceIndex, setSpaceIndex] = useState(
    () => Math.floor(Math.random() * spaceImages.length)
  );

  const space = spaceImages[spaceIndex];

  const nextSpace = () => {
    setSpaceIndex(
      (previous) => (previous + 1) % spaceImages.length
    );
  };

  return (
    <main className="welcome-page">
      <div
        key={space.src}
        className="welcome-background"
        style={{ backgroundImage: `url("${space.src}")` }}
      />

      <div className="welcome-overlay" />

      <nav className="welcome-languages">
        {["en", "tr", "no"].map((language) => (
          <Link
            key={language}
            to={`/${language}/welcome`}
            className={currentLang === language ? "active" : ""}
          >
            {language.toUpperCase()}
          </Link>
        ))}
      </nav>

      <div className="welcome-content">
        <div className="welcome-name">Tuna Baydin</div>

        <h1>{text.welcome}</h1>
        <p>{text.question}</p>

       <div className="welcome-options">
  <Link to={`/${currentLang}#home-art`}>
    {text.art}
  </Link>

  <Link to={`/${currentLang}#home-artist`}>
    {text.about}
  </Link>

  <Link to={`/${currentLang}`}>
    {text.explore}
  </Link>

  <button type="button" onClick={nextSpace}>
    {text.another}
  </button>
</div>
      </div>

      <div className="welcome-credit">
  <div className="welcome-image-title">
    {space.title}
  </div>

  <a
    href={space.source}
    target="_blank"
    rel="noopener noreferrer"
  >
    {space.credit}
  </a>

  {space.acknowledgement && (
    <div>
      Acknowledgement: {space.acknowledgement}
    </div>
  )}

  <div className="welcome-license">
    <a
      href="https://creativecommons.org/licenses/by/4.0/"
      target="_blank"
      rel="noopener noreferrer"
    >
      CC BY 4.0
    </a>
    {" · Animated and darkened for display"}
  </div>
</div>
    </main>
  );
}
