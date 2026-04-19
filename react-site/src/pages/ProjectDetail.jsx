import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { otherProjectDetailsData } from "../data/otherProjectDetailsData";
import { siteContent } from "../content/siteContent";

export default function ProjectDetail() {
  const { lang, slug } = useParams();
  const currentLang = lang || "en";
  const content = siteContent[currentLang] || siteContent.en;
  const project = otherProjectDetailsData[slug];

  if (!project) {
    return <Navigate to={`/${currentLang}`} replace />;
  }

  const getLocalizedText = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return value?.[currentLang] || value?.en || "";
  };

  const getLocalizedArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    return value?.[currentLang] || value?.en || [];
  };

  const projectTitle = getLocalizedText(project.title);

  return (
    <>
      <Navbar />

      <div
        className="bg-image"
        style={{ backgroundImage: "url('/assets/backgroundphoto_1920x1080.jpg')" }}
      />

      <div
        style={{
          maxWidth: "1148px",
          margin: "40px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <div style={{ justifySelf: "start" }}>
          <div className="back-card">
            <a href={`/${currentLang}#home-projects`}>
              ← {content.detail.backToProjects}
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0 }}>{projectTitle}</h1>
        </div>

        <div />
      </div>

      <div className="other-project-card">
        {project.layout === "photography" && (
          <div className="photo-section">
            {project.rows.map((row, index) => (
              <div className={`photo-row ${row.rowClass || ""}`} key={index}>
                <img
                  className="photo-img"
                  src={row.image}
                  alt={row.imageAlt}
                />

                <div className="photo-text">
                  <h2>{getLocalizedText(row.title)}</h2>
                  {typeof row.text?.[currentLang] === "object" || typeof row.text?.en === "object" ? (
  (() => {
    const recipeText = row.text?.[currentLang] || row.text?.en || {};
    return (
      <div className="recipe-text">
        <p className="recipe-description">{recipeText.description}</p>

        <h3>{recipeText.ingredientsTitle}</h3>
        <ul>
          {(recipeText.ingredients || []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>{recipeText.methodTitle}</h3>
        <p>{recipeText.method}</p>
      </div>
    );
  })()
) : (
  <p>{getLocalizedText(row.text)}</p>
)}

                  {row.video && (
                    <video
                      className="photo-video"
                      src={row.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  )}
                  {row.audio && (
                    <audio
                      className="photo-audio"
                      controls
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      src={row.audio}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {project.layout === "dream" && (
          <div className="dream-section">
            <div className="dream-grid">
              <div className="dream-left">
                {project.leftImages.map((image, index) => (
                  <img key={index} src={image.src} alt={image.alt} />
                ))}
              </div>

              <div className="dream-right">
                <div className="dream-text">
                  <h2>{getLocalizedText(project.textBox.heading)}</h2>

                  {getLocalizedArray(project.textBox.paragraphs).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="dream-stack">
                  {project.rightImages.map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}