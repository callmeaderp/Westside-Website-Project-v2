# Westside Professional Landscape — Website v2 Reference

## Overview

Complete website redesign demo for Westside Professional Landscape. Dark premium theme inspired by SYNLawn's design language, adapted for Westside's brand. Pure static site (HTML/CSS/JS) hosted on GitHub Pages.

**Live URL:** https://callmeaderp.github.io/Westside-Website-Project-v2/
**Repo:** https://github.com/callmeaderp/Westside-Website-Project-v2 (public)
**GitHub Pages:** Legacy build from `master` branch, root `/`

## Structure

```
Westside-Website-v2/
  css/
    style.css              Design system + all component styles (1135 lines)
  js/
    main.js                All interactivity: nav, scroll anims, gallery, form (212 lines)
  images/                  Empty — reserved for real photos when available
  index.html               Home page (412 lines)
  services.html            All services overview (377 lines)
  plant-health.html        5-Step Lawn Care dedicated page (572 lines)
  about.html               Company history, team, values (471 lines)
  gallery.html             Filterable portfolio grid + lightbox (427 lines)
  contact.html             Contact form, info, FAQ (428 lines)
  screenshots/             Dev screenshots (gitignored)
  .gitignore
  WEBSITE-REFERENCE.md     This file
```

## Design System

### Theme: Dark Premium

Inspired by SYNLawn's dark-first approach. The site defaults to dark backgrounds (`#111`) with green accents that pop. Key reference: `reference/synlawn-scrape/design-analysis.md` in the main Westside project has the full SYNLawn breakdown.

### Colors (CSS custom properties in `:root`)

| Token                  | Value                     | Role                          |
|------------------------|---------------------------|-------------------------------|
| `--green-primary`      | `#00863F`                 | Westside brand green          |
| `--green-bright`       | `#6CC551`                 | Accent green, text highlights |
| `--green-dark`         | `#005C2B`                 | Darker green (rare)           |
| `--green-gradient`     | `135deg, #6CC551 → #00863F` | Buttons, badges, accents   |
| `--bg-dark`            | `#111111`                 | Primary background            |
| `--bg-dark-alt`        | `#161616`                 | Alternating section bg        |
| `--bg-dark-card`       | `#1a1a1a`                 | Card backgrounds              |
| `--bg-dark-elevated`   | `#222222`                 | Elevated elements, dropdowns  |
| `--bg-overlay-heavy`   | `rgba(0,0,0,0.78)`       | Hero image overlays           |
| `--text-white`         | `#ffffff`                 | Primary text on dark          |
| `--text-light`         | `#e0e0e0`                 | Body text on dark             |
| `--text-muted`         | `#999999`                 | Secondary/caption text        |
| `--border-dark`        | `#2a2a2a`                 | Card/section borders          |
| `--shadow-green`       | Green glow shadow         | Button hover, highlights      |

### Typography

- **Headings:** Anton (Google Font). Always uppercase. Single weight (400 — looks bold naturally). Used via `--font-heading`.
- **Body:** Source Sans 3 (Google Font). Weights 400/600/700/900. Used via `--font-body`.
- **Scale:** `clamp()` responsive sizing. H1 = `clamp(2.5rem, 5vw, 4.5rem)` down to H4 = `clamp(1.2rem, 2vw, 1.5rem)`.
- **Section labels:** Small uppercase green text with letter-spacing 3px (`.section-label`).

### Buttons

All pill-shaped (`border-radius: 100px`). Four variants:
- `.btn-primary` — Green gradient, white text, green glow shadow. Main CTA.
- `.btn-outline` — Transparent, white border. Secondary action.
- `.btn-outline-green` — Transparent, green border. Alternative secondary.
- `.btn-dark` — Dark background. Used on green CTA banners.
- Size modifiers: `.btn-lg`, `.btn-sm`.

### Layout Patterns

- **Hero sections:** Full-viewport with background image, dark overlay, centered content. Geometric accent lines (vertical, horizontal, corner) via pseudo-elements. Page heroes are shorter (`min-height: 50vh`).
- **Chess/alternating blocks:** Two-column `grid` with image on one side, content on other. `.reverse` class flips direction. Used extensively on services page.
- **Card grids:** `.grid-2`, `.grid-3`, `.grid-4` with responsive collapse. Cards have dark background, border, hover lift effect.
- **Stats bar:** 4-column grid with large green numbers + labels. Counter animation on scroll.
- **CTA banner:** Full-width green gradient with subtle cross pattern overlay.
- **Container:** `--container-max: 1200px` for content, `--container-wide: 1400px` for gallery.

### Responsive Breakpoints

