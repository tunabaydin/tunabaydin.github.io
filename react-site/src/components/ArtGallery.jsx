import { artData } from "../data/artData";

export default function ArtGallery() {
  return (
    <section id="home-art">
      <h1 className="section-title">Art Gallery</h1>

      <div className="gallery">
        {artData.map((artwork) => (
          <a
            key={artwork.slug}
            className="gallery-item"
            href={`/en/${artwork.slug}/`}
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