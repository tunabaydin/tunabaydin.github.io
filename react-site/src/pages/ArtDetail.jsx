import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { artData } from "../data/artData";
import { artDetailsData } from "../data/artDetailsData";

export default function ArtDetail() {
  const { lang, slug } = useParams();
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
  <div className="art-card">

    <p className="back-link">
      <a href={`/${lang}#home-art`}>← Back to gallery</a>
    </p>

<h1>{artwork.title}</h1>

<div className="art-meta">
  <strong>Materials:</strong> {artworkDetails?.meta?.materials || "—"}<br />
  <strong>Year:</strong> {artworkDetails?.meta?.year || "—"}<br />
  <strong>Dimensions:</strong> {artworkDetails?.meta?.dimensions || "—"}<br />
  <strong>Status:</strong>{" "}
  {artworkDetails?.meta?.status?.[lang] ||
    artworkDetails?.meta?.status?.en ||
    (artwork.available ? "Available" : "Not available")}
</div>

<div className="art-layout">

  {/* LEFT COLUMN */}
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
      <video className="art-video" controls key={index}>
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

  {/* RIGHT COLUMN */}
  <div className="art-description">
    {(
  (artworkDetails?.description?.[lang] &&
  artworkDetails.description[lang].length > 0
    ? artworkDetails.description[lang]
    : artworkDetails?.description?.en) || []
).map((paragraph, index) => (
  <p key={index}>{paragraph}</p>
))}

        {artworkDetails?.extraMedia?.map((item, index) => {
    if (item.type === "video") {
        return (
        <video className="art-video" controls key={index}>
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