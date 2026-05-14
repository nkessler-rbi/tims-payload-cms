# CMS Pages Authoring Guide — Marketing Pages (Tim Hortons replica)

This guide documents the 8 new marketing pages that mirror screens on https://www.timhortons.ca. Each section is structured as a self-contained ticket so it can be pasted directly into Jira without edits.

> **Note on placeholder copy:** The seed scripts populate each page with plausible Tim Hortons–style placeholder text in EN and FR. The live `timhortons.ca` site is a client-rendered SPA, so the real text could not be auto-scraped. **Every page section below includes a reference URL — open it side-by-side with the CMS admin and copy the actual copy / images / CTAs into place.**

---

## How to use this doc

1. **Run the seed once.** `npm run payload -- migrate` (if needed) then trigger the seed via the `/api/seed` endpoint or `pnpm seed`. This creates every page below in both EN and FR with the correct block structure and placeholder copy. It also creates the three lead-capture forms and the navbar dropdowns.
2. **Open the admin** at `/admin` → **Static Pages**. Pick a page (EN locale by default; switch to FR using the locale dropdown at the top).
3. **Refine each block in order.** Use the matching section in this doc plus the live timhortons.ca URL as the source of truth.
4. **Swap in real images.** Seed re-uses three placeholder images; replace with real marketing photography via the Media collection.
5. **Publish.** Each page is created as `Published` already; save your edits to revalidate.
6. **Navbar.** Open Globals → Header. Each top-level nav item supports an optional direct link and an optional `children` array (which turns it into a dropdown). Edit freely — no code change required.

---

## Shared block inventory (use anywhere)

| Block | When to use |
|---|---|
| Hero Banner | Top-of-page hero with full-width image, title, subtitle, up to 2 CTAs. |
| Page Header | Lightweight header for info pages without imagery (legal, FAQs). |
| Anchor Links | Sticky in-page nav. References any block's `anchorId`. |
| Text With Image | Two-column section with rich text on one side and an image on the other. |
| Double Image | Two cards side-by-side, each with image + heading + body + optional CTA. |
| Card Grid | 2/3/4-column grid of cards (image + heading + body + optional link). |
| Steps | Numbered "how it works" list (2–6 steps). |
| Rich Text | Free-form body copy with headings, lists, formatting. |
| Image | Single image with optional caption. |
| Call to Action | Red panel with rich text + 1–2 buttons. |
| Accordion | Collapsible Q&A list. Use for FAQs. |
| Form | Renders a form from the Forms collection (lead capture, deletion request). |

---

## Page 1 — Catering

- **Reference URL:** https://www.timhortons.ca/catering
- **EN slug:** `catering` → `/en/catering`
- **FR slug:** `services-de-traiteur` → `/fr/services-de-traiteur`
- **Nav location:** Header → `Order` dropdown
- **Form referenced:** *Catering Inquiry Form* (auto-created by seed)
- **Status after seed:** Published

### Block-by-block

| # | Block | Field | What to put |
|---|---|---|---|
| 1 | Hero Banner | backgroundImage | Wide hero shot of a catering spread (1920×1080) |
|   |  | eyebrow | "Catering" / "Services de traiteur" |
|   |  | title | Main hero headline from live page |
|   |  | subtitle | Hero subtitle from live page |
|   |  | links | Up to 2 CTAs — "Start an order" + "Browse menu" |
| 2 | Anchor Links | items | Menu / How to order / Inquiry / FAQs |
| 3 | Card Grid | heading + description | Section intro |
|   |  | items (3) | Box Lunches, Sweet Trays & Timbits, Coffee Travellers — each with image, heading, body, link |
| 4 | Steps | eyebrow + heading | "How it works" intro |
|   |  | items (3) | Choose menu → Tell us when/where → We confirm and deliver |
| 5 | Form | form (relationship) | Select **Catering Inquiry Form** |
|   |  | enableIntro + introContent | Short intro above the form |
| 6 | Accordion | heading + items | FAQs from live page (4 questions seeded) |
| 7 | Call to Action | richText + links | Closing CTA driving back to the form |

### Images needed

