# Tuna Baydin website

The source for [tunabaydin.com](https://tunabaydin.com) is a React site with Vite
and React Router. The app lives in `react-site/` and serves English (`en`),
Turkish (`tr`), and Norwegian Bokmål (`no` in URLs, `nb` in document language
tags).

## Develop locally

From `react-site/`, run:

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Use the Node.js version configured in the Pages workflow. Work in
`react-site/src/` for routes, components, and localized content. Files in
`react-site/public/` are copied into the build at their existing URL paths.
Vite bundles the shared stylesheet and homepage carousel video imported from
the root `assets/` directory.

## GitHub Pages

`.github/workflows/deploy.yml` builds the site on pushes to `main` and supports
manual runs. It adds `404.html` and `CNAME` to `react-site/dist/` and publishes
that directory to GitHub Pages.

`react-site/src/siteRoutes.js` holds the supported routes and verified historical
URL aliases. The build runs `react-site/scripts/generate-route-pages.mjs` after
Vite to create static HTML entries for those routes and aliases. The entries
load the same React bundle. The pre-React source pages are recoverable from
Git history.

Legacy aliases served directly by Pages return HTTP 200. React replaces the
current history entry, preserving the incoming query string and fragment. A
section alias supplies its own fragment when the incoming URL has none.
Historical `?back=home` links with no fragment open the gallery. With JavaScript
disabled, standalone alias files offer a localized link to the base destination.
That link cannot forward arbitrary queries or fragments. Aliases sharing a file
with a canonical route use the app shell and require JavaScript. Unknown paths
receive HTTP 404 from Pages and use the app shell to render the not-found view
in the supported language when one can be determined.
