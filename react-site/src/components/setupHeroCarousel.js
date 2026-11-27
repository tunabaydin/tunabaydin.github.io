const interval = 3000;

const labels = {
  en: { region: "Intro carousel", previous: "Previous slide", next: "Next slide", dots: "Carousel pagination", slide: "Slide", goTo: "Go to slide", pause: "Pause automatic advancement", resume: "Resume automatic advancement", sound: "Unmute video", mute: "Mute video", play: "Play video with sound" },
  tr: { region: "Tanıtım slaytları", previous: "Önceki slayt", next: "Sonraki slayt", dots: "Slayt seçimi", slide: "Slayt", goTo: "Slayta git", pause: "Otomatik ilerlemeyi duraklat", resume: "Otomatik ilerlemeyi sürdür", sound: "Sesi aç", mute: "Sesi kapat", play: "Videoyu sesli oynat" },
  no: { region: "Introduksjonskarusell", previous: "Forrige lysbilde", next: "Neste lysbilde", dots: "Velg lysbilde", slide: "Lysbilde", goTo: "Gå til lysbilde", pause: "Sett automatisk fremvisning på pause", resume: "Fortsett automatisk fremvisning", sound: "Slå på lyd", mute: "Demp lyden", play: "Spill av video med lyd" },
};

export default function setupHeroCarousel(carousel, lang, background) {
  const text = labels[lang] || labels.en;
  const track = carousel.querySelector(".hero-track");
  const pagination = carousel.querySelector(".hero-dots");
  const pauseButton = carousel.querySelector(".hero-pause");
  const soundButton = carousel.querySelector(".hero-sound");
  const previous = carousel.querySelector(".hero-arrow--left");
  const next = carousel.querySelector(".hero-arrow--right");
  const originals = [...track.children];
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new AbortController();
  const listen = (target, type, handler) =>
    target.addEventListener(type, handler, { signal: listeners.signal });

  // Clones are visual previews only. The original slides own all interaction and playback.
  const clone = (slide) => {
    const copy = slide.cloneNode(true);
    copy.dataset.clone = "true";
    copy.removeAttribute("data-active");
    copy.inert = true;
    copy.setAttribute("aria-hidden", "true");
    return copy;
  };
  const firstClone = clone(originals[0]);
  const lastClone = clone(originals.at(-1));
  track.prepend(lastClone);
  track.append(firstClone);
  const slides = [...track.children];
  const last = originals.length;
  const realIndex = (visual) => (visual + last - 1) % last;
  const videos = originals.map((slide) => slide.querySelector("video"));
  const mediaWrap = originals[0].querySelector(".hero-media-wrap");
  const preview = firstClone.querySelector("video");
  if (preview) preview.muted = true;
  const dots = originals.map((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `${text.goTo} ${index + 1}`);
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-label", `${text.slide} ${index + 1} / ${last}`);
    pagination.insertBefore(dot, pauseButton);
    return dot;
  });

  carousel.setAttribute("aria-label", text.region);
  pagination.setAttribute("aria-label", text.dots);
  previous.setAttribute("aria-label", text.previous);
  next.setAttribute("aria-label", text.next);

  let active = -1;
  let direction = 1;
  let settleTimer;
  let settling = false;
  let queuedMove;
  let pointerDown = false;
  let mouseOver = false;
  let paused = motion.matches;
  let explicitVideo = false;
  let temporarilyHidden = false;
  let manualUntil = 0;
  let portalTimer;
  let trackWidth = track.clientWidth;

  function scrollTarget(slide) {
    const trackRect = track.getBoundingClientRect();
    const rect = slide.getBoundingClientRect();
    const center = track.scrollLeft + rect.left - trackRect.left + (rect.width - trackRect.width) / 2;
    return Math.max(0, Math.min(center, track.scrollWidth - track.clientWidth));
  }

  function scrollTo(visual, behavior = "instant") {
    track.scrollTo({ left: scrollTarget(slides[visual]), behavior });
  }

  function closestSlide() {
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const gap = Math.abs(track.scrollLeft - scrollTarget(slide));
      if (gap < distance) {
        closest = index;
        distance = gap;
      }
    });
    return closest;
  }

  function setPlayback(video, shouldPlay) {
    if (!shouldPlay) video.pause();
    else if (video.paused) video.play().catch(() => {});
  }

  const pageIsVisible = () => !document.hidden && !temporarilyHidden;

  function updatePlayback() {
    const video = videos[active];
    if (!video) return;
    setPlayback(video, pageIsVisible() && (!motion.matches || explicitVideo));
    soundButton.textContent = video.muted ? "Sound" : "Mute";
    soundButton.setAttribute("aria-label", video.muted ? (motion.matches && !explicitVideo ? text.play : text.sound) : text.mute);
  }

  function updatePagePlayback() {
    setPlayback(background, pageIsVisible() && !motion.matches);
    updatePlayback();
  }

  function select(index) {
    if (index === active) return;
    const oldVideo = videos[active];
    if (oldVideo) {
      oldVideo.pause();
      oldVideo.muted = true;
    }
    const focused = document.activeElement;
    active = index;
    explicitVideo = false;
    // Keep focus somewhere visible before making the outgoing slide inert.
    if (originals.some((slide, i) => i !== index && slide.contains(focused)) ||
        (!videos[index] && focused === soundButton)) {
      dots[index].focus({ preventScroll: true });
    }
    originals.forEach((slide, i) => {
      slide.inert = i !== index;
      slide.toggleAttribute("data-active", i === index);
      dots[i].classList.toggle("is-active", i === index);
      if (i === index) dots[i].setAttribute("aria-current", "true");
      else dots[i].removeAttribute("aria-current");
    });
    soundButton.hidden = !videos[index];
    updatePlayback();
  }

  // Only one programmatic scroll runs at a time. A new manual action replaces
  // any queued action, and runs after native scrolling and clone rebasing settle.
  function settle() {
    if (pointerDown) return;
    const visual = closestSlide();
    const index = realIndex(visual);
    settling = false;
    if (visual === 0 || visual === slides.length - 1) scrollTo(index + 1);
    select(index);
    const move = queuedMove;
    queuedMove = undefined;
    if (move) navigate(move);
  }

  function scheduleSettle(delay = 140) {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, delay);
  }

  function navigate(move) {
    if (settling || pointerDown) {
      queuedMove = move;
      return;
    }
    let visual = closestSlide();
    if (visual === 0 || visual === slides.length - 1) {
      visual = realIndex(visual) + 1;
      scrollTo(visual);
    }
    const target = move.step ? visual + move.step : move.index + 1;
    if (target === visual) {
      select(realIndex(visual));
      return;
    }
    if (target === slides.length - 1 && preview?.readyState && videos[0]) {
      preview.currentTime = videos[0].currentTime;
    }
    if (motion.matches) {
      scrollTo(target);
      settle();
      return;
    }
    settling = true;
    scrollTo(target, "smooth");
    scheduleSettle(1200);
  }

  function manualMove(move) {
    manualUntil = performance.now() + interval;
    if (move.step) direction = move.step;
    navigate(move);
  }

  function updatePause() {
    // An explicit play request may start rotation even with reduced motion.
    // Each requested change still uses instant scrolling in that mode.
    pauseButton.setAttribute("aria-label", paused ? text.resume : text.pause);
    pauseButton.title = paused ? text.resume : text.pause;
    pauseButton.toggleAttribute("data-paused", paused);
  }

  function clearPortal() {
    window.clearTimeout(portalTimer);
    portalTimer = undefined;
    document.documentElement.classList.remove("home-portal-transition", "is-navigating");
  }

  videos.forEach((video) => {
    if (!video) return;
    video.pause();
    video.muted = true;
    video.volume = 0.9;
  });
  scrollTo(1);
  select(0);
  setPlayback(background, pageIsVisible() && !motion.matches);
  updatePause();

  listen(track, "scroll", () => {
    if (Math.abs(track.scrollLeft - scrollTarget(originals[active])) <= 1 && !settling) return;
    settling = true;
    scheduleSettle();
  });
  listen(track, "pointerdown", () => {
    pointerDown = true;
    manualUntil = performance.now() + interval;
  });
  function releasePointer() {
    if (!pointerDown) return;
    pointerDown = false;
    manualUntil = performance.now() + interval;
    if (settling || queuedMove) scheduleSettle();
  }
  listen(window, "pointerup", releasePointer);
  listen(window, "pointercancel", releasePointer);
  listen(carousel, "pointerenter", (event) => { if (event.pointerType === "mouse") mouseOver = true; });
  listen(carousel, "pointerleave", (event) => { if (event.pointerType === "mouse") mouseOver = false; });
  listen(previous, "click", () => manualMove({ step: -1 }));
  listen(next, "click", () => manualMove({ step: 1 }));
  dots.forEach((dot, index) => listen(dot, "click", () => manualMove({ index })));
  listen(carousel, "keydown", (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    manualMove({ step: event.key === "ArrowLeft" ? -1 : 1 });
  });
  listen(soundButton, "click", () => {
    const video = videos[active];
    if (!video) return;
    explicitVideo = true;
    video.muted = !video.muted;
    updatePlayback();
  });
  listen(pauseButton, "click", () => {
    paused = !paused;
    manualUntil = performance.now() + interval;
    updatePause();
  });
  listen(motion, "change", () => {
    if (motion.matches) {
      paused = true;
      explicitVideo = false;
      if (videos[active]) videos[active].muted = true;
      if (settling && !pointerDown) {
        scrollTo(closestSlide());
        settle();
      }
    }
    updatePause();
    updatePagePlayback();
  });

  listen(document, "visibilitychange", () => {
    manualUntil = performance.now() + interval;
    if (document.hidden) releasePointer();
    updatePagePlayback();
  });
  listen(window, "pagehide", () => {
    temporarilyHidden = true;
    releasePointer();
    updatePagePlayback();
  });
  listen(window, "pageshow", (event) => {
    temporarilyHidden = false;
    if (event.persisted) clearPortal();
    updatePagePlayback();
  });
  const resize = new ResizeObserver(() => {
    if (mediaWrap.offsetWidth) {
      const centeredSlideInset = (track.clientWidth - originals[0].offsetWidth) / 2;
      const inset = centeredSlideInset + originals[0].offsetWidth - mediaWrap.offsetLeft - mediaWrap.offsetWidth;
      carousel.style.setProperty("--hero-sound-right", `${Math.max(18, inset + 24)}px`);
    }
    if (trackWidth === track.clientWidth) return;
    trackWidth = track.clientWidth;
    // Preserve the committed slide across width changes and cancel old targets.
    queuedMove = undefined;
    settling = false;
    window.clearTimeout(settleTimer);
    scrollTo(active + 1);
  });
  resize.observe(track);
  resize.observe(mediaWrap);

  const timer = window.setInterval(() => {
    const focused = document.activeElement;
    if (paused || document.hidden || temporarilyHidden || pointerDown || mouseOver ||
        settling || portalTimer !== undefined || performance.now() < manualUntil ||
        (carousel.contains(focused) && focused !== pauseButton)) return;
    navigate({ step: direction });
  }, interval);

  const portal = originals[0].querySelector(".hero-link");
  listen(portal, "click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey || motion.matches) return;
    event.preventDefault();
    if (portalTimer !== undefined) return;
    document.documentElement.classList.add("home-portal-transition", "is-navigating");
    portalTimer = window.setTimeout(() => window.location.assign(portal.href), 220);
  });

  return () => {
    listeners.abort();
    resize.disconnect();
    carousel.style.removeProperty("--hero-sound-right");
    window.clearInterval(timer);
    window.clearTimeout(settleTimer);
    clearPortal();
    background.pause();
    track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
    videos.forEach((video) => {
      if (!video) return;
      video.pause();
      video.muted = true;
    });
    originals.forEach((slide) => {
      slide.inert = false;
      slide.removeAttribute("data-active");
    });
    firstClone.remove();
    lastClone.remove();
    dots.forEach((dot) => dot.remove());
  };
}
