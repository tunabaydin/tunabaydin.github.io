import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { artData } from "../data/artData";
import { artDetailsData } from "../data/artDetailsData";
import { siteContent } from "../content/siteContent";

export default function ArtDetail() {
  const { lang, slug } = useParams();
  const currentLang = lang || "en";
  const content = siteContent[currentLang] || siteContent.en;

  const artwork = artData.find((item) => item.slug === slug);
  const artworkDetails = artDetailsData[slug];

  if (!artwork) {
    return (
      <>
        <Navbar />
        <div
          className="bg-image"
          style={{ backgroundImage: "url('/assets/backgroundphoto_1920x1080.jpg')" }}
        />
        <section className="page">
          <div className="card">
            <h1>Artwork not found</h1>
            <p>No artwork matches the slug: {slug}</p>
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
        style={{ backgroundImage: "url('/assets/backgroundphoto_1920x1080.jpg')" }}
      />

      <section className="page">
        <div style={{ maxWidth: "1196px", margin: "20px auto 0" }}>
          <div className="back-card">
            <a href={`/${currentLang}#home-art`}>← {content.detail.backToGallery}</a>
          </div>
        </div>

        <div className="art-card">
          <h1>{artwork.title}</h1>

          <div className="art-meta">
            <strong>{content.detail.materials}:</strong> {artworkDetails?.meta?.materials || "—"}
            <br />
            <strong>{content.detail.year}:</strong> {artworkDetails?.meta?.year || "—"}
            <br />
            <strong>{content.detail.dimensions}:</strong> {artworkDetails?.meta?.dimensions || "—"}
            <br />
            <strong>{content.detail.status}:</strong>{" "}
            {artworkDetails?.meta?.status?.[currentLang] ||
              artworkDetails?.meta?.status?.en ||
              (artwork.available ? content.detail.available : content.detail.notAvailable)}
          </div>

          <div className="art-layout">
            <div className="art-media-column">
              {artworkDetails?.mediaColumn?.map((item, index) => {
                if (item.type === "image") {
                  return (
                    <div className="art-image" key={index}>
                      <img src={item.src} alt={item.alt || artwork.title} />
                    </div>
                  );
                }

                if (item.type === "video") {
                  return (
                    <video
                      className="art-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      key={index}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  );
                }

                if (item.type === "credit") {
                  return (
                    <p className="inspo-credit" key={index}>
                      {item.text}
                    </p>
                  );
                }

                return null;
              })}
            </div>

            <div className="art-description">
              {(
                (artworkDetails?.description?.[currentLang] &&
                artworkDetails.description[currentLang].length > 0
                  ? artworkDetails.description[currentLang]
                  : artworkDetails?.description?.en) || []
              ).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {artworkDetails?.extraMedia?.map((item, index) => {
                if (item.type === "video") {
                  return (
                    <video
                      className="art-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      key={index}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  );
                }

                if (item.type === "image") {
                  return (
                    <div className="art-image" key={index}>
                      <img src={item.src} alt={item.alt || artwork.title} />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}