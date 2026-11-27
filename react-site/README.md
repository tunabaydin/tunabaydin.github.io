# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Pages routes

`npm run build` copies the Vite application shell to each supported localized
route in `dist`. Every shell loads the same bundled application and assets.
The verified historical paths and their destinations live in `src/siteRoutes.js`.
The existing Pages workflow still publishes `dist` and uses the root shell as
`404.html`.

Compatibility pages serve HTML with HTTP 200. React replaces the URL in the
current history entry, preserving the raw query string and incoming fragment.
React sends no HTTP 301 or 308, and SPA navigation keeps the document’s original
HTTP status. GitHub Pages can normalize a directory URL to add a trailing slash
before serving its index file. Unknown paths still
receive a server 404 on Pages and show a localized not-found view where a
supported language can be determined.

With JavaScript disabled, standalone compatibility files provide a localized
link to the base destination. A static link cannot forward arbitrary inbound
queries or fragments. Historical `index.html` URLs that share a physical file
with the canonical route use the same shell, so they require JavaScript just
like supported React pages. A section alias supplies its mapped anchor only
when the incoming URL has no fragment. A historical `?back=home` URL with no
fragment opens the gallery section. Exact historical pixel scroll offsets
depended on the old site's session state.
