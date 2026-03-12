# Pre-Launch Checklist — Westside Website v2

Everything below must be resolved before redirecting `westsideprolandscape.com` to Cloudflare Pages. Items are grouped by who needs to act.

---

## You (Joshua) — Verification

These need your eyes/judgment. Claude can execute once you confirm.

### ☐ Web3Forms API Key
The contact form points to `https://api.web3forms.com/submit` but has a placeholder access key.
- **File:** `contact.html` line 204 — `value="YOUR_ACCESS_KEY_HERE"`
- **Action:** Go to [web3forms.com](https://web3forms.com), create a free account, generate an access key for `info@westsideprolandscape.com` (or whichever email should receive form submissions), and replace the placeholder.
- **Test:** After replacing the key, submit the form on the live site and confirm the email arrives.

### ☐ Google Maps Embed
The current iframe uses a **fabricated place ID** — the map may not load or may show the wrong location.
- **File:** `contact.html` lines 343–352
- **Action:** Go to [Google Maps](https://www.google.com/maps/place/Westside+Professional+Landscape,+Inc.), click **Share → Embed a map**, copy the iframe `src` URL, and replace the current one. The existing coordinates (43.1442945, -77.7239414) are correct but the place ID hash is fake.
- **Quick test:** Open `contact.html` in a browser and see if the map renders.

### ☐ NAP Consistency (Name, Address, Phone)
Before going live, confirm the business info matches everywhere:
- **Website says:** Westside Professional Landscape, Inc. · 2565 Buffalo Road, Rochester, NY 14624 · (585) 594-8420
- **Google Business listing** should show the same
- **Old website** showed different info in some places — if the old site is still live when v2 launches, the discrepancy could hurt local SEO
- This is a Brad question if there's any doubt about the canonical business address.

### ☐ Team Photos (About Page)
The about page team section uses **colored letter circles** (B, H, B, J) instead of real headshots.
- **File:** `about.html` lines 345–396
- **Options:**
  1. **Schedule a photo day** — get individual headshots of Brad, Heather, Brantley, Jeff
  2. **Use the group photo** — `reference/assets/gallery8-300x225.jpg` (3 crew members in branded gear, 300×225, low-res)
  3. **Launch with letter circles** — they look intentional and clean; update later when photos exist
- **Recommendation for launch:** Option 3 is fine. This is cosmetic, not a blocker.

### ☐ Artificial Turf — Decide on Content
Artificial Turf appears in:
- Gallery page (1 photo: close-up of turf blades)
- Index service card (6th card)
- Footer service dropdown

But there's **no dedicated Artificial Turf section on services.html** and no real project photos exist. Options:
1. Add a brief section to services.html (Claude can do this)
2. Remove Artificial Turf from the service cards and gallery filter until real content/photos exist
3. Leave as-is — the card on index.html links to `services.html#artificial-turf` which would scroll to nothing

### ☐ Review Privacy Policy
The privacy page (`privacy.html`) was auto-generated to cover standard contact form data collection. Read through it to make sure:
- The company name and contact info are correct
- The data practices described match reality (no CRM, no marketing emails unless opted in, etc.)
- Nothing is promised that Westside can't deliver

---

## Brad — Sign-Off Needed

### ☐ Business Info Confirmation
Have Brad confirm or correct:
- **Address:** 2565 Buffalo Road, Rochester, NY 14624
- **Phone:** (585) 594-8420
- **Email for website inquiries:** info@westsideprolandscape.com
- **Office hours:** Mon–Fri 8:30 AM – 4:00 PM, Sat–Sun Closed
- **"Since 2000"** — is this the actual founding year?

### ☐ Top 100 Award
The about page says "Named to the Greater Rochester Chamber of Commerce Top 100 Fastest Growing Companies (2023)." Confirm:
- Is this the exact award name?
- Any restrictions on displaying it? (Chamber badge image is used in some collateral but not on the website)

### ☐ Domain / DNS Transition Timing
When the site is ready:
1. Brad (or you, with Brad's Hover credentials) updates DNS to point `westsideprolandscape.com` to Cloudflare Pages
2. The old Enter.Net-hosted site goes away
3. Email routing must be verified — if email goes through Enter.Net, changing DNS without planning could break email
4. **Ask Brad:** What's the timeline? Can you get Hover login, or does Brad need to make the DNS change?

---

## Technical — Claude Can Execute

These are things Claude can do in a future session once you give the go-ahead.

### ☐ Clean Up Obsolete Files
These files are outdated and shouldn't ship to production:
- `AUDIT-REPORT.md` — Lighthouse audit from demo phase; scores/content no longer match
- `WEBSITE-REFERENCE.md` — Architecture doc referencing $450 pricing, placeholder social links, and old phone number
- `screenshots/` — 41 development iteration PNGs from build process
- Add these to `.gitignore` or delete before deploy

### ☐ Remove Dead CSS
- `.map-placeholder` class in `contact.html` `<style>` block — the map now uses an iframe, the placeholder div is gone, but the CSS rules (~20 lines) are still defined
- `.img-placeholder` in `css/style.css` — class defined but no longer used by any HTML element

### ☐ Cloudflare Pages Setup
When DNS and content are confirmed:
1. Connect GitHub repo to Cloudflare Pages (or push a production branch)
2. Set build output to `/` (no build step — static files)
3. Add custom domain `westsideprolandscape.com` + `www.westsideprolandscape.com`
4. Enable "Always Use HTTPS"
5. Verify `_redirects` and `_headers` are being picked up
6. Test: old WordPress URLs (e.g., `/landscaping-services/`) should 301 to new pages

### ☐ Post-Launch Monitoring
After the domain switch:
- Run Lighthouse on the live URL
- Submit sitemap to Google Search Console
- Verify Google Business listing links to the new site
- Check that contact form emails are arriving
- Monitor for 404s in Cloudflare analytics (add any missing redirects)

---

## Known Limitations (Not Blockers)

These are acknowledged gaps that don't prevent launch but should be addressed over time:

| Item | Status | Impact |
|---|---|---|
| **Team headshots** | Letter circles used | Cosmetic — looks intentional |
| **Artificial turf photos** | Only a close-up crop exists | Weak gallery item but functional |
| **Plant health before/after** | No photos in library | Page works fine without them |
| **Privacy page hero image** | Empty hero-bg div | Renders as solid dark bar — looks fine |
| **Gallery depth** | 12 photos total, 1 artificial turf | Could use more variety over time |
| **Testimonials undated** | No dates on reviews | Standard practice; not an issue |
| **OG image** | No `og:image` photo hosted yet | Social previews will fall back to text-only |
