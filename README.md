# Ajinkya Chintawar — Portfolio

Personal portfolio: eight projects with their mechanisms, evidence and limits, plus two interactive explanations that run ports of the projects' real decision rules on fictional input.

## Stack

- React 19 + Vite 8, plain CSS with custom properties (`src/index.css`). No UI or animation library.
- Fonts: Instrument Sans and IBM Plex Mono from Google Fonts.
- Hash routing: case studies live at `#/work/<id>`.
- Hosting target: Netlify (`netlify.toml`, `public/_headers`).

## Structure

```
src/
├── content.js              # every public claim on the site
├── App.jsx                 # header, routing, page transitions, entrance reveal
├── components/
│   ├── Home.jsx            # intro, selected work, skills, all projects, about, contact
│   ├── CaseStudy.jsx       # one page per project
│   ├── Flow.jsx            # pipeline diagram + colour key
│   ├── EvidenceGate.jsx    # AdversarialCI evidence-gate scene (hero + case study)
│   ├── ApexRouter.jsx      # APEX-1 interactive gate (case study)
│   └── bits.jsx
├── lib/
│   ├── route.js            # hash parsing
│   ├── mechanisms.js       # ported AdversarialCI / APEX-1 rules + sample data
│   ├── motion.js           # reduced-motion, in-view and reveal helpers
│   └── *.check.js          # `npm test`
public/                     # favicon, apple-touch-icon, og.png, _headers
DESIGN.md                   # design system as shipped
```

## Local development

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm test           # route, content and mechanism checks
npm run build      # → dist/
npm run preview    # serves dist/ with the same headers as public/_headers
```

## Deploying to Netlify

`netlify.toml` already holds the settings: Node 22, the build command `npm run lint && npm test && npm run build`, publish directory `dist`, and an SPA fallback. Headers (CSP, nosniff, referrer policy, frame denial, immutable asset caching) come from `public/_headers`.

Social and canonical URLs are absolute when the build knows the site address. Netlify provides `URL` automatically; set `SITE_URL` to override it, for example for a custom domain. Without either, they fall back to root-relative paths.

After a deploy, check the live site's response headers (`curl -I`) and the browser console for CSP errors; `_headers` is only verified locally through `vite preview`.
