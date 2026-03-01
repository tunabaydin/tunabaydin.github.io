document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("hero-track");
  const dotsWrap = document.getElementById("hero-dots");
  const soundBtn = document.getElementById("hero-sound");
const leftBtn = document.getElementById("hero-left");
const rightBtn = document.getElementById("hero-right");
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.querySelectorAll(".hero-slide"));
  const videos = slides.map(s => s.querySelector("video")).filter(Boolean);

  // Always start muted for autoplay reliability
  videos.forEach(v => { v.muted = true; v.volume = 0.9; v.play().catch(()=>{}); });

  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "hero-dot";
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i+1}`);
    b.addEventListener("click", () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    });
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));

  function setActive(index){
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));

    // Pause/mute all videos except active slide video
    slides.forEach((s, i) => {
      const v = s.querySelector("video");
      if (!v) return;
      if (i === index) {
        v.play().catch(()=>{});
      } else {
        v.muted = true;
        v.pause();
      }
    });

    // Update sound button label based on active slide video
    const activeVideo = slides[index]?.querySelector("video");
    if (!activeVideo) {
      soundBtn.style.display = "none";
    } else {
      soundBtn.style.display = "block";
      soundBtn.textContent = activeVideo.muted ? "Sound" : "Mute";
    }
  }

  // Detect active slide by scroll position
  function getIndexFromScroll(){
    const i = Math.round(track.scrollLeft / track.clientWidth);
    return Math.max(0, Math.min(slides.length - 1, i));
  }

  let raf = null;
  track.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(getIndexFromScroll()));
  }, { passive: true });

  // Sound button toggles active slide’s video only
  soundBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const index = getIndexFromScroll();
    const v = slides[index]?.querySelector("video");
    if (!v) return;

    v.muted = !v.muted;
    v.play().catch(()=>{});
    soundBtn.textContent = v.muted ? "Sound" : "Mute";
  });

  function goTo(index){
  const count = slides.length;
  if (!count) return;
  index = ((index % count) + count) % count;
  track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
}

if (leftBtn) {
  leftBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    goTo(getIndexFromScroll() - 1);
  });
}

if (rightBtn) {
  rightBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    goTo(getIndexFromScroll() + 1);
  });
}
  


  // Subtle portal transition for Past Lives links on home carousel
  const portalLinks = track.querySelectorAll('.hero-link[href^="pastlives"]');
  const canPortalNavigate = (event) => {
    if (event.defaultPrevented) return false;
    if (event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    return true;
  };

  portalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!canPortalNavigate(event)) return;

      event.preventDefault();
      document.documentElement.classList.add('home-portal-transition', 'is-navigating');

      window.setTimeout(() => {
        window.location.href = link.href;
      }, 220);
    });
  });

  // Init
  setActive(0);
});
