# Website V2 Demo — Audit Report

**Date:** March 5, 2026
**URL:** https://callmeaderp.github.io/Westside-Website-Project-v2/
**Pages tested:** 6 (Home, Services, Plant Health, About, Gallery, Contact)
**Tools used:** Lighthouse 13.0.3, Playwright (Chromium), htmlq, curl, custom scripts

---

## Lighthouse Scores

| Page         | Performance | Accessibility | Best Practices | SEO  |
|--------------|:-----------:|:-------------:|:--------------:|:----:|
| Home         | 87%         | 96%           | 100%           | 100% |
| Services     | 88%         | 96%           | 100%           | 100% |
| Plant Health | 88%         | 98%           | 100%           | 100% |
| About        | 88%         | 96%           | 100%           | 100% |
| Gallery      | 88%         | 96%           | 100%           | 100% |
| Contact      | 71%         | 97%           | 100%           | 100% |

**Best Practices and SEO are perfect across the board.** Accessibility is strong (96-98%). Performance is the weakest category, especially the Contact page.

---

## What's Working Well

- **Zero broken links** — all 12 internal paths resolve (including anchor links to service sections). No external links to break.
- **Zero broken assets** — all 26 placeholder SVGs, both leaf SVGs, style.css, and main.js load with HTTP 200.
- **Zero JavaScript errors** — Playwright found no console errors or page errors on any page.
- **Zero mixed content** — no insecure `http://` references anywhere.
- **No duplicate IDs** — clean DOM on all pages.
- **Good color contrast** — Lighthouse's contrast audit passes on every page.
- **Solid meta tags** — every page has unique `<title>`, unique `<meta description>`, proper `charset`, `viewport`, `lang="en"`, and custom favicon.
- **All 3 Google Fonts load** — Anton (headings), Merriweather (logo), Source Sans 3 (body) all reach "loaded" status.
- **Proper heading structure** — every page has exactly one `<h1>`. Heading hierarchy is mostly sequential.
- **CSS custom properties** — 20+ design tokens consistently used across the stylesheet.
- **Scroll animations** — IntersectionObserver-based fade animations are implemented in main.js.
- **Responsive** — hamburger nav present for mobile. Layout adapts across 375px / 768px / 1440px viewports.
- **Phone numbers properly placeholdered** — all show `(585) XXX-XXXX`, no fake 555 numbers, `tel:` links point to `#`.
- **Testimonials clearly marked as placeholders** — dashed borders, gray stars, "Client Name", "?" avatars.
- **Stats placeholdered** — unverified numbers show `---` in muted color.
- **Office hours** say "Needs confirmation" with dashed border.

---

## Issues Found

### Critical (Should fix before showing to client)

#### 1. No `<main>` landmark
**All 6 pages** lack a `<main>` element. Screen readers can't identify the primary content region. Lighthouse flags this on every page.

**Fix:** Wrap the content between `<header>` and `<footer>` in `<main>`.

#### 2. Heading level skips (H2 → H4)
Several pages jump from `<h2>` directly to `<h4>`, skipping `<h3>`:
- **services.html**: H1 → H2 (×8) → H4 (×3) — footer headings are H4 with no H3 parent
- **gallery.html**: H1 → H2 → H4 (×3)
- **contact.html**: H1 → H2 → H4 (×4) → H3 → H2 → H4 (×8)

The H4s appear to be in the footer, which is duplicated across all pages. If the footer uses H4 for column headings, those should be H3 or styled `<p>`/`<span>` elements instead.

**Fix:** Change footer column headings from `<h4>` to `<h3>` (or non-heading elements).

### Important (Should fix for production quality)

#### 3. No Open Graph tags
No page has `og:title`, `og:description`, or `og:image`. When shared on Facebook, LinkedIn, iMessage, or Slack, the link preview will be blank or auto-generated.

**Fix:** Add OG tags to each page's `<head>`. At minimum: `og:title`, `og:description`, `og:type`, `og:url`. `og:image` can wait until real photos exist.

#### 4. No canonical URLs
Lighthouse flags missing `<link rel="canonical">` on all 6 pages. Without canonicals, search engines may index both trailing-slash and non-trailing-slash versions.

**Fix:** Add `<link rel="canonical" href="https://callmeaderp.github.io/Westside-Website-Project-v2/{page}">` to each page.

#### 5. No robots.txt or sitemap.xml
Both return 404. Not critical for a demo, but expected for any site Google will crawl.

**Fix:** Create a basic `robots.txt` (Allow all, point to sitemap) and `sitemap.xml` (list all 6 pages).

