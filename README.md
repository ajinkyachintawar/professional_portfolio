# Ajinkya Chintawar — Portfolio

Personal portfolio site for Ajinkya Chintawar, Data Analyst & AI Builder. Built with Vite + React, deployed on Netlify.

**Live site:** https://ajinkyachintawar.netlify.app

## Stack

- **Framework:** React 18 + Vite
- **Styling:** Plain CSS (custom properties, no framework)
- **Typography:** Playfair Display + Inter (Google Fonts) + JetBrains Mono
- **Deployment:** Netlify (auto-deploy on push to `main`)

## Project structure

```
src/
├── components/
│   ├── TopBar.jsx       # Nav with scrollspy active state
│   ├── Hero.jsx         # Opening statement + bullet list
│   ├── About.jsx        # Short bio
│   ├── Projects.jsx     # 4 projects (AdversarialCI, Smartbox, grocery-mcp, Kaggle)
│   ├── HowIWork.jsx     # 3 working habits
│   ├── Skills.jsx       # Toolbox grid
│   ├── Contact.jsx      # Links + availability
│   └── Footer.jsx       # Colophon
├── App.jsx              # Root — scrollspy + reveal-on-scroll logic
├── index.css            # All styles (design tokens, components, mobile)
└── main.jsx
```

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & deploy

```bash
npm run build     # outputs to dist/
```

Netlify picks up every push to `main` and rebuilds automatically. Build config is in [`netlify.toml`](netlify.toml).