- **1024px:** 4-col → 2-col, chess blocks stack, footer 2-col
- **768px:** Everything stacks to 1-col, hamburger menu activates, hero shrinks, header height reduces to 70px

### Animations

All driven by `IntersectionObserver` in `main.js`:
- `.fade-in` — Fade up from 30px below
- `.fade-in-left` / `.fade-in-right` — Horizontal slide-in
- `.stagger-children` — Children animate sequentially with 0.1s delays
- `data-count` on `.stat-number` — Animated counter (counts up to target)
- Hero backgrounds have parallax on scroll

## Pages in Detail

### Home (`index.html`)

Sections in order:
1. **Hero** — Full-viewport lawn photo, "YOUR LANDSCAPE, OUR EXPERTISE", two CTAs
2. **Services overview** — 6 cards in 3-col grid (Landscape Design, Plant Health, Hardscaping, Water Features, Maintenance, Snow)
3. **5-Step Program highlight** — Chess block with plant photo left, program description right, $450 price, badges, two CTAs
4. **Why Choose Westside** — Stats bar (26+ years, 1000+ projects, 100%, DEC) + 2-col: text left, 4 credential cards right
5. **Testimonials** — 3 review cards with star ratings, quotes, avatar initials
6. **CTA banner** — Green gradient, "Ready to Transform Your Landscape?"
7. **Footer** — 4-column: about+social, services links, company links, contact info

### Services (`services.html`)

Chess/alternating blocks for each service:
1. Landscape Design (left image)
2. Maintenance (right image, `.reverse`)
3. **Plant Health** — Highlighted with featured badge, 5 step cards, $450 price, 5% discount. Links to dedicated page.
4. Hardscaping (left image)
5. Water Features (right image)
6. Snow & Ice (left image)
7. Holiday Decorating (right image)

### Plant Health (`plant-health.html`)

The flagship page. Custom styles in `<style>` block:
1. **Hero** — DEC Certified badge, "5-STEP LAWN CARE PROGRAM", $450 mention
2. **Value props bar** — 4-col: 5 visits, $450, 100% guarantee, FREE grub control
3. **Program details** — Two-column: timeline left (5 steps with connected dots, tags, FREE grub callout on step 3) + sticky pricing sidebar right ($450, early bird 5%, feature checklist, two CTAs, DEC badge)
4. **Additional services** — 6 cards: Deep Root Fertilization, Bed Maintenance, Aeration, Overseeding, Lawn Repair, Dethatching
5. **Why Westside** — Chess block with checklist (DEC certified, professional products, precise timing, guarantee, 26+ years)
6. **CTA banner**

### About (`about.html`)

Custom styles for timeline and team cards:
1. **Hero** — "BUILDING GREEN LANDSCAPES FOR OVER 26 YEARS"
2. **Company intro** — 2-col text + "EST. 2000" graphic
3. **Stats** — 26+ years, 1000+ projects, 500+ clients, 50+ team
4. **Timeline** — Vertical with green dots/connector: 2000 (founded), 2005 (commercial), 2010 (hardscaping), 2018 (holiday), 2023 (Top 100), 2026 (Plant Health division)
5. **Values** — 6 cards: Quality, Client Partnership, Environmental Stewardship, Excellence, Reliability, Integrity
6. **Certifications** — 3-col: DEC Certified, Top 100, Fully Insured
7. **Team** — 4 cards: Brad White (Owner), Heather White (Office Manager), Brantley Allen (Plant Health Manager), Jeff Ciotti (Operations)

### Gallery (`gallery.html`)

Custom styles for filter buttons, grid, lightbox:
1. **Hero** — "PROJECT GALLERY"
2. **Filter bar** — 6 buttons: All, Landscape, Hardscape, Water Features, Maintenance, Holiday
3. **Grid** — 12 items with mixed spans (items 1, 5, 10 span 2 columns). Each has hover overlay with category tag + caption. All images from Unsplash.
4. **Lightbox** — Full-screen overlay triggered by click, close on click/Escape

Filter logic in `main.js`: toggles `display` and `opacity` with transition.

### Contact (`contact.html`)

Custom styles for contact cards, hours table, form card:
1. **Hero** — "CONTACT US"
2. **Two-column layout:**
   - Left: Form card (first/last name, email, phone, service dropdown, message, "how did you hear" dropdown, submit)
   - Right: Contact info cards (office, phone, email), office hours table, "Prefer to Call?" CTA card
3. **Service area** — Map placeholder showing Rochester + surrounding towns
4. **FAQ** — 5 questions: estimates, service area, mid-season signup, commercial services, certifications

Form submit handler in `main.js` is demo-only (shows "Message Sent!" for 3 seconds, resets).

## Content Sources

