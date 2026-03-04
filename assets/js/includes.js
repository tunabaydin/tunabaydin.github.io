const NAV_LABELS = {
  en: {
    home: "Home",
    art: "Art",
    otherprojects: "Other Projects",
    artist: "Artist",
    contact: "Contact",
  },
  tr: {
    home: "Ana Sayfa",
    art: "Sanat",
    otherprojects: "Diğer Projeler",
    artist: "Sanatçı",
    contact: "İletişim",
  },
  no: {
    home: "Hjem",
    art: "Kunst",
    otherprojects: "Andre Prosjekter",
    artist: "Kunstner",
    contact: "Kontakt",
  },
};

function getContextFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const lang = ["en", "tr", "no"].includes(parts[0]) ? parts[0] : "en";
  const key = parts.length <= 1 ? "home" : parts[1];
  return { lang, key };
}

function setNavLanguage(navNode, lang) {
  const htmlLang = lang === "no" ? "no" : lang;
  document.documentElement.lang = htmlLang;
  const labels = NAV_LABELS[lang] || NAV_LABELS.en;

  navNode.querySelectorAll("[data-nav-key]").forEach((link) => {
    const key = link.getAttribute("data-nav-key");
    if (labels[key]) link.textContent = labels[key];
  });
}

function updateNavLinks(navNode, routes, ctx) {
  navNode.querySelectorAll("[data-nav-key]").forEach((link) => {
    const key = link.getAttribute("data-nav-key");
    const target = routes[key]?.[ctx.lang];
    if (target) link.setAttribute("href", target);
  });

  navNode.querySelectorAll("[data-lang-switch]").forEach((link) => {
    const targetLang = link.getAttribute("data-lang-switch");
    const target = routes[ctx.key]?.[targetLang] || routes.home?.[targetLang] || `/${targetLang}/`;
    link.setAttribute("href", target);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const nodes = document.querySelectorAll("[data-partial]");

  for (const node of nodes) {
    const partialPath = node.getAttribute("data-partial");
    if (!partialPath) continue;

    try {
      const response = await fetch(partialPath, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
      node.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  const navNode = document.querySelector("[data-dynamic-nav]");
  if (!navNode) return;

  try {
    const routeResponse = await fetch("/assets/i18n/routes.json", { cache: "no-cache" });
    if (!routeResponse.ok) throw new Error("Failed to load routes.json");
    const routes = await routeResponse.json();
    const ctx = getContextFromPath();
    setNavLanguage(navNode, ctx.lang);
    updateNavLinks(navNode, routes, ctx);
  } catch (error) {
    console.error(error);
  }
});
