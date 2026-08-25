# Editing the site (for Matthew and family)

All text on the site lives in simple content files under `content/` — never inside code.
You edit them through **Keystatic**, a friendly admin screen with plain text fields.

## Editing locally (works today)

1. Open a terminal in this project folder and run `npm run dev`
2. Visit http://localhost:4321/keystatic
3. Edit any field, click **Save**, and the site updates instantly

Sections you'll find there:

- **Practice details** — address, email, SimplePractice link, supervision disclosure, headshot photo
- **Homepage** — hero text and Matthew's personal welcome
- **About Matthew** — bio (verbatim), credentials, approach & faith notes
- **Fees & FAQ** — session fee and every FAQ entry
- **Specialties** — the six specialty pages

## ⚠️ Before launch: fields Matthew MUST rewrite

Every field whose label says **(Matthew's voice — DRAFT)** currently contains
placeholder text beginning with `[DRAFT — Matthew to rewrite in his own words]`.
These are stand-ins, not finished copy — they must be rewritten in Matthew's own
words before the site goes live.

Everything else in Practice details is filled in with real information (domain, email,
phone, supervision disclosure) — the one thing still a placeholder is:

- **The SimplePractice link** (Practice details) — still `https://example.clientsecure.me`.
  Replace with Matthew's real scheduling URL once his SimplePractice account exists.

For setting up the domain, hosting, and accounts in Matthew's own name, see
[HANDOFF.md](HANDOFF.md).

## Editing on the live site (set up once, after deploy)

Keystatic can also run at `https://<the-site>/keystatic` so edits can be made from
any browser with no terminal. This requires a one-time GitHub App setup (technical —
son's job): follow https://keystatic.com/docs/github-mode, then set the environment
variable `KEYSTATIC_GITHUB_MODE=true` in the Vercel project settings and redeploy.
Until then, the deployed site is fully static and the admin screen only exists locally.

## Making the contact form deliver email (set up once — son's job)

The form relays messages to Matthew's inbox through [Resend](https://resend.com) (free tier
is plenty). Until configured, submitting the form shows a friendly "didn't send" page that
points people to email and SimplePractice instead — nothing breaks silently.

1. Create a free Resend account and an API key
2. In the Vercel project settings, add environment variables:
   - `RESEND_API_KEY` — the key from step 1
   - `CONTACT_TO` — Matthew's real inbox address
3. Redeploy. (Later, to send from the practice's own domain instead of
   `onboarding@resend.dev`, verify the domain in Resend and update the `from:` line in
   `src/pages/api/contact.ts`.)

## Swapping the photo

Either replace `public/assets/matthew-headshot.jpg` with a new file of the same name,
or upload a new photo via the **Practice details → Headshot** field in Keystatic.
