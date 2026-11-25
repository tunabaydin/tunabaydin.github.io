
import Navbar from "../components/Navbar";
import { useParams, useSearchParams } from "react-router-dom";
import { artData } from "../data/artData";
import { siteContent } from "../content/siteContent";
import Footer from "../components/Footer";

export default function PastLives() {
  const { lang } = useParams();
  const currentLang = lang || "en";
  const content = siteContent[currentLang] || siteContent.en;
  const pastLives = content.pastLives || siteContent.en.pastLives;

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const previousArtwork = artData.find((item) => item.slug === from);

  const labels = {
  en: {
    back: "Back to artwork",
    home: "Back to home page",
    chapters: "Back to chapters",
    progress: "Work in progress",
    completed: "Completed",
  },
  tr: {
    back: "Sanat eserine geri dön",
    home: "Ana sayfaya geri dön",
    chapters: "Bölümlere geri dön",
    progress: "Yapım aşamasında",
    completed: "Tamamlandı",
  },
  no: {
    back: "Tilbake til kunstverket",
    home: "Tilbake til forsiden",
    chapters: "Tilbake til kapitlene",
    progress: "Under arbeid",
    completed: "Fullført",
  },
};

  const label = labels[currentLang] || labels.en;

  const chapters = [
    {
      id: "earlyhuman",
      number: 1,
      title: `${currentLang === "tr" ? "Bölüm" : currentLang === "no" ? "Kapittel" : "Chapter"} 1: Early Human`,
      image: "/assets/pastlives/earlyhuman.jpg",
      video: "/assets/pastlives/earlyhumanprocess.mp4",
      status: label.progress,
      paragraphs: [
        pastLives.chapter1Text1,
        pastLives.chapter1Text2,
        pastLives.chapter1Text3,
      ],
    },
    {
      id: "thewaterplanet",
      number: 2,
      title: `${currentLang === "tr" ? "Bölüm" : currentLang === "no" ? "Kapittel" : "Chapter"} 2: The Water Planet`,
      image: "/assets/art/thewaterplanet.jpg",
      status: label.completed,
      artworkSlug: "thewaterplanet",
    },
    {
      id: "energybeing",
      number: 3,
      title: `${currentLang === "tr" ? "Bölüm" : currentLang === "no" ? "Kapittel" : "Chapter"} 3: The Energy Being`,
      status: label.progress,
      paragraphs: [
        pastLives.chapter3Text1,
        pastLives.chapter3Text2,
        pastLives.chapter3Text3,
      ],
      quoteIndex: 1,
    },
  ];

  const selectedChapter = chapters.find(
    (chapter) => chapter.id === searchParams.get("chapter")
  );

  const openChapter = (chapter) => {
    if (chapter.artworkSlug) {
      window.location.href = `/${currentLang}/${chapter.artworkSlug}/?from=pastlives`;
      return;
    }

    const next = new URLSearchParams(searchParams);
    next.set("chapter", chapter.id);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 const closeChapter = () => {
  const next = new URLSearchParams(searchParams);
  next.delete("chapter");
  setSearchParams(next);
  window.scrollTo({ top: 0, behavior: "smooth" });
};


if (selectedChapter && !selectedChapter.artworkSlug) {
  const chapterLabel = {
    en: "Chapter",
    tr: "Bölüm",
    no: "Kapittel",
  };

  const chapterTitle = selectedChapter.title
    .replace(/^[^:]+:\s*/, "");

  const overviewParams = new URLSearchParams(searchParams);
  overviewParams.delete("chapter");

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
        <div style={{ maxWidth: "1196px", margin: "20px auto 0" }}>
          <div className="back-card">
            <a href={`/${currentLang}/pastlives/${overviewParams.toString() ? `?${overviewParams.toString()}` : ""}`}>
              ← {label.chapters}
            </a>
          </div>
        </div>

        <div className="art-card">
          <h1>{chapterTitle}</h1>

          <p>
            <a href={`/${currentLang}/pastlives/`}>
              Past Lives · {chapterLabel[currentLang] || chapterLabel.en}{" "}
              {selectedChapter.number}
            </a>
          </p>

          <div className="art-meta">
            <strong>{content.detail.status}:</strong>{" "}
            {selectedChapter.status}
          </div>

          <div className="art-layout">
            {selectedChapter.video && (
              <div className="art-media-column">
                <video
                  className="art-video"
                  src={selectedChapter.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{ marginTop: 0 }}
                />
              </div>
            )}

            <div className="art-description">
              {selectedChapter.paragraphs?.map((paragraph, index) => (
                <p key={index}>
                  {index === selectedChapter.quoteIndex ? (
                    <em>{paragraph}</em>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


  return (
    <>
      <Navbar />

      <div
        className="bg-image"
        style={{
          backgroundImage: "url('/assets/pastlives/cave.png')",
        }}
      />

      <section className="page past-lives-project">
        {!selectedChapter && (
  <div style={{ maxWidth: "1196px", margin: "20px auto 0" }}>
    <div className="back-card">
      <a
        href={
          previousArtwork
            ? `/${currentLang}/${previousArtwork.slug}/`
            : `/${currentLang}/`
        }
      >
        ← {previousArtwork ? label.back : label.home}
      </a>
    </div>
  </div>
)}

        <div className="card">
          <h1 style={{ fontWeight: 300, letterSpacing: "0.12em" }}>
            {pastLives.title}
            {currentLang === "tr" && " (Geçmiş Hayatlar)"}
          </h1>

          {!selectedChapter ? (
            <>
              <p>{pastLives.intro}</p>

              <h2>{pastLives.purposeTitle}</h2>
              <p>{pastLives.purposeText}</p>

              <h2>{pastLives.conceptTitle}</h2>

              <div className="concept-text">
                <p>{pastLives.conceptText1}</p>
                <p>{pastLives.conceptText2}</p>
                <p>{pastLives.conceptText3}</p>
                <p className="concept-question">{pastLives.conceptQuestion}</p>
              </div>

              <h2>{pastLives.chaptersTitle}</h2>

<p style={{ textAlign: "center", marginBottom: "24px" }}>
  {pastLives.chaptersIntro}
</p>

              <div className="recipe-grid">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    type="button"
                    className="recipe-grid-card"
                    onClick={() => openChapter(chapter)}
                  >
                    {chapter.image ? (
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        loading="lazy"
                      />
                    ) : chapter.video ? (
                      <video
                        src={chapter.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          display: "block",
                          width: "100%",
                          aspectRatio: "4 / 3",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "4 / 3",
                          background: "#e8e8e8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#777",
                        }}
                      >
                        {chapter.status}
                      </div>
                    )}

                    <div className="recipe-grid-card-content">
                      <h3>{chapter.title}</h3>
                      <p>{chapter.status}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="recipe-back">
                <button type="button" onClick={closeChapter}>
                  ← {label.chapters}
                </button>
              </div>

              <h2>{selectedChapter.title}</h2>

              {selectedChapter.video && (
                <video
                  className="chapter-video"
                  src={selectedChapter.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              )}

              {selectedChapter.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === selectedChapter.quoteIndex
                      ? "chapter-quote"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
