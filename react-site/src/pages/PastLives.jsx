import Navbar from "../components/Navbar";
import { useParams, useSearchParams } from "react-router-dom";
import { artData } from "../data/artData";
import { siteContent } from "../content/siteContent";
import Footer from "../components/Footer";

export default function PastLives() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const pastLives = content.pastLives || siteContent.en.pastLives;

  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const previousArtwork = artData.find((item) => item.slug === from);

  const backLabel = {
    en: "Back to artwork",
    tr: "Sanat eserine geri dön",
    no: "Tilbake til kunstverket",
  };


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
  {previousArtwork && (
    <div style={{ maxWidth: "960px", margin: "20px auto 0" }}>
      <div className="back-card">
        <a href={`/${lang || "en"}/${previousArtwork.slug}/`}>
          ← {backLabel[lang] || backLabel.en}
        </a>
      </div>
    </div>
  )}

  <div
  className="card"
  style={previousArtwork ? { marginTop: "20px" } : {}}
>

  <h1 style={{
  fontWeight: 300,
  letterSpacing: "0.12em"
}}>
  {pastLives.title}
  {lang === "tr" && " (Geçmiş Hayatlar)"}
</h1>

          <p>{pastLives.intro}</p>

          <h2>{pastLives.purposeTitle}</h2>
          <p>{pastLives.purposeText}</p>



          <h2>{pastLives.chaptersTitle}</h2>

          <ul>
            <li>
              <strong>{pastLives.chapter1Title}</strong>
              <video
                className="chapter-video"
                src="/assets/pastlives/earlyhumanprocess.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
              <p>{pastLives.chapter1Text1}</p>
              <p>{pastLives.chapter1Text2}</p>
              <p>{pastLives.chapter1Text3}</p>
            </li>

            <li>
              <strong>{pastLives.chapter2Title}</strong>
              <video
                  className="chapter-video"
                  src="/assets/pastlives/waterplanetprocess.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              <p>{pastLives.chapter2Text1}</p>
              <p>{pastLives.chapter2Text2}</p>
              <p>{pastLives.chapter2Text3}</p>
            </li>

           {/* Chapter 3 */}
{pastLives.chapter3Title && (
  <li>
    <strong>{pastLives.chapter3Title}</strong>

    <p>{pastLives.chapter3Text1}</p>
    <p className="chapter-quote">{pastLives.chapter3Text2}</p>
    <p>{pastLives.chapter3Text3}</p>
  </li>
)}
          </ul>
          <h2>{pastLives.conceptTitle}</h2>

<div className="concept-text">
  <p>{pastLives.conceptText1}</p>
  <p>{pastLives.conceptText2}</p>
  <p>{pastLives.conceptText3}</p>
  <p>{pastLives.conceptQuestion}</p>
</div>
        </div>
      </section>

      <Footer />
    </>
  );
}