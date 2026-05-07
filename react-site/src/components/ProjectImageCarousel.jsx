import { useState } from "react";

export default function ProjectImageCarousel({ images = [], showDots = false }) {
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
    <div className="project-image-carousel">
      <div
        className="project-image-carousel-track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
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
              aria-label="Previous image"
              onClick={goToPrevious}
            >
              ‹
            </button>
            <button
              type="button"
              className="project-image-carousel-arrow project-image-carousel-arrow-next"
              aria-label="Next image"
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
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
