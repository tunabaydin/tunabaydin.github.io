import { artData } from "./data/artData.js";
import { otherProjectDetailsData } from "./data/otherProjectDetailsData.js";
import { languageTags } from "./locales.js";

const languages = Object.keys(languageTags);
const detailSlugs = [
  ...artData.map(({ slug }) => slug),
  ...Object.keys(otherProjectDetailsData),
];

export const supportedPaths = new Set([
  "/",
  ...languages.flatMap((lang) =>
    ["", "welcome/", "pastlives/", ...detailSlugs.map((slug) => `${slug}/`)]
      .map((suffix) => `/${lang}/${suffix}`),
  ),
]);

// Historical files verified in the repository's original HTML site.
const sections = {
  art: "home-art",
  artist: "home-artist",
  contact: "home-contact",
  otherprojects: "home-projects",
};
const movedPages = {
  ceramics: "sculpture/",
  cooking: "recipes/",
  snowflake: "collage/#snowflake",
};
const legacyArtworks = [
  "abduction", "baby", "comingdown", "cookie", "emulsion", "jupiter",
  "lips", "olivepit", "plant", "walk", "warm",
];
const legacyProjects = ["crochet", "dreamreconstruction", "music", "photography"];
const homeAnchors = new Set([
  "#top", "#home-art", "#home-artist", "#home-contact", "#home-projects", "#home-books",
]);

export const legacyAliases = new Map();

for (const lang of languages) {
  const home = `/${lang}/`;
  const suffix = lang === "en" ? "" : `-${lang}`;
  legacyAliases.set(`/index${suffix}.html`, home);
  legacyAliases.set(`${home}index.html`, home);
  legacyAliases.set(`/pastlives${suffix}.html`, `${home}pastlives/`);

  for (const [slug, anchor] of Object.entries(sections)) {
    const target = `${home}#${anchor}`;
    legacyAliases.set(`/${slug}${suffix}.html`, target);
    legacyAliases.set(`${home}${slug}/`, target);
    legacyAliases.set(`${home}${slug}/index.html`, target);
  }

  for (const [slug, destination] of Object.entries(movedPages)) {
    const target = home + destination;
    legacyAliases.set(`${home}${slug}/`, target);
    legacyAliases.set(`${home}${slug}/index.html`, target);
  }

  for (const slug of [
    ...legacyArtworks, ...legacyProjects, "collage", "pastlives", "recipes", "sculpture",
  ]) {
    legacyAliases.set(`${home}${slug}/index.html`, `${home}${slug}/`);
  }
}

for (const slug of [...legacyArtworks, ...legacyProjects]) {
  legacyAliases.set(`/${slug}.html`, `/en/${slug}/`);
}
legacyAliases.set("/snowflake.html", "/en/collage/#snowflake");

export function redirectForLocation({ pathname, search, hash }) {
  const isHome = (path) => /^\/(en|tr|no)\/?$/.test(path);
  const returningHome = !hash && new URLSearchParams(search).get("back") === "home";
  let destination = legacyAliases.get(pathname) || legacyAliases.get(`${pathname}/`);
  if (pathname === "/") {
    destination = homeAnchors.has(hash) ? "/en/" : "/en/welcome";
  }
  if (!destination && returningHome && isHome(pathname)) destination = pathname;
  if (!destination) return null;

  const [targetPath, defaultAnchor] = destination.split("#");
  const targetHash = hash || (defaultAnchor ? `#${defaultAnchor}` : "");
  return {
    pathname: targetPath,
    search,
    hash: targetHash || (returningHome && isHome(targetPath) ? "#home-art" : ""),
  };
}
