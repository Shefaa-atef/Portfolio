# Spiderfolio — Shefa' Atef

A comic-inspired personal portfolio combining frontend development, UI/UX design, illustration, and motion.

[View the portfolio](https://shefaa-atef.github.io/Portfolio/)

## Highlights

- Illustrated landing page with a custom spider cursor.
- Comic-style navigation and animated loading screens.
- Dedicated About, Designs, and Projects pages.
- Design galleries and project information.
- Artwork optimization before development and production builds.

## Built with

React 19, JavaScript and TSX components, Vite 8, GSAP, Tailwind CSS 4, and Sharp for image optimization.

## Run locally

Use Node.js 22.12 or later in the 22.x series and npm. The GitHub Pages workflow uses Node 22.

```sh
git clone https://github.com/Shefaa-atef/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open the URL printed by Vite with the `/Portfolio/` path, typically `http://localhost:5173/Portfolio/`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Optimize artwork, then start Vite. |
| `npm run build` | Optimize artwork and build the site into `dist/`. |
| `npm run preview` | Preview the built site. |
| `npm run lint` | Run ESLint. |

The `predev` and `prebuild` hooks run `scripts/optimize-artwork.mjs`. It reads the original SVG artwork and writes optimized copies into `src/assets/generated/`.

## Source guide

| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Route selection and page composition. |
| `src/sections/` | Landing-page and project sections. |
| `src/pages/About/` | Background, skills, experience, and contact content. |
| `src/pages/Designs/` | Design and illustration galleries. |
| `src/data/projects.js` | Project content. |
| `src/animations/cursor/spider/` | Spider cursor behavior and styling. |
| `src/assets/` | Images and generated artwork. |

## Deployment

The default branch is **master**. Pushes to it trigger `.github/workflows/deploy.yml`, which builds the site and deploys to GitHub Pages.

Vite uses `base: '/Portfolio/'` and separate HTML entries for the home, About, Designs, and Projects pages. Preserve the path's capitalization when linking to the deployed site. Update the base path if hosting elsewhere.

Run build and lint before publishing, then check navigation and artwork at desktop and mobile widths.
