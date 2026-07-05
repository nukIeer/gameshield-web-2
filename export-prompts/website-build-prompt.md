> Build a production-ready **companion website** for an Android game‑discovery app
> called **"Best Games & Shield"**. This website is the app's official **download
> destination** (a "showcase & redirect" model): the Android app only softly links users
> here for "more info / download", and the actual APK downloads happen on THIS website
> with the user's own action. Design it to feel like **TapTap** — a premium, dark,
> game‑store aesthetic.
>
> ### Tech stack
> - **Vite + React + TypeScript** (SPA). **Tailwind CSS** for styling.
> - **React Router** for pages. **react-i18next** for bilingual **Turkish (default) + English**.
> - Deploy target: **Vercel** (domain `https://game-guard-three.vercel.app/`).
> - Use **Vercel Serverless Functions** (`/api/...`) for the APK download resolver.
> - Keep it fast on mobile: lazy‑load images, code‑split routes, cache the games feed.
>
> ### Data source (same feed the app uses — do NOT hardcode game data)
> Fetch this JSON at runtime and render from it; never parse raw JSON in components — map
> it into typed models first, null‑safe:
> `https://cdn.jsdelivr.net/gh/nukIeer/gameshieldcdn@master/games.json`
>
> Schema (nested):
> ```json
> {
>   "games": [{
>     "id": "freefire",
>     "title": "Free Fire",
>     "package": "com.dts.freefireth",
>     "details": { "downloads": "1B+", "rating": 4.4, "size": "700MB",
>                  "ageRating": "PEGI-12", "androidVersion": "8.0+", "version": "1.0.0" },
>     "description": "…", "whatsNew": "…",
>     "media": { "iconUrl": "https://…/icon.png", "bannerUrl": "https://…/banner.png",
>                "screenshots": ["https://…/1.png", "…"] },
>     "downloadLinks": { "playStoreUrl": "https://play.google.com/…",
>                        "galaxyStoreUrl": "https://galaxystore.samsung.com/…",
>                        "apk1": null, "apk2": null, "mirrors": ["https://…"] }
>   }]
> }
> ```
> Null‑safe fallbacks: missing title → "Unknown Game"; description → "No description
> available"; rating → 0.0; downloads → "Unknown"; missing icon → gradient placeholder;
> missing banner → gradient fallback; missing links → disable that button. `rating` may be
> a number or string — parse both. Handle loading / error (with Retry) / empty states.
>
> ### Design system (make it look like TapTap)
> Dark, metallic, high‑contrast, green‑accented. Exact tokens:
> - Background `#0C0E11`; surface `#17191E`; elevated surface `#20242B`;
>   border `#2A2E36` / strong `#3A3F49`.
> - Text: primary `#F4F6F8`, secondary `#9AA0AB`, faint `#676D78`, silver `#C7CCD4`.
> - **Accent (TapTap green)** `#2DD36F` (buttons, star, rank numbers, active states);
>   pressed/darker green `#23A85A`. Star/rating color = green (not gold).
> - Rounded cards (radius 14–20), soft shadows, no neon glow overload, generous spacing,
>   clean sans typography, two font weights (regular + bold). Sentence case, no ALL‑CAPS
>   except tiny section labels.
>
> What specifically makes it "TapTap‑like" (replicate this, don't clone TapTap 1:1):
> - **Ranked list rows** (not big boxes): `[rank number] [rounded icon] [title + a small
>   outlined badge like "Top #3" + a line with a single green ★ + numeric score + genre/size
>   tags] [bright green pill "Download" button on the right]`, separated by thin dividers.
>   Top‑3 rank numbers are green.
> - **Pill filter tabs** at the top (e.g. Top Sellers / Most Played / New Releases / Small
>   Size) — selected tab = **white pill with black text**, others = dark pill.
> - **Featured hero banner** for the first/featured game (banner image + gradient overlay +
>   title + short description + star rating + primary button).
> - **Search bar** (filters by title, package, description, client‑side).
> - Everything on the deep‑black background with green accents.
>
> ### Pages / routes
> 1. **Home** (`/`): header (site title "Game Market" + subtitle + language toggle),
>    search, featured hero, pill category tabs, and the ranked games list/grid. Lazy render.
> 2. **Game detail** (`/game/:slug` where slug = game `id`): large banner hero, icon, title,
>    package, star rating, meta tiles (downloads, size, version, Android version, age
>    rating), description, "What's New", **screenshots carousel**, and the download section
>    (below).
> 3. **Legal pages**: `/privacy`, `/terms`, `/kvkk`, `/dmca` — bilingual, see texts below.
> 4. **About / Contact** (`/about`): what the site is, disclaimer, DMCA contact email.
> 5. Global **footer**: links to all legal pages, DMCA email, and a trademark disclaimer
>    ("Not affiliated with or endorsed by the game publishers; all trademarks belong to
>    their respective owners.").
>
> ### Download model (IMPORTANT — this is the download hub)
> On each game detail page show up to three buttons, in this priority/labeling:
> 1. **Direct download** (primary green pill): resolves the **latest APK** for the game via
>    a serverless endpoint using the game's slug/package. Implement
>    `GET /api/download/:slug` as a Vercel function that looks up the newest APK link for
>    that slug and **302‑redirects** to it. Source of truth for "latest APK" (pick one and
>    make it configurable):
>    - (a) a small manifest JSON mapping `slug → latest apk url`, OR
>    - (b) list the files under the CDN repo folder for that slug and choose the newest.
>    Also accept the JSON's `downloadLinks.apk1 → apk2 → mirrors[0]` as fallback if the
>    resolver has nothing. Optionally support a pretty short link (`/freefire` →
>    `/api/download/freefire`) via a rewrite.
> 2. **Google Play** (secondary): `downloadLinks.playStoreUrl` (hide if null).
> 3. **Galaxy Store** (secondary): `downloadLinks.galaxyStoreUrl` (hide if null).
> If none exist → disabled "Unavailable" state. Downloads must be **user‑initiated**
> (a click), shown as normal store/download choices — this site is the place where users
> who want the APK can get it.
>
> ### Internationalization
> - **TR default, EN toggle** in the header, persisted (localStorage). Translate ALL UI
>   strings and ALL legal pages. Keep a clean `locales/tr.json` and `locales/en.json`.
>
> ### SEO & performance
> - Per‑game meta tags + Open Graph (use the game banner as OG image), a `sitemap.xml`,
>   descriptive titles. If feasible, prerender/SSG the game pages (e.g. `vite-plugin-ssr`
>   or Vercel build‑time prerender); otherwise ensure good client SEO + a static fallback.
> - Responsive (mobile‑first), accessible (alt text, focus states, aria labels), fast
>   image loading (lazy + width/height), route‑level code splitting.
>
> ### Legal pages — bilingual DRAFT text (fill the [PLACEHOLDERS])
> Provide these as real, editable content (both TR and EN). Placeholders to fill:
> `[COMPANY_NAME]`, `[CONTACT_EMAIL]`, `[DMCA_EMAIL]`, `[DOMAIN]`, `[EFFECTIVE_DATE]`.
>
> **Privacy Policy / Gizlilik Politikası** — State that the site does not collect personal
> data beyond standard server logs; no accounts; analytics (if any) is anonymous; no data
> sold; contact `[CONTACT_EMAIL]`. TR + EN.
>
> **Terms of Service / Kullanım Şartları** — The site is a discovery/showcase directory
> linking to third‑party stores and download mirrors; content provided "as is"; users are
> responsible for what they install; no warranty; trademarks belong to their owners. TR + EN.
>
> **KVKK Aydınlatma Metni** — 6698 sayılı KVKK kapsamında: veri sorumlusu `[COMPANY_NAME]`,
> toplanan sınırlı veriler (log kayıtları), işleme amacı (hizmetin sunulması ve güvenliği),
> saklama süresi, ilgili kişinin hakları (madde 11) ve başvuru adresi `[CONTACT_EMAIL]`.
> (Provide full TR text; EN summary translation.)
>
> **DMCA / Telif Bildirimi** — How rights holders can request removal: send notice to
> `[DMCA_EMAIL]` with identification of the work, the infringing URL, contact info, a
> good‑faith statement, and a signature; the site removes infringing links promptly. TR + EN.
>
> ### Acceptance checklist (the finished site must pass)
> - [ ] Loads the games feed from the jsDelivr URL and renders all games (no hardcoded data).
> - [ ] Icons, banners, and screenshots display; graceful gradient fallback when missing.
> - [ ] Ranked TapTap‑style list, pill tabs, featured hero, green pill buttons, dark theme.
> - [ ] Search + category filtering work client‑side.
> - [ ] Game detail page shows all fields + screenshots carousel.
> - [ ] Download button hits `/api/download/:slug` and redirects to the latest APK; Play
>       Store / Galaxy buttons work; graceful "Unavailable" when no links.
> - [ ] TR/EN toggle switches every string and all legal pages; TR is default.
> - [ ] `/privacy`, `/terms`, `/kvkk`, `/dmca` exist with the draft texts and footer links.
> - [ ] Responsive on mobile, decent Lighthouse SEO/perf, OG tags per game.
