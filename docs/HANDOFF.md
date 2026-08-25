# Handoff — putting this site in Matthew's own name

Goal: Matthew owns the domain, the hosting account, and the code, so nothing important
is tied to someone else's login. Everything below is free except the domain
(~$10–20/year).

Do these in order. Steps 1–3 can happen before the site is finished.

---

## 1. Matthew buys the domain (his Namecheap account)

The domain is **rootedcounseling.us**. He should buy it himself, on his own Namecheap
account, with his own card. The domain is the one asset that genuinely matters
long-term: it's the address on his business cards and the thing Google indexes. If it
sits in someone else's account, every future transfer is a hassle.

1. Matthew creates his own account at namecheap.com
2. Search for `rootedcounseling.us` and buy it
3. **Turn on WHOIS / domain privacy** (Namecheap includes it free for most TLDs — worth
   double-checking it's offered for `.us`, since a few registries restrict privacy on
   country-code domains). Without it, his home address and phone become public in the
   domain registry — bad for anyone, worse for a counselor.
4. Turn on auto-renew, so the site doesn't vanish in a year

Nothing else needs configuring at Namecheap yet — the DNS step comes in part 4. The code
already assumes this exact domain (`astro.config.mjs`, canonical URLs, sitemap,
`robots.txt`) — if the final domain ever changes, that's a one-line update in
`astro.config.mjs` plus the URL in `public/robots.txt`.

**Before buying:** several Ohio practices already use "Rooted" — Rooted Compassion
Counseling (Cincinnati, same metro as West Chester), Rooted & Restored (Columbus), Root
Counseling (Northfield). Worth checking that the exact name doesn't collide locally, and
worth a quick Ohio Secretary of State business-name search before registering an LLC.

---

## 2. Matthew creates a GitHub account (free)

This is the step that makes everything else easy, so it's worth doing even though it
sounds like a developer thing.

Putting the project in a GitHub repository that **Matthew owns** gets three things at
once:

- **A permanent backup** of the site that isn't on anyone's laptop
- **Automatic deploys** — any change saved to GitHub publishes to the live site in about
  a minute, with no commands to run
- **Browser-based editing** — Keystatic (the "edit the website" screen) can then run on
  the live site, so Matthew edits his own text from any computer or phone without
  installing anything

Steps:

1. Matthew creates a free account at github.com
2. He creates a new **private** repository named `rooted-counseling`
3. From this project folder, push the code to it:

```bash
git remote add origin https://github.com/<his-username>/rooted-counseling.git
git branch -M main
git push -u origin main
```

(He'll add you as a collaborator in the repo's Settings → Collaborators so you can keep
helping.)

---

## 3. Matthew creates his own Vercel account (free)

Vercel is what actually serves the website to the public. The free tier is genuinely
free and is far more than this site needs.

1. Matthew signs up at vercel.com — **choose "Continue with GitHub"** so the two
   accounts are linked from the start
2. Click **Add New → Project**, and import the `rooted-counseling` repository
3. Vercel detects Astro automatically — accept the defaults and click Deploy
4. Add the environment variables under Settings → Environment Variables:
   - `RESEND_API_KEY` — from a free resend.com account, so the contact form can send email
   - `CONTACT_TO` — Matthew's real inbox address
5. Redeploy so those take effect

From here on, every push to GitHub redeploys the live site automatically.

**Moving the existing project instead:** the site currently lives in a Vercel project
under a different account. It's simpler to import fresh from GitHub as above than to
transfer it — the current deployment can just be deleted afterward.

---

## 4. Connect the domain to Vercel

The domain (Namecheap) and the hosting (Vercel) are separate things; this step points
one at the other. Matthew keeps ownership of the domain throughout.

1. In Vercel: project → Settings → Domains → add `rootedcounseling.us` (and
   `www.rootedcounseling.us`, redirected to the root)
2. Vercel shows the DNS records it wants (typically an `A` record for the root domain and
   a `CNAME` for `www`)
3. In Namecheap: Domain List → Manage → **Advanced DNS**, and enter those records
4. Wait — usually minutes, occasionally a few hours. Vercel provisions the HTTPS
   certificate automatically once DNS resolves.

Do **not** use Namecheap's "forwarding" or parking options; the DNS records are the
correct mechanism.

---

## 5. Turn on browser editing (optional, recommended)

Once the code is on GitHub, Keystatic can run on the live site so Matthew edits at
`https://<his-domain>/keystatic` from any browser — no terminal, no installs.

Follow keystatic.com/docs/github-mode to create the GitHub App connection, then set
`KEYSTATIC_GITHUB_MODE=true` in Vercel's environment variables and redeploy. Until then,
editing works locally (see `docs/EDITING.md`).

---

## Getting the project onto Matthew's computer

Once step 2 is done, on his machine:

```bash
git clone https://github.com/<his-username>/rooted-counseling.git
cd rooted-counseling
npm install
npm run dev
```

He'll need [Node.js](https://nodejs.org) installed first (LTS version, default options).

If he installs Claude Code on that machine and opens this folder, Claude reads
`CLAUDE.md` automatically — the design intent, the legal non-negotiables, the rule about
never writing copy in his voice, and what's still unfinished. He can then just describe
what he wants changed in plain English.

---

## About "hosting it on his own device"

Worth being clear, because it's a common and reasonable-sounding idea: running the site
from a home computer isn't the right approach here, and isn't necessary.

A website served from a personal machine is only reachable while that machine is powered
on, awake, and online — a closed laptop means clients hitting a dead link. It also
exposes the home IP address, requires router and firewall changes, needs certificate
setup for HTTPS (browsers now warn on sites without it), and most residential ISPs block
inbound web traffic outright.

Vercel solves all of that for $0 on the free tier, with the site served from data
centers near the visitor. **What's genuinely valuable is the part underneath the
question:** Matthew having the actual files, on his own machine, in his own accounts,
with Claude able to understand and change them. That's what steps 2 and 3 give him — full
ownership, without running a server in his house.
