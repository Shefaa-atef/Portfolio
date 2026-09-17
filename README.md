# Shefa Atef Portfolio

## Overview

This repository contains a comic-inspired personal portfolio for Shefa Atef. It presents a landing page plus dedicated About, Projects, and Designs pages that showcase technical work, design samples, background, and contact links.

## Real Features

- Comic-style landing page with animated hero artwork
- Dedicated multipage portfolio sections for About, Projects, and Designs
- Custom spider cursor interaction for pointer devices
- Selected project showcase with descriptions, tags, external links, and alternate artwork views
- Design gallery sections for logos, infographics, campaign posts, and vector art
- Resume download link and direct contact/social links
- GitHub Pages-ready Vite build with repository base path support

## Tech Stack

- React 19
- Vite 8
- JavaScript and TSX components
- CSS modules/files for page styling
- ESLint for linting
- Sharp for prebuild artwork optimization

## Live Demo

- GitHub Pages: https://shefaa-atef.github.io/Portfolio/

## Screenshots

Add current screenshots here before publishing:

- Home page screenshot placeholder
- About page screenshot placeholder
- Projects page screenshot placeholder
- Designs page screenshot placeholder

## Setup Instructions

```bash
npm ci
npm run dev
```

Other useful commands:

```bash
npm run lint
npm run build
npm run preview
```

## Technical Highlights

- Uses Vite multi-page inputs so `/`, `/about/`, `/projects/`, and `/designs/` can be deployed as separate entry points
- Optimizes large embedded SVG artwork during `predev` and `prebuild` with `scripts/optimize-artwork.mjs`
- Lazy-loads the About and Designs pages from the main app entry
- Preserves navigation context with small URL helpers so users can jump back to the relevant home section
- Includes reduced-motion checks in interactive UI effects

## Future Improvements

- Add automated tests for navigation and key interactive behaviors
- Replace placeholder screenshots with production captures
- Expand lint coverage to the TSX files used by the About and Designs pages
- Continue trimming large media assets where quality allows
