# Neighbors Barbershop — Website Redesign

Static redesign of the Neighbors Barbershop site (105 N. Main Street, Spring City, PA). Plain HTML, CSS, and vanilla JavaScript. No framework, no build step. Deploys as-is to GitHub Pages.

Live preview: https://sysopx786.github.io/neighbors-barbershop-website-redesign/

## Design

| Area | Decision |
|---|---|
| Aesthetic | Monochrome editorial: oversized condensed type, hairline rules, numbered section labels, 7/5 photo–text splits, one outlined background word per page |
| Color | Black, white, gray only. **Approved exceptions:** Google "G" logo, Google rating stars (#FBBC05), and the Google Map (full color, loads on tap) |
| Themes | Dark (default) and light. Toggle in the header on every page, saved in `localStorage` key `nb-theme`, applied before first paint |
| Type | Barlow Condensed 600/700 (headings, buttons, prices) + Inter 400/500/600 (body). Tabular numbers for prices and hours |
| Spacing | Sections 64px mobile / 128px desktop |
| Photos | 24 photos, grayscale WebP + JPG at 800px and up to 1600px. No crops or retouching |
| Hero | Phone: shop interior (portrait). Desktop: Justin beard trim (landscape) |
| Motion | One fade-and-rise on scroll; header shrinks after 40px. All off under reduced motion |

## Calls to action

- **Book** (primary): header, hero, every service row, mobile menu, mobile bottom bar, 2040 page → Square Appointments (new tab)
- **Call**: hero, mobile menu, bottom bar, Visit → `tel:+12675667871`
- **Directions**: bottom bar, Visit → Google Maps

## Files

```
index.html  services.html  gallery.html  reviews.html  faq.html  contact.html
free-haircuts.html  future.html  privacy.html  terms.html  refund.html  cookies.html
css/styles.css   js/main.js   images/   sitemap.xml   robots.txt   .nojekyll
```

Header, footer, mobile menu, and bottom bar markup are identical on every page. Edit all 12 pages when changing them.

## Content rules

- All copy comes word for word from `Neighbors-Barbershop-FULL-PROJECT.md`. FAQ uses the short version (400 questions) with stray `---` removed.
- Deliberate changes from the source:
  - `cookies.html`: removed "no consent banner is required" sentence; added one line about the two `localStorage` settings.
  - `gallery.html`: removed "Real photos from the shop and Instagram." The gallery now includes AI-generated images, so the sentence is no longer true.
  - `reviews.html`: the "Leave a review" link had an empty Google Place ID (broken). It now points to the Google listing search. Link text unchanged.
- AI-generated images are labeled "AI-generated image" in their alt text: `team-bench`, `justin-scissor-cut`, `justin-full-shop`, `future-2040`.

## People in photos

Justin Kyle (owner), Rocco (apprentice), CJ Bono (barber), Rupert (barber) — names confirmed by Mujtaba, 2026-10-16. One barber in the background of the Rocco selfies is unnamed. Parent permission confirmed for photos of teens.

## Open items (owner to confirm)

- [ ] Mayor Adam Alberico's campaign graphic is visible on two photos (`rocco-mayor-selfie`, `grand-opening`). Kept by decision.
- [ ] Free back-to-school haircuts banner says "Starting Tuesday, August 18." Confirm the offer is still running.
- [ ] Open/closed status uses fixed hours (Tue–Sat 9–6, America/New_York). It does not know holidays or one-off closures.
- [ ] Owner name: source and press say "Justin Kyle"; his Facebook profile shows "Justin Barberro". Site uses Justin Kyle.
- [ ] Set the Square booking page brand color to black (Square dashboard).
- [ ] Canonical URLs point to `www.theneighborsbarber.com`. Open Graph images point to this GitHub Pages URL so link previews work during the pitch. Switch `og:image` to the real domain at launch.
- [ ] Google "G" mark uses the four-color logo from Google's Sign-In branding. Check it against Google's current brand guidelines before launch.
- [ ] Submit `sitemap.xml` in Google Search Console after launch on the real domain.

## Release report — 2026-10-16

| Check | Status | Notes |
|---|---|---|
| Source code updated | Passed | 12 pages, CSS, JS, 96 image files |
| Automated tests | Passed | 58/59 functional checks; the one miss was a test timing issue, and the next step confirmed the navigation worked |
| Copy matches source | Passed | Every source text segment found, except the deliberate changes listed above |
| Color scan | Passed | 48 full-page screenshots (12 pages × 2 themes × 2 sizes). Color only on Home and Reviews: Google logo and rating stars |
| Contrast | Passed | Lighthouse accessibility 100 on tested pages |
| Lighthouse mobile (local) | Perf 96–97, A11y 100, BP 96, SEO 100 | BP deduction is Google Fonts blocked in the test sandbox. Rerun PageSpeed Insights on the live URL |
| Desktop browser reviewed | Passed | Headless Chromium 1440×900 |
| Mobile browser reviewed | Passed | Headless Chromium 390×844, touch emulation |
| Works with JavaScript off | Passed | Content visible, dead controls hidden, map link opens Google Maps |
| Live public website verified | Not verified | Check after GitHub Pages finishes deploying |
| Physical Android device | Not tested | |
| SEO and indexing | Not verified | Canonicals, sitemap, robots present. Not submitted to Search Console |
