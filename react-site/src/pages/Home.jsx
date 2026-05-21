import { useEffect } from "react";
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

export default function Home() {
  const { lang } = useParams();
  const location = useLocation();
  const content = siteContent[lang] || siteContent.en;
  const hero = content.hero;

    useEffect(() => {
    const track = document.getElementById("hero-track");
    const dotsWrap = document.getElementById("hero-dots");
    const soundBtn = document.getElementById("hero-sound");
    const leftBtn = document.getElementById("hero-left");
    const rightBtn = document.getElementById("hero-right");

    if (!track || !dotsWrap || !soundBtn) return;

    const originalSlides = Array.from(track.querySelectorAll(".hero-slide"));
    if (originalSlides.length < 2) return;

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    firstClone.setAttribute("data-clone", "true");
    lastClone.setAttribute("data-clone", "true");

    track.insertBefore(lastClone, originalSlides[0]);
    track.appendChild(firstClone);

    const slides = Array.from(track.querySelectorAll(".hero-slide"));
    const realSlideCount = originalSlides.length;

    const getCenteredScrollLeft = (slide) => {
      const trackCenter = track.clientWidth / 2;
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      return slideCenter - trackCenter;
    };

    const getClosestVisualIndex = () => {
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, i) => {
        const distance = Math.abs(track.scrollLeft - getCenteredScrollLeft(slide));
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      return closestIndex;
    };

    const getRealIndexFromVisualIndex = (visualIndex) => {
      if (visualIndex === 0) return realSlideCount - 1;
      if (visualIndex === slides.length - 1) return 0;
      return visualIndex - 1;
    };

    const getCurrentVideo = () => {
      const visualIndex = getClosestVisualIndex();
      return slides[visualIndex]?.querySelector("video") || null;
    };

    const allVideos = slides.map((s) => s.querySelector("video")).filter(Boolean);

    allVideos.forEach((v) => {
      v.muted = true;
      v.volume = 0.9;
      v.play().catch(() => {});
    });

    const dotCleanup = [];

    originalSlides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "hero-dot";
      b.type = "button";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);

      const onDotClick = () => {
        const targetVisualIndex = i + 1;
        track.scrollTo({
          left: getCenteredScrollLeft(slides[targetVisualIndex]),
          behavior: "smooth",
        });
      };

      b.addEventListener("click", onDotClick);
      dotCleanup.push(() => b.removeEventListener("click", onDotClick));
      dotsWrap.appendChild(b);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));

    function setActiveFromVisualIndex(visualIndex) {
      const realIndex = getRealIndexFromVisualIndex(visualIndex);

      dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));

      allVideos.forEach((v) => {
        v.muted = true;
        v.pause();
      });

      const activeVideo = slides[visualIndex]?.querySelector("video");
      if (activeVideo) {
        activeVideo.play().catch(() => {});
        soundBtn.style.display = "block";
        soundBtn.textContent = activeVideo.muted ? "Sound" : "Mute";
      } else {
        soundBtn.style.display = "none";
      }
    }

        function jumpIfOnClone() {
      const visualIndex = getClosestVisualIndex();

      let targetIndex = null;

      if (visualIndex === 0) {
        targetIndex = realSlideCount;
      } else if (visualIndex === slides.length - 1) {
        targetIndex = 1;
      }

      if (targetIndex === null) return;

      track.classList.add("is-loop-resetting");
      track.scrollLeft = getCenteredScrollLeft(slides[targetIndex]);
      setActiveFromVisualIndex(targetIndex);

      requestAnimationFrame(() => {
        track.classList.remove("is-loop-resetting");
      });
    }

    const initialVisualIndex = 1;
    track.scrollTo({
      left: getCenteredScrollLeft(slides[initialVisualIndex]),
      behavior: "auto",
    });
    setActiveFromVisualIndex(initialVisualIndex);

    let raf = null;
    let settleTimer = null;

    const onTrackScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActiveFromVisualIndex(getClosestVisualIndex());
      });

      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        jumpIfOnClone();
      }, 140);
    };

    track.addEventListener("scroll", onTrackScroll, { passive: true });

    const onSoundClick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const v = getCurrentVideo();
      if (!v) return;

      v.muted = !v.muted;
      v.play().catch(() => {});
      soundBtn.textContent = v.muted ? "Sound" : "Mute";
    };

    soundBtn.addEventListener("click", onSoundClick);

    const onLeftClick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentVisualIndex = getClosestVisualIndex();
      const targetVisualIndex =
        currentVisualIndex === 1 ? 0 : currentVisualIndex - 1;

      track.scrollTo({
        left: getCenteredScrollLeft(slides[targetVisualIndex]),
        behavior: "smooth",
      });
    };

    const onRightClick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentVisualIndex = getClosestVisualIndex();
      const targetVisualIndex =
        currentVisualIndex === realSlideCount
          ? slides.length - 1
          : currentVisualIndex + 1;

      track.scrollTo({
        left: getCenteredScrollLeft(slides[targetVisualIndex]),
        behavior: "smooth",
      });
    };

    if (leftBtn) leftBtn.addEventListener("click", onLeftClick);
    if (rightBtn) rightBtn.addEventListener("click", onRightClick);

    const portalLinks = Array.from(
      track.querySelectorAll('.hero-link[href*="pastlives"]')
    );
    const portalTimeouts = [];

    const canPortalNavigate = (event) => {
      if (event.defaultPrevented) return false;
      if (event.button !== 0) return false;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
      return true;
    };

    const portalHandlers = portalLinks.map((link) => {
      const onPortalClick = (event) => {
        if (!canPortalNavigate(event)) return;

        event.preventDefault();
        document.documentElement.classList.add("home-portal-transition", "is-navigating");

        const timeoutId = window.setTimeout(() => {
          window.location.href = link.href;
        }, 220);

        portalTimeouts.push(timeoutId);
      };

      link.addEventListener("click", onPortalClick);
      return { link, onPortalClick };
    });

    return () => {
      dotCleanup.forEach((dispose) => dispose());
      dotsWrap.innerHTML = "";

      track.removeEventListener("scroll", onTrackScroll);
      soundBtn.removeEventListener("click", onSoundClick);

      if (leftBtn) leftBtn.removeEventListener("click", onLeftClick);
      if (rightBtn) rightBtn.removeEventListener("click", onRightClick);

      portalHandlers.forEach(({ link, onPortalClick }) => {
        link.removeEventListener("click", onPortalClick);
      });

      portalTimeouts.forEach((id) => window.clearTimeout(id));

      if (raf) cancelAnimationFrame(raf);
      if (settleTimer) window.clearTimeout(settleTimer);

      if (firstClone.parentNode === track) track.removeChild(firstClone);
      if (lastClone.parentNode === track) track.removeChild(lastClone);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.slice(1);

    const scrollToSection = () => {
      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const timeoutId = window.setTimeout(scrollToSection, 50);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <>
      <div className="bg-video">
        <video autoPlay loop muted playsInline>
          <source src="/assets/background.mp4" type="video/mp4" />
        </video>
      </div>

      <Navbar />

      <section id="top" className="hero-carousel" aria-label="Intro carousel">
        <div className="hero-track" id="hero-track">
          <div className="hero-slide" data-type="video">
            <a className="hero-link" href={`/${lang}/pastlives`} aria-label="Past Lives" />
            <video className="hero-media" autoPlay loop muted playsInline preload="auto">
              <source src={pastLivesVideo} type="video/mp4" />
            </video>
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
              <div className="card">
                <h1>{hero.workTitle}</h1>

                <div className="newwork-gallery">
  <img
    src="/newproject2.jpg"
    alt="New project preview 2"
    className="newwork-top"
  />

  <div className="newwork-bottom">
    <img
      src="/newproject1.jpg"
      alt="New project preview 1"
    />
    <img
      src="/veggiestew.jpg"
      alt="Veggie stew"
    />
  </div>
</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-dots" id="hero-dots" aria-label="Carousel pagination" />

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
