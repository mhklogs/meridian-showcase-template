# AGENTS.md — Meridian Estates Real Estate

## What this is

A cinematic single-page React app for **Meridian Estates**, a Colorado-based luxury real estate brokerage led by Designated Broker Alex Morgan. It showcases properties, services, executive bios, and market coverage across Colorado — no backend, no CMS, no router.

## Commands (verified in `package.json`)

```bash
npm install
npm run dev        # Vite dev server on :3000, --host=0.0.0.0
npm run build      # Outputs to dist/
npm run preview    # Serves the production build from dist/
npm run lint       # `tsc --noEmit` — type-check only, no JS output
npm run clean      # `rm -rf dist server.js` (server.js is dead code — no server exists)
```

There are no tests and no linting linter — `npm run lint` is purely TypeScript type-checking.

## Architecture

```
src/
  App.tsx              — Page shell. Manages activePage state ('home'|'about'|'services'|'properties'|'contact'|'disclosures') with AnimatePresence transitions. No react-router.
  data.ts              — ALL business content lives here: PROPERTIES[], SERVICES[], EXECUTIVES[], MARKETS[], VALUE_PILLARS[]. Edit this to change site content.
  types.ts             — TypeScript interfaces and the ActivePage union.
  main.tsx             — React 19 strict-mode entry.
  index.css            — Tailwind import + @theme custom color variables (brand-cream, brand-charcoal, brand-orange, brand-taupe, brand-panel) + dark-mode overrides.

components/
  Navbar.tsx           — Fixed top nav. Uses layoutId="activeIndicator" spring animation for the active-page underline.
  Hero.tsx             — Full-viewport layered composition (background image → gradient scrim → typography → foreground cutout → CTA). GSAP ScrollTrigger for parallax title movement.
  Narrative.tsx        — Brand story section using ScrollStack.
  Analytics.tsx        — Three-column hover-expand stats with Odometer counters (triggered by motion/useInView).
  Showcase.tsx         — ScrollStack carousels property images.
  MapSection.tsx       — Leaflet map of Colorado markets. Markers and fly-to controlled via react-leaflet hooks; map interactions (drag/scroll/zoom) are locked — selection is panel-driven only.
  ContactSection.tsx   — Full-width contact form + footer. Form submission is simulated (sets a `submitted` boolean, resets after 4s). No API call.
  PropertiesHub.tsx    — Filterable property grid with detail modal drawer. Pre-fills the contact form via `onContactSeller` callback.
  AboutView.tsx        — Executive bios + value pillars.
  ServicesView.tsx     — Service cards.
  DisclosuresSection.tsx — TREC-mandated disclosure text.
  ScrollStack.tsx      — Custom scroll-snapping carousel (Lenis + requestAnimationFrame). Wraps cards that shrink/stack as you scroll past them.
```

**Key pattern**: `App.tsx` renders one view at a time via conditional rendering keyed on `activePage`, wrapped in `<AnimatePresence mode="wait">`. Each view mounts/unmounts on navigation, not just hides.

## Conventions

- **Props interfaces** are named `{ComponentName}Props` and placed above the component (see `Navbar.tsx:6`).
- **IDs** are kebab-case strings assigned to interactive elements for testing/automation (`id="nav-item-about"`, `id="form-submit-btn"`, etc.).
- **All data is static** in `src/data.ts`. To add a property, service, or executive, edit that file — nothing else.
- **Color tokens** come from CSS variables defined in `src/index.css` (`--brand-orange`, `--brand-cream`, etc.) and exposed via Tailwind's `@theme`. Use `text-brand-orange`, `bg-brand-cream`, etc. Do not hardcode hex values in components.
- **Dark mode** toggles `dark` class on both `<html>` and `<body>` (see `App.tsx:28-36`). All components must respect the `dark:` Tailwind variant.
- **Fonts**: Cinzel (serif/display), Plus Jakarta Sans (sans/body), Space Grotesk (mono). Defined in `index.css` as `--font-display`, `--font-sans`, `--font-mono`.
- **External images**: Unsplash URLs are used directly in `data.ts` and components. Local assets live in `src/assets/` (referenced as `import ... from '../../assets/...'`).

## Traps

1. **`npm run lint` is not a linter** — it runs `tsc --noEmit`. If TypeScript compiles, lint passes. There is no ESLint config.
2. **The contact form does not send data anywhere**. `ContactSection.tsx:36-52` sets a `submitted` flag and resets after 4 seconds. Adding real submission requires wiring up an API endpoint.
3. **`ScrollStack` uses Lenis** (smooth scroll library). If you wrap content in `<ScrollStack>`, do not also enable native browser smooth-scroll on child elements — they will fight.
4. **`@/` path alias** resolves to the project root (see `vite.config.ts:10-12` and `tsconfig.json:18-21`). Import from `@/components/Navbar` works, but the alias mapping is `./*` not `src/*`.
5. **Hero layering is exact**: z-0 (background photo) → z-5 (gradient) → z-10 (typography) → z-20 (foreground cutout PNG) → z-30 (CTAs). Reordering breaks the parallax effect.
6. **`active:scale-95`** is used consistently on buttons as an active-press feedback. Do not remove it — it is part of the design system.
7. **GSAP plugins must be registered** before use. `Hero.tsx` calls `gsap.registerPlugin(ScrollTrigger)` inside the `useEffect`. If you add new GSAP animations, register their plugins the same way.
8. **No `server.js` exists** despite `npm run clean` removing it. The `clean` script is a remnant — safe to leave as-is.
9. **Leaflet CSS must be imported** (see `MapSection.tsx:7`). Forgetting `import 'leaflet/dist/leaflet.css'` breaks all marker icons.
10. **Property images use `grayscale group-hover:grayscale-0`** as the default interaction. Do not change this without updating the hover state consistently across all property cards.
