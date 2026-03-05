# Westside Website v2

## Overview

Website redesign demo for Westside Professional Landscape. Dark premium theme (SYNLawn-inspired), 6-page static site on GitHub Pages. Pure HTML/CSS/JS, no build tools.

**Live:** https://callmeaderp.github.io/Westside-Website-Project-v2/
**Repo:** `callmeaderp/Westside-Website-Project-v2` (public, GitHub Pages from master)

## Structure

```
css/style.css              Design system: tokens, components, responsive
js/main.js                 Nav, scroll animations, gallery filter/lightbox, form handler
index.html                 Home — hero, service cards, 5-step highlight, stats, testimonials
services.html              7 services in chess/alternating layout
plant-health.html          5-step program landing page (flagship) — timeline, sticky pricing
about.html                 History timeline, values, team cards, certifications
gallery.html               Filterable grid + lightbox
contact.html               Form, info cards, hours, FAQ
images/
  leaf-green.svg           Vector-traced Westside leaf (green, for favicon)
  leaf-white.svg           Vector-traced Westside leaf (white, for header/footer logos)
  placeholder-*.svg        26 aesthetic placeholder SVGs for all photo positions
screenshots/               Dev screenshots from build process (~40 PNGs)
AUDIT-REPORT.md            Full site audit: Lighthouse, accessibility, links, assets, visual
WEBSITE-REFERENCE.md       Comprehensive reference doc — READ THIS for full details
```

### Gotchas
- **Header/footer are duplicated** in all 6 HTML files. When changing nav links, logo, or footer — update all 6.
- **Footer column headings use `<p class="footer-heading">`**, not `<h4>`. CSS selector is `.footer-col .footer-heading`. Changed from `<h4>` to fix heading hierarchy (was skipping H3).
- **Each page has `class="active"`** on its nav link. CSS: `.main-nav > a.active` and `.nav-dropdown > a.active` for white text + green underline.
- **Logo uses leaf SVG + Merriweather Bold serif font** (matching original Westside logo). The leaf was vector-traced from `../Westside/reference/assets/leaf.png` via potrace.
- **Three Google Fonts loaded:** Anton (headings), Merriweather (logo), Source Sans 3 (body).
- **All images are local SVG placeholders** in `images/`. They use `background-image: url('images/placeholder-*.svg')` in inline `style` attributes.
- `plant-health.html`, `gallery.html`, `about.html`, `contact.html` each have page-specific `<style>` blocks.
- Deploy is automatic on `git push` — GitHub Pages legacy build, ~1-2 min delay.

## Notes

- **Full reference:** `WEBSITE-REFERENCE.md` has the complete design system (color tokens, typography, buttons, layout patterns, breakpoints), page-by-page section breakdown, placeholder inventory, and dev/deploy instructions.
- **Parent project:** `../Westside/` has all source content (Brantley's program details, brand tokens, meeting notes, SYNLawn design analysis, personnel info). That's where the copy came from.
- **Brand:** Green primary `#00863F`, accent `#6CC551`, dark bg `#111`. Anton headings, Merriweather logo, Source Sans 3 body.
- **Verified vs. placeholder content:** A Gemini sub-agent verified all factual claims against source material. Verified info (pricing, 5-step details, personnel, certs) is live. Unverified items are obvious placeholders: phone `(585) XXX-XXXX`, testimonials say "Client Name", stats show `---`, office hours say "Needs confirmation".
- **Still needed for production:** Real phone number, real photos, real testimonials, real team headshots, verified office hours, social URLs, form backend, verified email. See table in `WEBSITE-REFERENCE.md`.
