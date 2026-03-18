import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";
import Footer from "../components/Footer";

export default function PastLives() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const pastLives = content.pastLives || siteContent.en.pastLives;

  return (
    <>
      <Navbar />

      <div
        className="bg-image"
        style={{
          backgroundImage: "url('/assets/pastlives/cave.png')",
        }}
      />

      <section className="page">
        <div className="card">
          <h1>{pastLives.title}</h1>

          <p>{pastLives.intro}</p>

          <h2>{pastLives.purposeTitle}</h2>
          <p>{pastLives.purposeText}</p>

          <h2>{pastLives.conceptTitle}</h2>
          <p>{pastLives.conceptText1}</p>
          <p>{pastLives.conceptText2}</p>
          <p>{pastLives.conceptText3}</p>
          <p>{pastLives.conceptQuestion}</p>

          <h2>{pastLives.chaptersTitle}</h2>

          <ul>
            <li>
              <strong>{pastLives.chapter1Title}</strong>
              <p>{pastLives.chapter1Text1}</p>
              <p>{pastLives.chapter1Text2}</p>
              <p>{pastLives.chapter1Text3}</p>
            </li>

            <li>
              <strong>{pastLives.chapter2Title}</strong>
              <p>{pastLives.chapter2Text1}</p>
              <p>{pastLives.chapter2Text2}</p>
              <p>{pastLives.chapter2Text3}</p>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}