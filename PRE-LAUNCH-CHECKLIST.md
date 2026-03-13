# Pre-Launch Checklist — Westside Website v2

Everything below must be resolved before redirecting `westsideprolandscape.com` to Cloudflare Pages. Items are grouped by who needs to act.

**Staging URL:** https://westside-website.pages.dev

---

## Infrastructure — Completed ✅

### ✅ Cloudflare Pages Deployment
Site deployed to Cloudflare Pages (March 13). Auto-deploys via `wrangler pages deploy`.
- Preview: https://westside-website.pages.dev
- `_headers` and `_redirects` confirmed working
- 31 redirect rules catching old WordPress URLs

### ✅ Web3Forms Contact Form
Access key `09190d0a-...` wired into `contact.html`. Submissions go to `callmeaderp@gmail.com`.
- **Action needed:** Change recipient to Westside's preferred email when decided

### ✅ Google Analytics 4
Property `G-HQYE7MKZ9P` installed on all 16 pages (callmeaderp@gmail.com account).
- **Action needed:** Add Westside Gmail as admin when access is available

### ✅ Code Cleanup
- Deleted `AUDIT-REPORT.md`, `WEBSITE-REFERENCE.md`
- Removed dead CSS (`.map-placeholder`, `.img-placeholder`)
- Fixed Google Maps embed (address-based query, no fake place ID)
- Updated privacy policy to reflect GA4 cookie usage

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
- Any restrictions on displaying it?

### ☐ Hover Credentials / DNS Switch
When everything is ready:
1. Brad provides Hover login credentials (or changes nameservers himself)
2. Change nameservers from Apollo (`ns1.apollohosting.com`) to Cloudflare's assigned pair
3. Email routing must be verified — MX records will be replicated in Cloudflare before the switch
4. Rollback plan: revert nameservers at Hover if anything breaks

### ☐ Form Submission Recipient
Where should contact form submissions go?
- Currently: `callmeaderp@gmail.com` (Joshua's email)
- Options: office email, info@ address, multiple recipients (CC supported)

### ☐ Account Access for Joshua
Brad needs to add Joshua to:
- **Google Ads** — Standard user access (for conversion tracking setup)
- **Google Business Profile** — Manager access (for verification + website URL update)
- **Meta/Facebook** — Task Access or Advertiser (already have access from March 11, but formalize)

---

## Joshua — Before DNS Switch

### ☐ Add Domain Zone to Cloudflare
Add `westsideprolandscape.com` as a site in Cloudflare dashboard (free plan). This pre-stages DNS records without affecting the live site. Verify all records match, especially:
- MX → `mx.westsideprolandscape.com` (priority 30)
- A for mx → `66.96.140.70`, `66.96.140.71`
- A for mail → `66.96.146.129`
- TXT (SPF) → `v=spf1 ip4:66.96.128.0/18 include:websitewelcome.com ?all`

### ☐ Google Ads Conversion Tracking
Once added as user on Google Ads account:
1. Create a conversion action for form submissions
2. Add the Google Ads tag (`AW-XXXXXXX`) to all pages
3. Fire conversion event on form submission success
4. This enables measuring ROI when ad campaigns go active

### ☐ Google Business Profile
Once Brad grants Manager access:
1. Complete GBP verification (was never done by Enter.Net)
2. Update website URL to `westsideprolandscape.com` (after DNS switch)
3. Verify NAP matches website exactly

### ☐ Google Search Console
After DNS switch:
1. Verify domain ownership (DNS TXT record method)
2. Submit sitemap (`sitemap.xml` already exists)
3. Monitor indexing status and search performance

### ☐ Test Contact Form
Submit a test on the staging URL and verify email delivery.

---

## Post-Launch Monitoring

After the domain switch:
- Run Lighthouse on the live URL
- Verify Google Business listing links to the new site
- Check that contact form emails are arriving
- Monitor Cloudflare analytics for 404s (add missing redirects)
- Confirm email delivery to @westsideprolandscape.com addresses
- Submit sitemap to Google Search Console

---

## Known Limitations (Not Blockers)

| Item | Status | Impact |
|---|---|---|
| **Team headshots** | Letter circles used | Cosmetic — looks intentional |
| **Artificial turf photos** | Only a close-up crop exists | Weak gallery item but functional |
| **Plant health before/after** | No photos in library | Page works fine without them |
| **Privacy page hero image** | Empty hero-bg div | Renders as solid dark bar — looks fine |
| **Gallery depth** | 12 photos total, 1 artificial turf | Could use more variety over time |
| **Testimonials undated** | No dates on reviews | Standard practice; not an issue |
| **OG image** | No `og:image` photo hosted yet | Social previews will fall back to text-only |
| **Meta Pixel** | Not installed | Only needed when running Meta ads — can add anytime |
| **Placeholder stats** | 1,500+ projects, 50+ reviews, etc. | Need real numbers from Brad |
| **Timeline milestones** | 2 of 5 are placeholders | Need real dates from Brad |