| Slot | Suggested filename | Dimensions | Alt text (EN / FR) |
|---|---|---|---|
| Hero background | `catering-hero.jpg` | 1920×1080 | "Tim Hortons catering spread of sandwiches and coffee" / "Sandwichs et café Tim Hortons pour traiteur" |
| Card A (boxes) | `catering-box-lunch.jpg` | 800×600 | "Box lunch with sandwich and cookie" / "Boîte repas avec sandwich et biscuit" |
| Card B (sweets) | `catering-sweet-tray.jpg` | 800×600 | "Donut and Timbit platter" / "Plateau de beignes et de Timbits" |
| Card C (coffee) | `catering-traveller.jpg` | 800×600 | "Coffee traveller box" / "Boîte de café à emporter" |

### QA checklist

- [ ] `/en/catering` and `/fr/services-de-traiteur` both load with no console errors
- [ ] Hero CTAs scroll to `#order` and `#menu`
- [ ] Anchor links pills scroll smoothly to each section
- [ ] Catering Inquiry Form submits successfully (check `/admin/collections/form-submissions`)
- [ ] All accordion items expand
- [ ] Nav drop-down: hover **Order** → click **Catering** lands here

---

## Page 2 — Tims Rewards

- **Reference URL:** https://www.timhortons.ca/timsrewards
- **EN slug:** `tims-rewards` → `/en/tims-rewards`
- **FR slug:** `recompenses-tims` → `/fr/recompenses-tims`
- **Nav location:** Header → `Rewards & Cards` dropdown
- **Status after seed:** Published

### Block-by-block

| # | Block | Field | What to put |
|---|---|---|---|
| 1 | Hero Banner | backgroundImage | App/coffee lifestyle hero (1920×1080) |
|   |  | title | "Earn rewards on every order" |
|   |  | links | "Join Tims Rewards" + "How it works" |
| 2 | Steps | items (3) | Sign up → Scan or order → Redeem rewards |
| 3 | Card Grid | items (3) | Free favourites, Birthday treat, Bonus point offers |
| 4 | Text With Image | richText | "Faster ordering in the Tims app" copy |
|   |  | media | App screenshot |
|   |  | enableCta + link | "Download the app" CTA |
| 5 | Accordion | items (4) | Tims Rewards FAQs |
| 6 | Call to Action | richText + links | Closing CTA driving to app download |

### Images needed

| Slot | Suggested filename | Dimensions | Alt text |
|---|---|---|---|
| Hero | `rewards-hero.jpg` | 1920×1080 | Person scanning Tim Hortons app at counter |
| Card A | `rewards-coffee.jpg` | 800×600 | Hot coffee with rewards icon |
| Card B | `rewards-birthday.jpg` | 800×600 | Birthday donut |
| Card C | `rewards-bonus.jpg` | 800×600 | App showing bonus offer |
| App screenshot | `rewards-app.png` | 600×900 | Tim Hortons mobile app rewards screen |

### QA checklist

- [ ] Both locales load
- [ ] All 4 FAQ items expand
- [ ] "Join" CTA scrolls to `#join` section
- [ ] Step numbers render 1, 2, 3

---

## Page 3 — Tims Gift Card

- **Reference URL:** https://www.timhortons.ca/tims-gift-card
- **EN slug:** `tims-gift-card` → `/en/tims-gift-card`
- **FR slug:** `carte-cadeau-tims` → `/fr/carte-cadeau-tims`
- **Nav location:** Header → `Rewards & Cards` dropdown
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Hero Banner | Hero image of a TimCard; title "Give the gift of Tims"; CTAs "Buy a card" + "Check balance" |
| 2 | Card Grid | 3 cards: Digital eGift Card, Physical TimCard, Bulk orders for business |
| 3 | Steps | 3 steps: Pick design and amount → Add personal message → Pay and send |
| 4 | Text With Image | "Check your TimCard balance" section with balance-check screenshot and CTA |
| 5 | Accordion | 4 FAQs: where to redeem, expiry, reload, lost/stolen |

### Images needed

| Slot | Suggested filename | Dimensions |
|---|---|---|
| Hero | `giftcard-hero.jpg` | 1920×1080 |
| Card A (digital) | `giftcard-digital.jpg` | 800×600 |
| Card B (physical) | `giftcard-physical.jpg` | 800×600 |
| Card C (bulk) | `giftcard-bulk.jpg` | 800×600 |
| Balance check | `giftcard-balance.png` | 1000×700 |

### QA checklist

- [ ] Both locales load
- [ ] Card grid is 3 columns on desktop, stacks on mobile
- [ ] "Check balance" CTA navigates correctly

---

