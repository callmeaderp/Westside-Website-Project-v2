# Westside Website v2

## Overview

Website redesign demo for Westside Professional Landscape. Dark premium theme (SYNLawn-inspired), 6-page static site on GitHub Pages. Pure HTML/CSS/JS, no build tools.

**Live:** https://callmeaderp.github.io/Westside-Website-Project-v2/
**Repo:** `callmeaderp/Westside-Website-Project-v2` (public, GitHub Pages from master)

## Structure

```
css/style.css              Design system: tokens, components, responsive (1135 lines)
js/main.js                 Nav, scroll animations, gallery filter/lightbox, form handler
index.html                 Home — hero, service cards, 5-step highlight, stats, testimonials
services.html              7 services in chess/alternating layout
plant-health.html          5-step program landing page (flagship) — timeline, sticky pricing
about.html                 History timeline, values, team cards, certifications
gallery.html               Filterable grid + lightbox
contact.html               Form, info cards, hours, FAQ
images/                    Reserved for real photos (currently empty; uses Unsplash URLs)
WEBSITE-REFERENCE.md       Comprehensive reference doc — READ THIS for full details
```

### Gotchas
- **Header/footer are duplicated** in all 6 HTML files. When changing nav links, logo, or footer — update all 6.
- **All images are Unsplash URLs** in inline `style` attributes. Search for `unsplash.com` to find them.
- `plant-health.html` has page-specific `<style>` block (timeline, pricing card, step layout).
- `gallery.html` and `about.html` also have page-specific `<style>` blocks.
- Deploy is automatic on `git push` — GitHub Pages legacy build, ~1-2 min delay.

## Notes

- **Full reference:** `WEBSITE-REFERENCE.md` has the complete design system (color tokens, typography, buttons, layout patterns, breakpoints), page-by-page section breakdown, placeholder inventory, and dev/deploy instructions.
- **Parent project:** `../Westside/` has all source content (Brantley's program details, brand tokens, meeting notes, SYNLawn design analysis, personnel info). That's where the copy came from.
- **Brand:** Green primary `#00863F`, accent `#6CC551`, dark bg `#111`. Anton headings, Source Sans 3 body.
- **Placeholders still needed:** Real phone number, real photos, real testimonials, real team headshots, social URLs, form backend. See table in `WEBSITE-REFERENCE.md`.
