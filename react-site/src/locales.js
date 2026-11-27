export const languageTags = {
  en: "en",
  tr: "tr",
  no: "nb",
};

export function localizedLocation({ pathname, search, hash }, language) {
  return {
    pathname: pathname.replace(/^\/[^/]+/, `/${language}`),
    search,
    hash,
  };
}