## Page 4 — Franchise

- **Reference URL:** https://www.timhortons.ca/franchise
- **EN slug:** `franchise` → `/en/franchise`
- **FR slug:** `franchise` → `/fr/franchise` (same slug)
- **Nav location:** Header → `About` dropdown
- **Form referenced:** *Franchise Inquiry Form*
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Hero Banner | Hero of an owner-operator at a Tim Hortons; title "Build a business with Canada's coffee brand" |
| 2 | Text With Image | "Owning a Tim Hortons" intro with photo of franchisee |
| 3 | Double Image | Cards: "A trusted brand" + "End-to-end support" |
| 4 | Steps | 5 steps: Submit inquiry → Discovery call → Application & approval → Site selection & training → Open for business |
| 5 | Rich Text | "Investment & requirements" — investment range, capital expectations, FDD note |
| 6 | Form | **Franchise Inquiry Form** (with intro content) |
| 7 | Accordion | 4 FAQs: experience, timeline, ongoing fees, multi-unit |

### Important content notes

- Verify the **investment range** against current Franchise Disclosure Document before publishing.
- Verify **capital requirement** and qualification language with the franchising team.
- Form references a state/province dropdown — confirm provinces/states list matches markets currently opening.

### Images needed

| Slot | Suggested filename | Dimensions |
|---|---|---|
| Hero | `franchise-hero.jpg` | 1920×1080 |
| Intro | `franchise-owner.jpg` | 1000×800 |
| Why A | `franchise-brand.jpg` | 800×600 |
| Why B | `franchise-support.jpg` | 800×600 |

### QA checklist

- [ ] Both locales load (FR uses same `franchise` slug intentionally)
- [ ] Franchise form submits to `form-submissions`
- [ ] Investment numbers reflect current FDD
- [ ] Step numbering renders 1–5

---

## Page 5 — Our Coffee Story

- **Reference URL:** https://www.timhortons.ca/our-coffee-story
- **EN slug:** `our-coffee-story` → `/en/our-coffee-story`
- **FR slug:** `notre-histoire-de-cafe` → `/fr/notre-histoire-de-cafe`
- **Nav location:** Header → `About` dropdown
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Hero Banner | Center-aligned hero; coffee close-up; "Always fresh. Always Tims." |
| 2 | Text With Image | "The bean" section (image right) |
| 3 | Text With Image | "The roast" section (image left) |
| 4 | Text With Image | "The brew" section (image right) |
| 5 | Double Image | "Sourced with care" + "Roasted to order" |
| 6 | Image | Full-width photograph with caption — "A morning in a Tim Hortons roastery" |
| 7 | Call to Action | "Bring it home" — link to retail availability |

### Images needed

Five distinct images: hero, bean close-up, roastery interior, brewing in restaurant, sourcing/farmer, gallery hero.

### QA checklist

- [ ] Image positions alternate (right/left/right) as designed
- [ ] CTA "Find it in stores" link points to the correct retail landing page (update URL when known)

---

## Page 6 — Nutrition & Allergens

- **Reference URL:** https://www.timhortons.ca/nutrition-and-allergens
- **EN slug:** `nutrition-and-allergens` → `/en/nutrition-and-allergens`
- **FR slug:** `valeurs-nutritives-et-allergenes` → `/fr/valeurs-nutritives-et-allergenes`
- **Nav location:** Header → `About` dropdown
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Page Header | Lightweight title row (no hero image) |
| 2 | Rich Text | "Know what's in your order" — intro + disclaimer |
| 3 | Card Grid | 3 download cards: Nutrition guide PDF, Allergen guide PDF, LTO sheet |
| 4 | Accordion | Allergen info grouped by category (Coffee & beverages, Baked goods, Breakfast & lunch, Cold treats) |
| 5 | Rich Text | "Important notice" — cross-contact disclaimer, last-updated date |

### Important content notes

- **PDF links are placeholders** (`/files/nutrition-guide.pdf` etc.). Upload the actual PDFs (or link to the existing ones) and update each card's link URL.
- Confirm allergen language with the Nutrition team before publishing.
- Update the "Last updated" year in the closing Rich Text block when changes happen.

### QA checklist

- [ ] All download links resolve to real PDFs
- [ ] Both locales load
- [ ] Accordion items expand
- [ ] Disclaimer text accurate and reviewed by Nutrition

---

## Page 7 — About Us

