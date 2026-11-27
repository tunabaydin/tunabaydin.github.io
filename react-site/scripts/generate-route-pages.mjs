import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { legacyAliases, supportedPaths } from "../src/siteRoutes.js";
import { languageTags } from "../src/locales.js";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const index = await readFile(join(dist, "index.html"), "utf8");

const fallbackText = {
  en: "Continue to the current page",
  tr: "Güncel sayfaya geçin",
  no: "Gå til den gjeldende siden",
};

function entryFile(path) {
  return path.endsWith("/") ? `${path}index.html` : path;
}

function localizeShell(language) {
  return index.replace('<html lang="en">', `<html lang="${languageTags[language]}">`);
}

async function writePage(path, html) {
  const file = join(dist, path.slice(1));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, { flag: "wx" });
}

const entries = new Set([...supportedPaths].map(entryFile));

for (const path of supportedPaths) {
  if (path === "/") continue;
  await writePage(entryFile(path), localizeShell(path.split("/")[1]));
}

const aliasFiles = new Map();
for (const [alias, destination] of legacyAliases) {
  const targetPath = destination.split("#")[0].replace(/\/$/, "") + "/";
  if (!supportedPaths.has(targetPath)) throw new Error(`Missing destination for ${alias}: ${destination}`);

  const file = entryFile(alias);
  // An explicit index.html URL can share a physical file with its canonical route.
  if (entries.has(file)) continue;
  if (aliasFiles.has(file)) {
    if (aliasFiles.get(file) !== destination) throw new Error(`Conflicting aliases for ${file}`);
    continue;
  }

  const language = destination.split("/")[1];
  const html = localizeShell(language).replace(
    "</body>",
    `  <noscript><p><a href="${destination}">${fallbackText[language]}</a></p></noscript>\n  </body>`,
  );
  await writePage(file, html);
  aliasFiles.set(file, destination);
}

console.info(`Route pages: ${supportedPaths.size} entries, ${legacyAliases.size} alias URLs, ${aliasFiles.size} standalone alias files.`);
