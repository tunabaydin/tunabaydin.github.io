import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";
import pastLivesVideo from "../../../assets/pastlives/pastlivesnewsmall.mp4";
import Navbar from "../components/Navbar";
import ArtGallery from "../components/ArtGallery";
import OtherProjects from "../components/OtherProjects";
import ArtistSection from "../components/ArtistSection";
import ContactSection from "../components/ContactSection";
import BooksSection from "../components/BooksSection";
import Footer from "../components/Footer";
import setupHeroCarousel from "../components/setupHeroCarousel";

export default function Home() {
  const { lang } = useParams();
  const location = useLocation();
  const content = siteContent[lang] || siteContent.en;
  const hero = content.hero;

  const carouselRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => setupHeroCarousel(carouselRef.current, lang, backgroundRef.current), [lang]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash]);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);

    const scrollToSection = () => {
      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    };

    const timeoutId = window.setTimeout(scrollToSection, 50);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash, lang]);

  return (
    <>
      <div className="bg-video">
        <video ref={backgroundRef} loop muted playsInline>
          <source src="/assets/background.mp4" type="video/mp4" />
        </video>
      </div>

      <Navbar />

      <section ref={carouselRef} id="top" className="hero-carousel" aria-label="Intro carousel">
        <div className="hero-track" id="hero-track">
          <div className="hero-slide" data-type="video">
          <a className="hero-link" href={`/${lang}/pastlives`} aria-label="Past Lives" />

            <div className="hero-media-wrap">
              <video className="hero-media" loop muted playsInline preload="auto">
                <source src={pastLivesVideo} type="video/mp4" />
              </video>

              <a
                className="hero-ai-disclaimer"
                href={`/${lang}/dreamreconstruction/`}
                aria-label="Disclaimer: AI-assisted image. Unless marked with this, my art is not generated through AI."
              >
                <span className="hero-ai-disclaimer-main">Disclaimer</span>
                <span className="hero-ai-disclaimer-hover">AI-assisted art</span>
                <span className="hero-ai-disclaimer-note">
                  Unless marked with this, my art is not generated through AI.
                </span>
              </a>
            </div>
            <div className="hero-overlay" />
            <div className="hero-pastlives-copy" aria-hidden="true">
              <h2 className="hero-pastlives-title">{hero.pastLivesTitle}</h2>
              <div className="hero-pastlives-bottom">
                <p className="hero-pastlives-subtitle">{hero.pastLivesSubtitle}</p>
                <p className="hero-pastlives-meta">{hero.pastLivesMeta}</p>
                <p className="hero-pastlives-cta">{hero.pastLivesCta}</p>
              </div>
            </div>
          </div>

          <div className="hero-slide hero-slide--intro" data-type="intro">
            <div className="hero-overlay" />
            <div className="hero-card-wrap">
              <div className="card">
                <h1>{hero.introTitle}</h1>
                <p>{hero.introText1}</p>
                <p>{hero.introText2}</p>
              </div>
            </div>
          </div>

          {lang === "tr" ? (
            <div className="hero-slide hero-slide--intro" data-type="intro">
              <div className="hero-overlay" />
              <div className="hero-card-wrap">
                <div className="card">
                  <h1>Türkçe kullanıcılar için</h1>
                  <p>Daha iyi bir deneyim için</p>
                  <p>otomatik çeviriyi kapatmanızı öneririm.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="hero-slide hero-slide--intro" data-type="intro">
              <div className="hero-overlay" />
              <div className="hero-card-wrap">
                <div className="card">
                  <h1>{hero.nameTitle}</h1>
                  <p>{hero.nameText1}</p>
                  {hero.nameText2 && <p>{hero.nameText2}</p>}
                  {hero.nameText3 && <p>{hero.nameText3}</p>}

                  {hero.nameImages && (
                    <div className="tona-gallery">
                      {hero.nameImages.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Tona cup ${index + 1}`}
                          className="tona-gallery-image"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="hero-slide hero-slide--intro" data-type="intro">
  <div className="hero-overlay" />

  <div className="hero-card-wrap">
    <div className="card etsy-card">
      <h1>{hero.workTitle}</h1>

      <img
        src="/assets/art/emulsiondecoration.jpg"
        alt="Emulsion fine art print"
        className="etsy-feature-image"
      />

      <p>{hero.workText}</p>

      <a
        href="https://www.etsy.com/shop/TunaBaydinArt"
        target="_blank"
        rel="noopener noreferrer"
        className="etsy-shop-link"
      >
        {hero.workCta}
      </a>
    </div>
  </div>
</div>

</div>

        <div className="hero-controls">
          <div className="hero-dots" id="hero-dots" role="group" aria-label="Carousel pagination">
            <button className="hero-pause" type="button" aria-label="Pause automatic advancement" />
          </div>

          <button
            className="hero-arrow hero-arrow--left"
            id="hero-left"
            type="button"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            className="hero-arrow hero-arrow--right"
            id="hero-right"
            type="button"
            aria-label="Next slide"
          >
            ›
          </button>

          <button className="hero-sound" id="hero-sound" type="button">
            Sound
          </button>
        </div>
      </section>

      <ArtGallery />
      <OtherProjects />
      <ArtistSection />
      <ContactSection />
      <BooksSection />
      <Footer />
    </>
  );
}