- **Reference URL:** https://www.timhortons.ca/about-us
- **EN slug:** `about-us` → `/en/about-us`
- **FR slug:** `a-propos` → `/fr/a-propos`
- **Nav location:** Header → `About` dropdown
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Hero Banner | Storefront or community shot; "Always Canadian. Always welcoming." |
| 2 | Text With Image | "Our mission" |
| 3 | Double Image | Heritage cards: "1964 — A first restaurant" + "Today — Across Canada and beyond" |
| 4 | Card Grid | 3 values: Community first, Quality every day, Welcoming for everyone |
| 5 | Rich Text | "Tim Hortons Foundation" — Camps story |
| 6 | Call to Action | "Join the team" — Careers + Franchise CTAs |

### Images needed

Hero, mission portrait, heritage archival image (1964 vibe), heritage modern image (storefront today), optional value-card images.

### QA checklist

- [ ] Founder/heritage dates accurate
- [ ] Foundation statistic (320,000+ youth) verified with current Foundation numbers
- [ ] Career link points to actual careers site

---

## Page 8 — Account Deletion

- **Reference URL:** https://www.timhortons.ca/account-deletion
- **EN slug:** `account-deletion` → `/en/account-deletion`
- **FR slug:** `suppression-de-compte` → `/fr/suppression-de-compte`
- **Nav location:** Header → `Help` dropdown
- **Form referenced:** *Account Deletion Request Form*
- **Status after seed:** Published

### Block-by-block

| # | Block | What to put |
|---|---|---|
| 1 | Page Header | Lightweight header (no hero image) |
| 2 | Rich Text | "How to request deletion" — explains in-app and form options |
| 3 | Form | **Account Deletion Request Form** |
| 4 | Rich Text | Post-submission expectations, privacy contact, Privacy Notice link |

### Important content notes

- **Privacy email is placeholder** (`privacy@timhortons.example`) — replace with real privacy contact.
- Confirm processing timeline (currently "30 days") with the privacy / legal team.
- Confirm in-app deletion path (Profile → Settings → Delete account) is accurate.

### QA checklist

- [ ] Form submission lands in `form-submissions` collection
- [ ] Confirmation message appears on submit
- [ ] Privacy contact email is correct
- [ ] Both locales load

---

## Navbar (Header global) — current structure

Set by seed; CMS admin can edit any time at Globals → Header.

```
About               ▼   ── dropdown
                    ├─ Our Coffee Story
                    ├─ About Us
                    ├─ Nutrition & Allergens
                    └─ Franchise

Rewards & Cards     ▼   ── dropdown
                    ├─ Tims Rewards
                    └─ Tims Gift Card

Order               ▼   ── dropdown
                    └─ Catering

Help                ▼   ── dropdown
                    └─ Account Deletion

Static Pages            ── direct link
Block Library           ── direct link
```

### Editing the navbar

1. Open `/admin` → **Globals** → **Header**.
2. Each row in `Nav items` has:
   - **Label** — text shown in the top-level navbar.
   - **Link** — optional. If set, clicking the top-level label navigates there.
   - **Children** — optional array. If 1+ children are present, the top-level entry becomes a dropdown.
3. **To add a new page to the nav:** find the right group, click **Add Dropdown child**, set the link to **Internal link → select the page**, and save.
4. **To make a flat link:** leave **Children** empty and set **Link** at the top level.
5. **Mobile** automatically renders the same structure as an accordion drawer.

---

## Forms collection — auto-created by seed

| Form name | Used by |
|---|---|
| Contact Form | (legacy, unused on these pages) |
| Catering Inquiry Form | Catering page |
| Franchise Inquiry Form | Franchise page |
| Account Deletion Request Form | Account Deletion page |

To customize a form (add fields, change confirmation message, set up email notifications): `/admin/collections/forms` → click the form name.

---

## Re-running the seed

The seed is **idempotent** for each page (it deletes the page by slug then re-creates it). To re-run:

1. Make sure no in-flight CMS edits will be lost (the seed wipes pages with matching slugs).
2. Run `pnpm seed` or hit the `/api/seed` endpoint.
3. Check the server log for the per-page success lines: `✓ Seeded /en/<slug> and /fr/<slug>`.

> ⚠️ Re-running the full seed via `pnpm seed` will also reset the navbar and all forms to seeded defaults. If you've made navbar/form edits in the admin, re-export them first.
