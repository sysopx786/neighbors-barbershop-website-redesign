# Neighbors Barbershop — Website Redesign

Static redesign of the Neighbors Barbershop site (105 N. Main Street, Spring City, PA). Plain HTML, CSS, and vanilla JavaScript. No framework, no build step. Deploys as-is to GitHub Pages.

Live preview: https://sysopx786.github.io/neighbors-barbershop-website-redesign/

## Design

| Area | Decision |
|---|---|
| Aesthetic | Monochrome editorial: oversized condensed type, hairline rules, numbered section labels, 7/5 photo–text splits, one outlined background word per page |
| Color | Black, white, gray only. **Approved exceptions:** Google "G" logo, Google rating stars (#FBBC05), and the Google Map (full color, loads on tap) |
| Themes | Dark (default) and light. Toggle in the header on every page, saved in `localStorage` key `nb-theme`, applied before first paint |
| Languages | English, Spanish (`/es/`), Portuguese (`/pt/`). Switcher in the header and mobile menu keeps the same page. `hreflang` on every page and in the sitemap |
| Type | Barlow Condensed 600/700 (headings, buttons, prices) + Inter 400/500/600 (body). Tabular numbers for prices and hours |
| Spacing | Sections 64px mobile / 128px desktop |
| Photos | 35 photos + 1 video, all grayscale (WebP + JPG at 800px and up to 1600px; MP4 re-encoded grayscale). No crops or retouching |
| Hero | Phone: shop interior (portrait). Desktop: Justin beard trim (landscape) |
| Motion | One fade-and-rise on scroll; header shrinks after 40px. All off under reduced motion |
| Navigation | Desktop (≥1280px): The shop, Services, Gallery, Reviews, Tips, FAQ, More (Media, Press, 2040, Free Cuts), Visit. Below 1280px: numbered full-screen menu with all 11 |

## Calls to action

- **Book** (primary): header, hero, every service row and service page, mobile menu, mobile bottom bar, Book page (embedded Square), 2040 page → Square Appointments
- **Call**: hero, service pages, mobile menu, bottom bar, Visit → `tel:+12675667871`
- **Directions**: bottom bar, Visit → Google Maps

## Pages (27 per language, 81 total)

| Page | File |
|---|---|
| Home | `index.html` |
| The shop (story, what sets it apart, barber bios, mayor quote, grand opening, press teaser) | `about.html` |
| Services menu + 10 service pages (description, 40 FAQs each, "Also on the board"; before/after slider on Traditional) | `services.html`, `services/*.html` |
| Gallery (33 photos, lightbox) | `gallery.html` |
| Reviews (all Google reviews with reviewer details, services, owner response) | `reviews.html` |
| Media (mayor video, Rocco's first beard trim, school haircuts) | `media.html` |
| Press (full Spring-Ford Press article) | `press.html` |
| Tips ("Between visits") | `tips.html` |
| Book (embedded Square booking) | `book.html` |
| FAQ (400 questions, search, topic chips) | `faq.html` |
| Visit | `contact.html` |
| Free Cuts | `free-haircuts.html` |
| 2040 | `future.html` |
| Legal | `privacy.html`, `terms.html`, `refund.html`, `cookies.html` |

Spanish and Portuguese copies live under `es/` and `pt/` with the same file names. Header, footer, mobile menu, and bottom bar markup are identical on every page; change them in all 81 pages together.

```
css/styles.css   js/main.js   images/   videos/   sitemap.xml   robots.txt   .nojekyll
```

## Content sources and rules

- Redesign copy: `Neighbors-Barbershop-FULL-PROJECT.md`, word for word. FAQ uses the short version (400 questions) with stray `---` removed.
- Added from the previous live site (sysopx786.github.io/neighbors-barbershop): About, service pages, Media, Press, Tips, Book, grand opening, full review list, home roster and community story, and their Spanish/Portuguese translations.
- Owner decisions (2026-10-16):
  - **Monday is closed.** CJ's "Monday by appointment" lines were removed from his bio and the Book page.
  - **Service descriptions** use the redesign wording ("A clean, tailored, balanced haircut…"), not the old site's.
  - **Tim / Tim Graham removed.** Sentences naming him were cut from reviews and the press article, each cut marked "…". Reviews that were only about him (5) were dropped, leaving 108 of 113. Reviewers who are themselves named Tim (Tim Fritz, Tim Stiles) stay. Tim's 3 photos from the old site (barber in the Nike shirt) were removed; he no longer works there.
  - **Full press article** published, with a link to the original.
  - **Old-site photos and video** added under their original names, without AI labels. The before/after slider keeps its caption that the images are an AI example, not a customer result.
- Other deliberate changes:
  - `cookies.html`: removed "no consent banner is required"; added one line about the two `localStorage` settings.
  - `gallery.html`: removed "Real photos from the shop and Instagram" (the gallery includes AI images).
  - `reviews.html`: broken "Leave a review" link (empty Google Place ID) now points to the Google listing search.
- Translations:
  - Spanish/Portuguese for pages that existed on the old site come from the old site's translations.
  - Everything else (redesign copy, Free Cuts, Visit, Terms, Refund, Cookies, alt text, UI) was translated for this build. **Needs a native-speaker check**, legal pages above all. Translated legal pages say the English version governs.

## Second comparison pass (2026-10-16)

Every text block of all 23 old pages, in EN/ES/PT, re-checked against the new site. Added: Media line "Call the shop or stop by…", footer tagline and "Spring City · Est. 2026", live open/closed status in every footer, "Walk in if a chair is open, or lock a time on Square" on Home, storefront caption "The bench is for everyone", Services group headings (Cuts / Beard & shave / Detail work) and "Prices are the ones posted in the shop", old Tips link labels and "Also on the board" lists on service pages, Back to top on Reviews and FAQ, Privacy/Cookies updated for the embedded Square page, the Google map, review quotes, and the self-hosted video. ES/PT 2040 headings now use the old site's translations.

Follow-up (owner): Home now lists all 10 services (redesign descriptions). The 2040 hero uses the old site's picture (`future-2040-alt`), with no caption.

Left out on purpose: old service descriptions, Monday by appointment, Tim, frozen review dates ("4 months ago"), the 2040 "not a photo" caption, and old headings the redesign replaced.

## Third comparison pass (2026-10-16)

Non-text checks against the old site: business schema now uses an image that exists (`storefront-day`), price range $5–$75, and the shop email. Directions open the Google listing (as on the old site), "See on Google" / "Read all on Google" open the Google reviews panel, map zoom matches the old site, About/Media/Tips/Book use the old site's search descriptions (EN/ES/PT), and a black-and-white home-screen icon + web manifest were added (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`).

## Fourth pass (2026-10-16)

Spanish/Portuguese text re-checked against the old site: complete (remaining differences are owner decisions or formatting only). Visual pass of 18 pages on phone and desktop, dark and light: fixed photos not filling their frame when the photo shape differs from the frame (Justin's bio photo), and the phone bottom bar wrapping "Cómo llegar" / "Como chegar".

## People in photos

Justin Kyle (owner), Rocco (apprentice), CJ Bono (barber, @bonosthebarber), Rupert (barber). Names confirmed by Mujtaba, 2026-10-16. One barber in the background of the Rocco selfies is unnamed. Parent permission confirmed for photos of teens.

## Open items (owner to confirm)

- [ ] Native-speaker review of Spanish and Portuguese, legal pages first.
- [ ] Press article: confirm permission from Spring-Ford Press / John McGuire to republish the full text.
- [ ] Mayor Adam Alberico's campaign graphic is visible on two photos (`rocco-mayor-selfie`, `grand-opening`). Kept by decision.
- [ ] Free back-to-school haircuts copy says "Starting Tuesday, August 18." Confirm the offer is still running.
- [ ] Open/closed status uses fixed hours (Tue–Sat 9–6, America/New_York). It does not know holidays or one-off closures.
- [ ] Owner name: source and press say "Justin Kyle"; his Facebook profile shows "Justin Barberro". Site uses Justin Kyle.
- [ ] Set the Square booking page brand color to black (Square dashboard). The embedded Square page shows Square's colors.
- [ ] Canonical URLs point to `www.theneighborsbarber.com`. Open Graph images point to this GitHub Pages URL so link previews work during the pitch. Switch `og:image` to the real domain at launch.
- [ ] Google "G" mark uses the four-color logo from Google's Sign-In branding. Check it against Google's current brand guidelines before launch.
- [ ] Submit `sitemap.xml` in Google Search Console after launch on the real domain.

## Release report — 2026-10-16 (release 2: old-site content + ES/PT)

| Check | Status | Notes |
|---|---|---|
| Source code updated | Passed | 81 pages, CSS, JS, 141 image files (35 photos × 4 + video poster), 1 video |
| Link crawl | Passed | 7,446 internal links, images, and anchors across 81 pages; 0 broken |
| Automated tests | Passed | 85 functional checks: theme, menu, More menu, language switch, FAQ search, review filter, lightbox, swipe, slider, map, video, Square embed, cookie notice, ES/PT script text, no-JS, no horizontal overflow on 23 pages |
| Owner decisions applied | Passed | No barber "Tim" anywhere; no "Monday by appointment"; redesign service wording on all pages |
| Color scan | Passed | 92 full-page screenshots (23 pages × 2 themes × 2 sizes). Color only on Home and Reviews: Google logo and rating stars |
| Header fit | Passed | No wrapping or overflow at 390, 640, 1100, 1280, 1366, 1440px in EN/ES/PT |
| Lighthouse mobile (local, 7 pages) | Perf 94–100, A11y 100, BP 96, SEO 100 | BP deduction is Google Fonts blocked in the test sandbox. Rerun PageSpeed Insights on the live URL |
| Desktop browser reviewed | Passed | Headless Chromium |
| Mobile browser reviewed | Passed | Headless Chromium 390×844, touch emulation |
| Live public website verified | Passed | Spot-checked About (ES/PT), Press, Reviews, Gallery, Media, Services (ES), and the Home service list on the GitHub Pages URL after deploy |
| Physical Android device | Not tested | |
| Native-speaker translation review | Not done | |
| SEO and indexing | Not verified | Canonicals, hreflang, sitemap (81 URLs), robots present. Not submitted to Search Console |
