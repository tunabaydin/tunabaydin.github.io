import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { otherProjectDetailsData } from "../data/otherProjectDetailsData";

export default function ProjectDetail() {
  const { lang, slug } = useParams();
  const project = otherProjectDetailsData[slug];

  if (!project) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <>
      <Navbar />

      <div
        className="bg-image"
        style={{ backgroundImage: "url('/assets/backgroundphoto_1920x1080.jpg')" }}
      />

      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <h1>{project.title}</h1>
      </div>

      {project.layout === "photography" && (
        <div className="photo-section">
          {project.rows.map((row, index) => (
            <div className="photo-row" key={index}>
              <img
                className="photo-img"
                src={row.image}
                alt={row.imageAlt}
              />

              <div className="photo-text">
                <h2>{row.title}</h2>
                <p>{row.text}</p>

                {row.video && (
                  <video
                    className="photo-video"
                    src={row.video}
                    controls
                    playsInline
                    muted
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
                <h2>{project.textBox.heading}</h2>

                {project.textBox.paragraphs.map((paragraph, index) => (
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

      <Footer />
    </>
  );
}