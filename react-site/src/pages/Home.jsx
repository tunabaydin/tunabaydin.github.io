import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";
import pastLivesVideo from "../../../assets/pastlives/pastlivesnewsmall.mp4";
import Navbar from "../components/Navbar";
import ArtGallery from "../components/ArtGallery";
import OtherProjects from "../components/OtherProjects";
import ArtistSection from "../components/ArtistSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
const hero = content.hero;
  console.log("Current language:", lang);

  useEffect(() => {
    const track = document.getElementById("hero-track");
    const dotsWrap = document.getElementById("hero-dots");
    const soundBtn = document.getElementById("hero-sound");
    const leftBtn = document.getElementById("hero-left");
    const rightBtn = document.getElementById("hero-right");

    if (!track || !dotsWrap || !soundBtn) return;

    const slides = Array.from(track.querySelectorAll(".hero-slide"));
    const videos = slides.map((s) => s.querySelector("video")).filter(Boolean);

    videos.forEach((v) => {
      v.muted = true;
      v.volume = 0.9;
      v.play().catch(() => {});
    });

    const dotCleanup = [];

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "hero-dot";
      b.type = "button";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);

      const onDotClick = () => {
        track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
      };

      b.addEventListener("click", onDotClick);
      dotCleanup.push(() => b.removeEventListener("click", onDotClick));
      dotsWrap.appendChild(b);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));

    function setActive(index) {
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

      slides.forEach((s, i) => {
        const v = s.querySelector("video");
        if (!v) return;
        if (i === index) {
          v.play().catch(() => {});
        } else {
          v.muted = true;
          v.pause();
        }
      });

      const activeVideo = slides[index]?.querySelector("video");
      if (!activeVideo) {
        soundBtn.style.display = "none";
      } else {
        soundBtn.style.display = "block";
        soundBtn.textContent = activeVideo.muted ? "Sound" : "Mute";
      }
    }

    function getIndexFromScroll() {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      return Math.max(0, Math.min(slides.length - 1, i));
    }

    let raf = null;
    const onTrackScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(getIndexFromScroll()));
    };
    track.addEventListener("scroll", onTrackScroll, { passive: true });

    const onSoundClick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const index = getIndexFromScroll();
      const v = slides[index]?.querySelector("video");
      if (!v) return;

      v.muted = !v.muted;
      v.play().catch(() => {});
      soundBtn.textContent = v.muted ? "Sound" : "Mute";
    };
    soundBtn.addEventListener("click", onSoundClick);

    function goTo(index) {
      const count = slides.length;
      if (!count) return;
      const nextIndex = ((index % count) + count) % count;
      track.scrollTo({ left: nextIndex * track.clientWidth, behavior: "smooth" });
    }

    const onLeftClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(getIndexFromScroll() - 1);
    };

    const onRightClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(getIndexFromScroll() + 1);
    };

    if (leftBtn) leftBtn.addEventListener("click", onLeftClick);
    if (rightBtn) rightBtn.addEventListener("click", onRightClick);

    const portalLinks = Array.from(track.querySelectorAll('.hero-link[href^="pastlives"]'));
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

    setActive(0);

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
    };
  }, []);

  return (
  <>
    {/* Background Video */}
    <div className="bg-video">
      <video autoPlay loop muted playsInline>
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
    </div>

    <Navbar />
    <section id="top" className="hero-carousel" aria-label="Intro carousel">
      <div className="hero-track" id="hero-track">
        <div className="hero-slide" data-type="video">
          <a className="hero-link" href="/en/pastlives/" aria-label="Past Lives" />
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
     <Footer />
    </>
  );
}