# Rooted Counseling Ohio — website

Website for Matthew's solo counseling practice in West Chester, Ohio. First clients
October 1, 2026. This site is his entire professional front door: many visitors arrive
on a phone, at night, in distress, deciding whether to reach out at all.

**If you are Claude and someone just opened this project: read this whole file before
changing anything.** The rules below are not style preferences — several are legal or
ethical requirements, and one is about whose words get to sound like Matthew's.

## The most important rule: never write copy in Matthew's voice

Any text meant to sound like Matthew personally — how he sees a client's experience, his
philosophy, his feelings about faith — must **not** be written as polished final copy by
an AI. Matthew's clients are trusting him with the worst things that have happened to
them; the words that sound like him need to actually be his.

When new voice-flavored text is needed:

1. Write a **short** placeholder (1–2 sentences), prefixed literally with
   `[DRAFT — Matthew to rewrite in his own words]`
2. Put it in **one isolated field** in `keystatic.config.ts` — never woven into page
   layout, never split across files
3. Label the field `(Matthew's voice — DRAFT)` so it is obvious in the editing UI

Fields currently holding drafts awaiting Matthew's rewrite:

- `whatThisFeelsLike` on each specialty (`content/specialties/*.json`)
- `approachNote` and `faithNote` (`content/about.json`)

Text that is **fine** to write normally: specialty names, session logistics, fees
mechanics, FAQ answers about process, legal notices, navigation, headings.

Two fields are Matthew's real words already and must not be reworded without him:

- `bio` in `content/about.json` — his verbatim statement. Note it contains the phrase
  "cultivate healing to your very core"; that is his wording, unrelated to the old
  practice name, and it stays.
- `personalWelcome` in `content/home.json`

## Non-negotiables (legal / ethical — not creative choices)

- **No testimonials anywhere.** Brand-new practice. Do not invent or add any.
- **No public form may collect health information, symptoms, or diagnoses.** The contact
  form (name, email, phone, message) is the only form on the site, and the contact page
  explicitly asks people not to describe their situation in it.
- **Every page footer must carry this exact sentence:** "This site is not for
  emergencies. If you are in crisis, call or text 988." It lives in
  `src/layouts/Base.astro`.
- **Never imply insurance is accepted** (private pay only, no sliding scale) **or that
  Matthew can see clients located outside Ohio.** He is licensed in Ohio only.
- **Fees page must state** that the federal No Surprises Act entitles self-pay clients to
  a good-faith cost estimate.
- **Supervision disclosure** is a one-line editable field (`supervisionDisclosure` in
  `content/site.json`) shown in the footer and on the About page. Ohio requires LPCs
  practicing under supervision to name their supervisor on all materials. Keep it a
  trivially-editable single line — never bury it in code.

## Design intent

Grounded, warm, unhurried — "a lit window at midnight," not a medical office. Aubergine
ink and a blue accent (from the client-supplied logo) on warm paper by day, with a
genuinely designed dark theme for night readers (`prefers-color-scheme`, no toggle). Warm
paper background and the amber action colour carried over from an earlier iteration built
around Matthew's headshot (evergreen shirt, golden autumn leaves) — that photo is still
the only image on the site, just no longer the palette source.

The supplied logo (`public/assets/rooted-logo.png`, full lockup with tagline) has a
"COUNSELING" line far too small relative to the tree mark to survive shrinking to header
size — the header instead uses the mark cropped above that line
(`rooted-logo-header.png` / `-dark.png`, generated from the original — see
`docs/HANDOFF.md` if regenerating) plus live text underneath. Don't swap in the full
lockup image at header size without re-checking legibility on a real phone.

Deliberately avoided: clinical blue/teal, the cream-serif-terracotta look most
AI-generated therapist sites land on, stock photos, leaf clip-art. The only photo on the
site is Matthew's real headshot.

Trauma-informed mechanics that must be preserved: no popups, no autoplay, no urgency or
countdown language, no analytics or third-party scripts, `prefers-reduced-motion`
respected, WCAG AA contrast, generous whitespace.

## Structure

- **All site text lives in `content/*.json`** — never hardcode client-facing copy in
  components. `src/lib/content.ts` loads it; specialty pages are generated from
  `content/specialties/*.json` via `src/pages/specialties/[slug].astro`.
- `keystatic.config.ts` defines the editing UI at `/keystatic` (local dev). Field labels
  and descriptions there are read by non-technical people — write them plainly.
- `src/layouts/Base.astro` — header, footer, SEO tags, LocalBusiness structured data.
- `src/pages/api/contact.ts` — serverless contact form relay (Resend). Stores nothing.
  Fails to a friendly `/message-failed/` page rather than silently dropping messages.

## Stack

Astro (static, zero client-side JS) + Keystatic (git-based CMS) + Vercel. React is
present only because Keystatic's admin UI needs it — do not add client-side framework
components to the public pages; the site should stay near-instant on a bad phone
connection.

## Development

```
npm run dev          # site at localhost:4321, editing UI at localhost:4321/keystatic
npm run build        # production build — run before deploying
npx vercel deploy --prod --yes
```

When starting the dev server in an agent session, prefer background mode:
`astro dev --background`, managed with `astro dev stop|status|logs`.

## Before launch — still outstanding

- [ ] Matthew rewrites every `[DRAFT — …]` field via `/keystatic`
- [ ] Confirm contact email, SimplePractice scheduling URL (both placeholders in
      `content/site.json`)
- [ ] Supervision disclosure now names Jessica Moore, LPC-S, but still needs her
      **license number** filled in (bracketed placeholder in `content/site.json`).
      Also still worth confirming with the Ohio licensing board whether this is
      required at all — the project brief says yes for supervised LPCs; Matthew's
      questionnaire said no. If he is fully licensed (LPCC) by opening day it's moot
      and the field can be cleared entirely.
- [ ] Set `RESEND_API_KEY` and `CONTACT_TO` in Vercel so the contact form delivers
- [ ] Point the custom domain at Vercel
- [ ] Optionally enable Keystatic GitHub mode so Matthew can edit from any browser

See `docs/EDITING.md` (for Matthew) and `docs/HANDOFF.md` (accounts, domain, deploys).
