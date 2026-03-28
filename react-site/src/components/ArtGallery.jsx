import { artData } from "../data/artData";
import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";
export default function ArtGallery() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const currentLang = lang || "en";
  return (
    <section id="home-art">
      <h1 className="section-title">{content.sections.art}</h1>

      <div className="gallery">
        {artData.map((artwork) => (
          <a
            key={artwork.slug}
            className="gallery-item"
            href={`/${currentLang}/${artwork.slug}/`}
          >
            <div
              className="gallery-cover"
              style={{ backgroundImage: `url(${artwork.image})` }}
            ></div>

            <div className="gallery-title">
              <span className="title-text">{artwork.title}</span>
              <span
                className={`status-dot ${
                  artwork.available ? "available" : "unavailable"
                }`}
              ></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}