All real content comes from authoritative sources in the main Westside project:
- **5-step program details** — `reference/brantley-emails-march-4.md` (Brantley's emails)
- **Pricing** — $450/season, 5% early bird by April 1 (from March 4 meeting)
- **Additional services** — Brantley's list: Deep Root Fertilization, Bed Maintenance, Aeration, Overseeding, Lawn Repair, Dethatching
- **Certifications** — NYS DEC Certified Applicator, Top 100
- **Company info** — Founded 2000, Brad White owner, Rochester NY area
- **Personnel** — Brad White (Owner), Heather White (Office Manager), Brantley Allen (Plant Health Manager), Jeff Ciotti (Operations)

## Placeholders to Replace

These items need real data before production:

| Placeholder | Current | Needs |
|---|---|---|
| **Phone number** | (585) 555-1234 | Real Westside phone number |
| **Email** | info@westsideprolandscape.com | Verify this is correct |
| **Address** | "Rochester, NY Area" | Real street address |
| **All images** | Unsplash stock photos | Real Westside portfolio photos |
| **Testimonials** | 3 fabricated reviews | Real client testimonials |
| **Team photos** | Letter avatars | Real headshots |
| **Social links** | `#` placeholders | Real Facebook/Instagram/Google URLs |
| **Stats** | Rounded estimates (1000+ projects, 500+ clients, 50+ team) | Verified numbers |
| **Timeline events** | Estimated dates for milestones | Verified company history |
| **Office hours** | Mon-Fri 8-5, Sat by appointment | Verify actual hours |
| **Form** | Demo handler (no backend) | Real form backend (Formspree, Netlify Forms, etc.) |
| **Map** | SVG placeholder | Embedded Google Map or similar |

## Shared Components (Header/Footer)

The header and footer HTML are duplicated in each page (no templating system). When updating nav links, footer content, or logo, **update all 6 files**. The header/footer are identical across pages except for the `active` class on nav links.

### Header Structure
```
.site-header (fixed, blurred backdrop)
  .header-inner (flex: logo | nav | cta button | hamburger toggle)
    .logo (.logo-icon "W" + .logo-text name/tagline)
    .main-nav (5 links: Home, Services [dropdown], About, Gallery, Contact)
    .header-cta (green pill button, hidden on mobile)
    .menu-toggle (hamburger, visible on mobile only)
```

### Footer Structure
```
.site-footer
  .footer-grid (4 columns: about | services | company | contact)
  .footer-bottom (copyright | privacy/terms links)
```

## How to Work on This

### Local Development
```bash
cd C:/Users/callm/Documents/PROJECTS/Westside-Website-v2
# Any static file server works:
python -m http.server 8765
# Then open http://localhost:8765/
```

### Deploy Changes
```bash
cd C:/Users/callm/Documents/PROJECTS/Westside-Website-v2
git add <files>
git commit -m "description"
git push
# GitHub Pages auto-rebuilds from master (takes ~1-2 minutes)
```

### Adding a New Page
1. Copy any existing page as a template
2. Update the `<title>` and `<meta description>`
3. Change the hero content
4. Set the correct `active` class on the nav link
5. Add the page body content
6. Update nav links in ALL other pages if adding to navigation

### Changing the Color Scheme
All colors are CSS custom properties in `:root` at the top of `style.css`. Change the token values there — they propagate everywhere automatically. The green gradient is used in buttons, badges, CTA banners, and decorative elements.

### Replacing Placeholder Images
All images are loaded via Unsplash URLs in `style` attributes (`background-image: url(...)`) or inline on `<div>` elements. Search for `unsplash.com` across all HTML files to find them. To use local images, place files in `images/` and update the URLs to relative paths like `images/photo-name.jpg`.

## Relationship to Main Westside Project

This website project lives in a separate directory and repo from the main Westside marketing workspace:
- **Main project:** `C:/Users/callm/Documents/PROJECTS/Westside/` (repo: `callmeaderp/westside`)
- **Website v2:** `C:/Users/callm/Documents/PROJECTS/Westside-Website-v2/` (repo: `callmeaderp/Westside-Website-Project-v2`)

The main project contains the reference materials, brand tokens, meeting notes, personnel details, and all the content that informed this website's copy. The `reference/synlawn-scrape/design-analysis.md` file in the main project is the design reference that drove the visual direction.

There's also a v1 website project at `callmeaderp/Westside-Website-Project` — that was an earlier, simpler demo.

## Current Status

Working demo. Brad and the team were enthusiastic about the first demo. This v2 is significantly more ambitious — dark premium theme, dedicated plant health landing page, full responsiveness, animations. It's ready to show but has placeholder content that needs to be swapped for production use.
