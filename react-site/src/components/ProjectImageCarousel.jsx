import { useState } from "react";
import { useParams } from "react-router-dom";

const labels = {
  en: { region: "Image carousel", previous: "Previous image", next: "Next image", goTo: "Go to image" },
  tr: { region: "Görsel galerisi", previous: "Önceki görsel", next: "Sonraki görsel", goTo: "Görsele git" },
  no: { region: "Bildekarusell", previous: "Forrige bilde", next: "Neste bilde", goTo: "Gå til bilde" },
};

export default function ProjectImageCarousel({ images = [], showDots = false }) {
  const { lang } = useParams();
  const text = labels[lang] || labels.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!images.length) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const onTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStartX(null);
  };

  return (
    <div
      className="project-image-carousel"
      role="group"
      aria-label={text.region}
      onKeyDown={(event) => {
        if (images.length < 2 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        if (event.key === "ArrowLeft") goToPrevious();
        else goToNext();
      }}
    >
      <div
        className="project-image-carousel-track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => setTouchStartX(null)}
      >
        <img
          className="photo-img project-image-carousel-image"
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="project-image-carousel-arrow project-image-carousel-arrow-prev"
              aria-label={text.previous}
              onClick={goToPrevious}
            >
              ‹
            </button>
            <button
              type="button"
              className="project-image-carousel-arrow project-image-carousel-arrow-next"
              aria-label={text.next}
              onClick={goToNext}
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && images.length > 1 && (
        <div className="project-image-carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`project-image-carousel-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${text.goTo} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
