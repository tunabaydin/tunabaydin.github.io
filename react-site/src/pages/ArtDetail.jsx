import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { artData } from "../data/artData";
import { artDetailsData } from "../data/artDetailsData";
import { siteContent } from "../content/siteContent";

export default function ArtDetail() {
  const { lang, slug } = useParams();
  const currentLang = lang || "en";
  const content = siteContent[currentLang] || siteContent.en;

  const artwork = artData.find((item) => item.slug === slug);
  const artworkDetails = artDetailsData[slug];
  const [searchParams] = useSearchParams();

const fromPastLives =
  searchParams.get("from") === "pastlives" &&
  artworkDetails?.series?.slug === "pastlives";

const backToChapters = {
  en: "Back to chapters",
  tr: "Bölümlere geri dön",
  no: "Tilbake til kapitlene",
};

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
        <div className="page-back">
          <div className="back-card">
            <a
  href={
    fromPastLives
      ? `/${currentLang}/pastlives/`
      : `/${currentLang}#home-art`
  }
>
  ← {fromPastLives
    ? backToChapters[currentLang] || backToChapters.en
    : content.detail.backToGallery}
</a>
          </div>
        </div>

        <div className="art-card">
          <h1>{artwork.title}</h1>

{artworkDetails?.series && (
  <p>
    <a href={`/${currentLang}/${artworkDetails.series.slug}/?from=${artwork.slug}`}>
      {artworkDetails.series.label[currentLang] ||
        artworkDetails.series.label.en}
    </a>
  </p>
)}

          <div className="art-meta">
            <strong>{content.detail.materials}:</strong> {artworkDetails?.meta?.materials || "—"}
            <br />
            <strong>{content.detail.year}:</strong> {artworkDetails?.meta?.year || "—"}
            <br />
            <strong>{content.detail.dimensions}:</strong> {artworkDetails?.meta?.dimensions || "—"}
            <br />
                    
          <strong>{content.detail.status}:</strong>{" "}
          {artwork.available
            ? content.detail.available
            : content.detail.notAvailable}

          </div>

          {slug === "jupiter" ? (
  <div className="art-layout">
    <div className="art-media-column">
      <div className="art-image">
        <img
          src={artworkDetails.mediaColumn[0].src}
          alt={artworkDetails.mediaColumn[0].alt}
        />
      </div>

      <div className="art-description">
        {(artworkDetails.description[currentLang] ||
          artworkDetails.description.en)
          .slice(1)
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
    </div>

    <div className="art-media-column">
      <div className="art-description">
        <p>
          {(artworkDetails.description[currentLang] ||
            artworkDetails.description.en)[0]}
        </p>
      </div>

      <div className="art-image">
        <img
          src={artworkDetails.mediaColumn[1].src}
          alt={artworkDetails.mediaColumn[1].alt}
        />
      </div>

      <p className="inspo-credit">
        {artworkDetails.mediaColumn[2].text}
      </p>

      <video
        className="art-video art-video--jupiter"
        autoPlay
        loop
        muted
        playsInline
        controls
      >
        <source
          src={artworkDetails.mediaColumn[3].src}
          type="video/mp4"
        />
      </video>
    </div>
  </div>
) : (
  
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
                      className={
                        slug === "abduction"
                          ? "art-video art-video--desktop-frame"
                          : "art-video"
                      }
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
  <p key={index}>
    {slug === "thewaterplanet" && index === 4 ? (
      <em>{paragraph}</em>
    ) : (
      paragraph
    )}
  </p>
))}


  {slug === "abduction" &&
    artworkDetails?.extraMedia?.map((item, index) =>
      item.type === "image" ? (
        <div
          className="art-image abduction-decoration"
          key={index}
        >
          <img src={item.src} alt={item.alt || artwork.title} />
        </div>
      ) : null
    )}


{slug === "abduction" &&
  (
    artworkDetails?.frameDescription?.[currentLang] ||
    artworkDetails?.frameDescription?.en ||
    []
  ).map((paragraph, index) => (
    <p key={`frame-${index}`}>{paragraph}</p>
  ))}


{slug === "thewaterplanet" &&
  artworkDetails?.extraMedia?.map((item, index) =>
    item.type === "image" ? (
      <div className="art-image waterplanet-decoration" key={index}>
        <img src={item.src} alt={item.alt || artwork.title} />
      </div>
    ) : null
  )}


</div>
          </div>
)}

{slug !== "abduction" &&
  slug !== "thewaterplanet" &&
  artworkDetails?.extraMedia &&
  artworkDetails.extraMedia.length > 0 && (

            <div className="art-extra-media">
              {artworkDetails.extraMedia.map((item, index) => {
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

                if (item.type === "gallery-columns") {
                  return (
                    <div className="art-detail-columns" key={index}>
                      <div>
                        {item.left.map((image, imageIndex) => (
                          <div className="art-image" key={imageIndex}>
                            <img src={image.src} alt={image.alt || artwork.title} />
                          </div>
                        ))}
                      </div>

                      <div>
                        {item.right.map((image, imageIndex) => (
                          <div className="art-image" key={imageIndex}>
                            <img src={image.src} alt={image.alt || artwork.title} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.type === "gallery-row") {
                  return (
                    <div className="art-detail-row" key={index}>
                      {item.images.map((image, imageIndex) => (
                        <div className="art-image" key={imageIndex}>
                          <img src={image.src} alt={image.alt || artwork.title} />
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}