#### 6. Footer inconsistency across pages
The footer is hand-duplicated in all 6 HTML files and has drifted:
- **index.html** has an extra `#` placeholder link and a `contact.html` link that other pages don't have.
- **plant-health.html / about.html / gallery.html / contact.html** share one footer pattern.
- **services.html** has yet another variant.

Three distinct footers across 6 pages.

**Fix:** Audit and unify the footer across all pages. (Long-term: consider a JS include or build step.)

#### 7. Nav link inconsistency on services.html
The services dropdown links use `#anchor` on services.html (correct, since you're already on the page) but `services.html#anchor` on all other pages. This works correctly, but the hash signatures differ, meaning the nav HTML isn't identical across pages.

This is technically fine behavior, but risks divergence when editing by hand.

#### 8. No active nav state
No page highlights the current page in the navigation. Clicking "About" takes you to about.html, but the "About" nav link doesn't show as active/current. This is a usability issue — users can't see where they are.

**Fix:** Add an `active` class to the current page's nav link in each HTML file, and style it (e.g., green underline or color change).

### Minor / Nice-to-Have

#### 9. Contact form has no backend
The `<form>` element has no `action` or `method` attribute. Submitting does nothing. This is expected for a demo, but should be clearly noted.

**Fix (for demo):** Add a visible note: "Form is a demo — submissions are not sent." Or wire up a simple Formspree/Netlify Forms endpoint.

#### 10. Social media links are `#` placeholders
Footer has Facebook and Instagram links pointing to `#`. Clicking them scrolls to top.

**Fix:** Either add real URLs or remove the social icons from the demo.

#### 11. Performance: Google Fonts render-blocking
FCP is 3.0–4.7 seconds across pages. The main bottleneck is Google Fonts — the browser must fetch the CSS and font files before rendering text. Contact page is slowest (4.7s FCP, 71% performance score).

**Fix (production):** Add `font-display: swap` (already in the Google Fonts URL via `&display=swap`), consider self-hosting fonts, or use `<link rel="preconnect">` for `fonts.gstatic.com`.

#### 12. Unused font weights loaded
Source Sans 3 weight 900 is requested but never reaches "loaded" status (no element on the page uses it). The Google Fonts request includes `wght@400;600;700;900`.

**Fix:** Remove `900` from the font request if it's not used, saving bandwidth.

#### 13. No custom 404 page
GitHub Pages shows its default 404. A branded 404 page would be more polished.

**Fix:** Create a `404.html` with the site's branding and a link back to home.

---

## Visual Audit (Screenshots)

Screenshots taken at 375px (mobile), 768px (tablet), and 1440px (desktop) for all 6 pages. Stored in `/tmp/website-audit/`.

### Observations

- **Dark theme reads cleanly** — the dark background with green accents is consistent and professional.
- **Placeholder images are very subtle** — the dark-green-on-dark SVG placeholders nearly disappear into the dark theme. They're present and load correctly, but visually the pages look very empty. This is a design tradeoff: they don't distract, but they also don't strongly signal "photo goes here."
- **Hero sections work well** — centered text, green CTA buttons, proper hierarchy.
- **Footer is well-organized** — 4-column layout (brand, services, company, contact) with green gradient divider above.
- **Mobile layout is functional** — content stacks properly, text is readable, buttons are tap-sized.
- **Gallery filter buttons render correctly** — "All Projects", "Landscape", "Hardscape", etc. visible at desktop width.
- **Plant Health page** has strong structure — stats bar (5 visits / $450 / 100% / FREE), timeline, pricing — all render correctly.

---

## Summary

| Category        | Verdict | Notes |
|-----------------|---------|-------|
| Functionality   | **Pass** | All links, assets, and JS work. Zero errors. |
| Accessibility   | **Needs work** | Missing `<main>` landmark, heading skips. Contrast and alt text are good. |
| SEO             | **Pass (basic)** | Good titles/descriptions. Missing OG tags, canonicals, sitemap. |
| Best Practices  | **Pass** | 100% Lighthouse. No security issues. |
| Performance     | **Acceptable** | 87% avg. Font loading is the bottleneck. Zero layout shift. |
| Content         | **Demo-ready** | Verified facts kept, unverified items properly placeholdered. |
| Consistency     | **Needs work** | Footer drift across pages, no active nav state. |
| Visual          | **Good** | Professional dark theme. Placeholder images are very subtle. |

### Top 3 Priorities
1. **Add `<main>` landmark to all pages** — easy fix, big accessibility win
2. **Fix heading hierarchy** (H4s in footer → H3 or non-heading) — easy fix
3. **Add active nav state** — improves usability significantly
