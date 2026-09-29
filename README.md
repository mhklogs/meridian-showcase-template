<div align="center">

# Meridian Showcase Template

**Cinematic real-estate brokerage website template** — a scroll-driven single-page
React site with a canvas hero, pinned property carousel, interactive SVG market
map, and full compliance-page scaffolding.

`React 19` `Vite` `TypeScript` `Tailwind 4` `GSAP` `Lenis` `Motion`

[Quickstart](#quickstart) · [What's included](#whats-included) · [Rebranding in 10 minutes](#rebranding-in-10-minutes) · [Stack](#stack) · [Not included](#not-included)

</div>

---

## Why this template exists

Luxury brokerage and high-end property sites all need the same four things, and
every agency rebuilds them from scratch:

1. A **scroll-scrubbed cinematic hero** that survives slow connections
2. A **filterable property portfolio** that doesn't feel like a listing grid
3. A **market-coverage map** that communicates geographic reach
4. **Regulatory pages** (privacy, terms, disclosures) that auditors actually accept

This is that work, extracted and genericised. The animation architecture, the
canvas render loop, the map component and the compliance scaffolding are the
parts worth stealing — the branding is not.

Everything runs as a **static site with zero backend and zero secrets**.

---

## What's included

- **Canvas hero** — a frame-sequence video rendered to `<canvas>` and scrubbed by
  GSAP `ScrollTrigger` while the section is pinned. Frames are pre-decoded so
  scrubbing stays smooth instead of stuttering on video seek.
- **Property portfolio** — filterable estate grid (Single Family / Estate /
  Waterfront / Farm & Ranch / Modern) feeding a horizontally pinned carousel,
  with detail dossiers and an off-market inquiry flow.
- **Leadership dossiers** — credentials, specialties and links, opened as modal
  views rather than separate routes.
- **Spatial market map** — an interactive SVG map with a glowing node matrix,
  hover stats and corridor volume, built on gradient fills and labelled regions.
- **Services explainer** — expandable advisory accordions plus an affiliated
  financing unit panel.
- **Brand story and analytics** — animated quote and stat sections driven by
  Motion and GSAP.
- **Compliance scaffolding** — TREC-style disclosures, IABS notices, terms of
  use and privacy policy as modal views, with Fair Housing and
  fee-negotiability notices. Placeholder text and links throughout.
- **Dual navigation** — desktop sidebar dot-navigation and a mobile top nav.
- **Fully responsive** — dark obsidian and champagne-gold theme throughout.

---

## Quickstart

Prerequisites: **Node.js 18+** (tested on Node 20 and 22).

```bash
npm install
npm run dev        # Vite dev server on :3000, bound to 0.0.0.0
```

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove the `dist/` output directory |

Verified: `npm run lint` and `npm run build` both pass on a clean install.

---

## Rebranding in 10 minutes

Almost all content lives in **one file**: `src/data.ts`. You rarely need to
touch a component.

| What | Where |
| --- | --- |
| Brand name, tagline, meta description | `metadata.json`, `index.html` |
| Properties, services, leadership, stats, copy | `src/data.ts` |
| Map regions and corridor labels | `src/components/MapSection.tsx` |
| Colour tokens | `src/index.css` and the `#C5A059` / `#0D0D0D` literals in components |
| Compliance text and regulator links | `src/components/DisclosuresView.tsx`, `TermsView.tsx`, `PrivacyView.tsx` |

The package name in `package.json` and `package-lock.json` is
`meridian-showcase-template`; change it to match your project.

### Placeholders you must replace

Every identifier below is a deliberate placeholder, **not** a real licence or
person. Replace all of them before deploying anything commercially.

- Broker name: `Alex Morgan`
- Licence numbers: `TREC #0000000`, `NMLS #0000000`, `License #0175549`, `License #674792`
- Regulator links: `example.com/regulator`
- Affiliate: `Horizon Capital LLC`
- Market data, statistics and testimonials: **invented placeholder figures** —
  replace with your own or delete the section

> This template is a front-end shell. It carries no legal or regulatory
> standing. Real brokerage sites are regulated by jurisdiction; get your own
> compliance review before launch. The disclosures here are structural
> examples, not legal text.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build | Vite 6 |
| Language | TypeScript 5.8 (strict) |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Animation | GSAP 3 (ScrollTrigger) + Motion 12 |
| Smooth scroll | Lenis 1.3 |
| Icons | lucide-react |
| Routing | None — single page, no router by design |
| State | React local state; all content is static data |

No backend, no database, no auth, no API calls. Deploy the `dist/` output to
any static host.

---

## Not included

Being explicit so you don't waste time looking for it:

- ❌ **No CMS** — content is a typed TS module, not fetched at runtime
- ❌ **No lead capture** — the contact form validates client-side and composes a
  summary; it does not send. Wire it to your own endpoint or CRM
- ❌ **No routing** — single page with modal views
- ❌ **No real listing data** — properties are placeholders
- ❌ **No analytics** — the analytics section is a visual component, not a
  tracking integration
- ❌ **No legal text** — see the placeholder warning above

---

## Project documentation

The `documents/` folder holds engineering specs derived from the source tree:
functional and non-functional requirements, a data-flow diagram, use cases and
an architecture summary. Useful if you're extending this rather than just
rebranding it.

```bash
npm run dev
```

MIT licensed — use it commercially, no attribution required.

---

## Credits

Built by [Hassaan Abdullah Kiyani](https://github.com/mhklogs) — AI Engineer &
SQA Specialist.
