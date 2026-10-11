import { readFileSync } from 'node:fs'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify sets URL to the site's primary address at build time; SITE_URL overrides it.
// Locally both are unset and the social/canonical URLs fall back to root-relative paths.
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')

// public/_headers is what Netlify serves. `vite preview` reuses its "/*" block so the
// policy can be exercised locally before deploying.
const siteHeaders = Object.fromEntries(
  readFileSync(new URL('./public/_headers', import.meta.url), 'utf8')
    .split('\n\n')[0].split('\n').slice(1)
    .map((l) => l.trim().split(/:\s(.+)/).slice(0, 2)),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
  ],
  preview: { headers: siteHeaders },
})
