# Design — as shipped through Stage 3

This records the built state of the selected **Classic Portfolio** direction. It is not a new direction. Source of truth for values: `:root` in `src/index.css`.

## World

A light, neutral ground with dark ink and one blue accent. The sketch in `.impeccable/sketches/canon.png` set the tone, not the imagery. Long reading sits on solid white surfaces. Glass (translucent white, `backdrop-filter: blur(20px) saturate(170%)`) is used in only two places: the sticky header and the panel holding the intro's evidence-gate scene.

## Tokens

| Role | Token | Value |
| --- | --- | --- |
| Page ground | `--bg` | `#f3f5f8` with two soft radial washes at the top |
| Surface / tinted surface | `--surface` / `--surface-2` | `#ffffff` / `#f7f9fc` |
| Ink, secondary, tertiary | `--ink` / `--ink-2` / `--ink-3` | `#0c1220` / `#364055` / `#566074` |
| Lines | `--line` / `--line-2` | `#e2e6ec` / `#d3d9e2` |
| Accent | `--accent` / `--accent-ink` / `--accent-soft` | `#1550e0` / `#0f3fb4` / `#e9efff` |
| Dropped / suppressed | `--danger` / `--danger-bg` | `#b42318` / `#fdecea` |
| Radius | `--radius` / `--radius-sm` | 20px / 12px; pills 999px |
| Shadow | `--shadow` | 1px hairline plus a soft 30px, −12px spread drop |
| Easing | `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Step-kind colours.** These are the diagram language: text colour on a tinted background.

| Kind | Meaning | Text / tint |
| --- | --- | --- |
| Data | sources, retrieval, records | `#4f5a6e` / `#eef1f5` |
| Model | an LLM proposes | `#1550e0` / `#e9efff` |
| Code | deterministic check, no model call | `#0b7155` / `#e2f3ec` |
| Person | a human decides | `#9a4a05` / `#fcefe0` |
| Result | what leaves the system | `#0c1220` / `#e7e9ee` |

Status pills reuse the same palette: live or deployed is green, prototype is blue, private or team is amber.

## Type

- **Instrument Sans** (400–700) for everything. **IBM Plex Mono** only for figures, dates and gate values.
- Name `clamp(3rem, 8.4vw, 6rem)` at −0.04em; section headings `clamp(2rem, 4.2vw, 3rem)`; body 17px/1.6 (16px on phones). Reading measure is held to roughly 58–70ch.

## Components

- `Flow` (`src/components/Flow.jsx`): one ordered list rendered two ways. **Compact**: stacked step cards joined by a rail, on a faint 24px measurement grid (the diagram canvas). **Detail**: a vertical rail with ring markers, a kind tag, a label and a note. `FlowKey` is the legend.
- Featured cards: one lead card (text plus diagram side by side), then three cards on a subgrid so the diagrams and titles line up.
- Project index rows, skill groups with project chips, timeline, contact cards and the case-study sheet (one white sheet holding the sections, an accent-tinted highlight, evidence rows of metric, statement and scope, and the APEX-1 gate table).

## Layout and behaviour

- Page width `min(1200px, 100% − 2 × gutter)`, gutter `clamp(16px, 4vw, 40px)`. Breakpoints at 1000px, 820px and 640px. Below 640px the header becomes two rows (92px).
- Hash routing: `#/work/<id>` opens a case study; any other hash is a home-page anchor. Malformed fragments fall back to home.

## Motion (Stage 2)

One toolkit: CSS transitions and keyframes, the native View Transitions API and IntersectionObserver. There is no animation library. Easing is always `--ease-out`.

- **Hero scene (`EvidenceGate`).** The intro's right column is now a sample AdversarialCI evidence-gate run inside the glass panel. It replaces the legend: the colour key moved to a secondary card beside the "Selected work" heading. The run is six stages: claims, citation gate, judge, confidence recompute, consistency check, re-ask.
  - It plays once when visible (about 2 s per stage) and pauses its timer while off-screen.
  - Controls: Play/Pause/Replay, Next step, Restart. They use `aria-disabled`, not `disabled`, so focus stays put.
  - Every figure is computed by the ported rules in `src/lib/mechanisms.js`.
- **APEX-1 router (`ApexRouter`).** The APEX-1 case study's interactive gate. Presets plus form inputs drive the ported `gate()`, `tier_and_action()` and trust checks. The decision pill pops in (0.45 s) and the rule trail staggers in (70 ms per row). On narrow screens the result sits above the inputs, and a sticky glass decision bar at the bottom of the form shows the current `ai_gate` with a "Show why" button that scrolls to and focuses the full result (Stage 3, S2-F2).
- **Entrance.** `[data-reveal]` elements on the home page rise 16 px and fade in (0.8 s, staggered by `--i` × 90 ms). They are hidden only after `html.reveal-armed` is set, which never happens under reduced motion or without IntersectionObserver. Coming back from a case study does not replay the entrance.
- **Page swaps.** Home ↔ case study and case study ↔ case study use `document.startViewTransition`: a 0.28 s root crossfade, plus a 0.5 s morph of the project title (`view-transition-name: project-title`, set only for the duration of the transition). The transition is skipped when the browser lacks the API, under reduced motion, or when the page is hidden.
- **Reduced motion.** No autoplay; both scenes open on their finished state, which carries the full explanation. Switching the preference on while the page is open stops the run and shows the finished state; Next step and Restart still work, and Play shows the finished state (Stage 3, S2-F1). Any content still waiting for its entrance becomes visible at once. No view transitions and no entrance hiding; CSS cuts transitions and animations to 0.01 ms.

## Composition notes

- Resolved in Stage 2: the intro legend was replaced by the AdversarialCI evidence-gate scene, as Astra recommended. The legend is now secondary, next to Selected work.
- The detector flagged Geist as overused, so it was replaced. The grid canvas is an advisory flag, kept on purpose.

## 2026-10-11 — Owner-directed editorial revision

The owner rejected the audit-like public voice and dense presentation. The homepage now opens with a personal introduction and three project questions. Four featured projects use alternating question panels and plain-language descriptions on a warm neutral ground. The diagram legend and internal progress timeline are removed. Skills are compact grouped names, with no project links or explanatory paragraphs. Case studies lead with purpose, contribution and decisions; technical flows and recorded measurements remain available in a native details disclosure. Interactive demonstrations remain in the relevant case studies. This supersedes the earlier homepage composition and evidence-linked skills presentation. No new animation system was introduced.

## Hero depth refinement — 11 October 2026

Owner requested Apple-inspired depth without replacing the editorial layout. The hero now uses static pearlescent radial lighting (blue/lilac/peach), a frosted question panel, and offset soft shadows. Featured projects, skills and contact surfaces use reusable elevation tokens. Reading contrast remains dark ink on pale surfaces; mobile layouts retain one column. No perpetual animation or added dependency. Reduced transparency uses a solid hero-panel fallback.

## Neutral palette correction, 11 October 2026
Owner rejected coloured status badges and decorative pastel project colours. Status now appears as short, unboxed secondary text with no dot or status-specific colour. Project panels share a neutral stone/silver palette, and hero lighting is neutral. Preserve depth through light and shadow rather than assigning each project a colour. Blue remains for links; functional demo colours still distinguish meaningful states.
