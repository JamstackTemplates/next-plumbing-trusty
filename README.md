# True North Plumbing — Trusty plumber (`next-plumbing-trusty`)

A static Next.js website for **True North Plumbing** (a fictitious residential plumbing company in Duluth, Minnesota, built as a sample for the Jamstacks gallery).

Every name, phone number, address, price and policy in the sample content is made up. Replace those values with your own details before publishing.

## Preview locally

Requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with 24/7 emergency line and upfront call-out fees, 8 featured valve-tag services, overlapping call-out job ticket & pressure dial, 4-step call flow, core service-area map teaser, office & dispatch strip, and `Plumber` JSON-LD |
| `/services/` | Full service catalogue grouped by category with client-side binder-tab filter (`?category=`), Water Heater Corner (tank cutaway & spec plate), and closing call band |
| `/pricing/` | Interactive True North call-out meter (preselected to the current time in the business time zone), call-out coverage checklist, printed "from" rate card, price promise, and `<details>` FAQ |
| `/areas/` | Drawn map of the western tip of Lake Superior with core & extended zone rings, town pins, highway signs with `+$35` mileage plates, and out-of-area enquiry note |
| `/contact/` | 24/7 emergency call strip, hosted Jamstacks support form (or email fallback when unconfigured) inside a job ticket frame, message suggestions, copyable email, and office hours |
| `/404.html` | Static error page with capped-pipe illustration, links to Home and Services, and the 24/7 phone number |

## Make it yours

Edit page-specific headings, prose, FAQ answers and labels directly inside each route's `app/**/page.tsx` file (and `app/not-found.tsx`). Shared business data and structured collections live in `content/`:

| File | Owns | Most frequent edits |
| --- | --- | --- |
| `content/pricing.ts` | Upfront `callOutFees` (`standard`, `after-hours`) and `callOutCovers` checklist | Change `fee` (whole USD) — updates Home fee line, Home ticket, Pricing dial & ticket, and JSON-LD `priceRange` automatically |
| `content/services.ts` | `categories` and `services` | Update `priceFrom`, toggle `available: false` (displays `Ask us` instead of the price), `emergency`, or `featured` (8 items shown on Home) |
| `content/business.ts` | Name, tagline, `phone`/`phoneE164`, `email`, shop `address`, `officeHours`, and Contact enquiry tips | Replace contact info and `officeHours` (7 same-day entries driving `OpenBadge` and the Pricing "calling now" rate) |
| `content/areas.ts` | `areas` (`core` vs `extended` zone, travel `surcharge`, 0–100 `x`/`y` map pins) | Add/edit towns or travel surcharges |
| `site.config.json` | Public `name`, `description`, `domain`, `timeZone` (`America/Chicago`) and Jamstacks config | Set your own `domain`, `timeZone` and `jamstacks.siteId` |
| `app/tailwind.input.css` | Light & dark ("van cab at night") tokens, `--jamstacks-*` styling, textures and print rules | Adjust palette tokens |
| `lib/structured-data.ts` | `Plumber` JSON-LD schema derived from `content/` | Extends schema properties if needed |
| `lib/routes.ts` | Public route list for `app/sitemap.ts` | Add routes here when adding pages |

## Self-hosted fonts

All fonts are bundled locally from npm packages (SIL Open Font License 1.1, no external font requests):

- Display: `@fontsource/barlow-condensed` (weights 600, 700, 800)
- Body: `@fontsource/atkinson-hyperlegible` (weights 400, 700)
- Figures & codes: `@fontsource/overpass-mono` (weights 400, 600, 700)

## Public configuration

```json
{
  "name": "True North Plumbing",
  "description": "24/7 emergency plumber in Duluth and the Twin Ports. Leaks, frozen pipes, drains and water heaters, with the call-out fee quoted before we roll.",
  "domain": "next-plumbing-trusty.jamstacks.net",
  "timeZone": "America/Chicago",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Never add tokens, SMTP credentials or publishing keys to configuration.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only on `/contact/` when `siteId` is configured. Without a site ID there is no embed host/request, and the email fallback renders inside the job ticket. `dispatch@truenorthplumbing.example` remains visible in either case. Navigation to and from `/contact/` uses full-document loads via `SiteLink`. Enquiries never imply a confirmed booking, time slot or final price before on-site diagnosis.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`npm run check` runs all Node tests (`tests/*.test.mjs` and `tests/*.test.ts`), Next.js route typegen + TypeScript typecheck, and the static export (`out/`).

## GitHub Pages deployment

`.github/workflows/pages.yml` runs `npm ci`, `npm test`, `npm run typecheck`, and static export, preserving Jamstacks' `provisioning_id` dispatch input and correlated run name. Configure Pages to use GitHub Actions and set its custom domain to match `site.config.json`.

## Gallery assets

`jamstacks/` holds optional Jamstacks gallery metadata and homepage screenshots (`jamstacks/config.json`, `jamstacks/home-light.jpg`, `jamstacks/home-dark.jpg`, `jamstacks/screenshots.json`). Normal builds, tests, and customer deployments never import or read it, and you can delete `jamstacks/` (and `plan/` once reviewed) without affecting the website.
