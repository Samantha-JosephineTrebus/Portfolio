# Copilot Instructions for Portfolio Project

## Project Overview
This is a professional portfolio website for Samantha-Josephine Trebus, a Media Informatics student. It showcases projects, skills, services, and contact information with a dark theme featuring purple/lavender accents. The site is fully responsive and includes interactive animations and form validation.

**Tech Stack:** HTML5, CSS3 (with CSS Grid/Flexbox), vanilla JavaScript (no frameworks)

## Architecture & Key Components

### Structure Pattern
- **Single-page application (SPA)** with anchor-based navigation (`#home`, `#über`, `#projekte`, `#preise`, `#kontakt`)
- **Semantic HTML** using `<article>` elements for major sections (stored in [index.html](index.html#L45))
- **All styles** in [styles/styleNeu.css](styles/styleNeu.css) (~1286 lines), with CSS variables for theming (see `:root` vars)
- **All interactivity** in [styles/script.js](styles/script.js) (159 lines)

### Key Features & Implementation Patterns

1. **Intersection Observer (Animation Trigger)**
   - Articles animate into view with `.visible` class when scrolled into viewport
   - Threshold: 0.01 (triggers very early)
   - [Reference: script.js#L1-L15](styles/script.js#L1-L15)

2. **Smooth Navigation with Header Offset**
   - Anchor clicks scroll smoothly to sections accounting for fixed header height
   - Accounts for `headerOffset + extraPadding` (20px buffer)
   - Updates active nav link on scroll
   - [Reference: script.js#L80-L100](styles/script.js#L80-L100)

3. **Mobile Menu Toggle**
   - Hamburger menu button controls nav visibility
   - Auto-closes when clicking outside nav or on a link
   - Uses `.active` class for state management
   - [Reference: script.js#L115-L135](styles/script.js#L115-L135)

4. **Form Validation (Live & Submit)**
   - Real-time validation on `lastNameInput` with immediate feedback
   - Rules: non-empty, ≥2 chars, starts with uppercase letter
   - Submit validation includes firstname check + checkbox confirmation
   - Shows success/error classes for styling feedback
   - [Reference: script.js#L20-L60](styles/script.js#L20-L60)

### Design System
- **Color Scheme (CSS vars in styleNeu.css):**
  - Primary: `--primary-dark: #181818`, `--primary-light: #2a2a2a`
  - Accents: `--accent-light: #c59af7` (light purple), `--accent-dark: #7c6eeb` (deep purple)
  - Background: Linear gradient (135deg, #0f0f0f → #1a1a2e)
  - Text: `--text-color: #ffffff`, `--text-muted: #b0b0b0`
- **Typography:** "Inter" sans-serif (400, 700 weights) for body; Georgia serif for headers
- **Glass-morphism:** Subtle overlay using `--glass-bg: rgba(255,255,255,0.05)`

## Developer Workflows

### No Build Process Required
- Static site: open [index.html](index.html) directly in browser
- No npm, no build tools, no minification
- CSS and JS imported directly (no bundling)

### Responsive Design
- Mobile-first approach with media queries in styleNeu.css
- Hamburger menu auto-shows on small screens
- Flexbox/Grid layouts adapt across breakpoints

### Form Submission
- Currently NO backend integration—form validates locally only
- To add submission: capture form data in script.js submit handler, POST to backend endpoint

## File Responsibilities

| File | Purpose | Key Details |
|------|---------|------------|
| [index.html](index.html) | Content & structure | 236 lines; all articles, form, meta tags |
| [styles/styleNeu.css](styles/styleNeu.css) | All styling | ~1286 lines; animations, grid background, component styles |
| [styles/script.js](styles/script.js) | Interactivity | 159 lines; IntersectionObserver, nav, form validation, menu toggle |
| [pics/](pics/) | Images | Logo photos (test2.jpg, Lebenslauf-Lichtfoto.jpg) |

## Common Patterns to Follow

1. **Class-based state management** — use `.active`, `.visible`, `.error`, `.success` classes for UI state (CSS handles display)
2. **Vanilla DOM API** — `querySelector`, `addEventListener`, `classList.toggle/add/remove`; no jQuery or frameworks
3. **Semantic elements** — `<article>`, `<section>`, `<nav>` for accessibility & SEO
4. **CSS variables** — reference `:root` vars (e.g., `var(--accent-dark)`) for consistency; NEVER hardcode colors
5. **Validation patterns** — use regex (`/^[A-ZÜÄÖ]/`) for constraints; always provide user feedback

## Quick References

- **To add a new section:** Create `<article>` in index.html with unique `id`, add nav link, style with `.article` class
- **To modify colors:** Update CSS variables in `styleNeu.css :root` block—all components inherit automatically
- **To add form fields:** Mirror the `lastNameInput` pattern: input element → validation regex → feedback div → live listener + submit handler
- **To add animations:** Use `@keyframes` in CSS; trigger with `.visible` class via IntersectionObserver
- **For accessibility:** Always use semantic HTML, `aria-label` on buttons, alt text on images

## Known Limitations & TODOs
- LearnLoop project section marked incomplete ("Da es sich um unser erstes Projekt handelte...")
- No backend integration—form collects data but doesn't persist
- Game currency/shop features in LearnLoop are placeholder only
- Responsive design incomplete for tablets per HTML comments
