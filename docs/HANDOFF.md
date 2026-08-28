# Handoff — moving the code to Matthew's own accounts

Matthew already has everything set up on his end: Namecheap account with
**rootedcounseling.us** purchased, his own GitHub account (`RootedCounseling`), his own
Vercel account, and Google Business Profile. So this isn't about creating accounts — it's
three mechanical steps: get the code into his GitHub, import it into his Vercel, point
the domain at it.

---

## 1. Get the code into Matthew's GitHub

Since the repo lives under **his** account, you need push access to it without sharing
his password. Cleanest way:

1. Matthew logs into github.com, clicks **New repository**
2. Name it `rooted-counseling`, set it **Private**, and do **not** initialize it with a
   README, .gitignore, or license (the project already has all of that — an
   auto-created README would conflict with the push)
3. Matthew goes to that repo's **Settings → Collaborators**, clicks **Add people**, and
   adds your GitHub username. GitHub emails you an invite — accept it.
4. Once accepted, from this project folder on your machine:

```bash
git remote add origin https://github.com/RootedCounseling/rooted-counseling.git
git branch -M main
git push -u origin main
```

That's it — the entire history and all content now lives in his account. From here on,
`git push` updates the source of truth; nothing further to do in this step.

---

## 2. Import it into Matthew's Vercel

He already has a Vercel account — this just points it at the new repo.

1. Matthew logs into vercel.com
2. If it's not already connected: **Settings → Git → Install** the Vercel GitHub App on
   his `RootedCounseling` account (a one-time authorization, needed so Vercel can see
   his repos)
3. **Add New → Project**, select the `rooted-counseling` repository
4. Vercel detects Astro automatically — accept the defaults, click **Deploy**
5. Once deployed, go to **Settings → Environment Variables** and add:
   - `RESEND_API_KEY` — from a free account at resend.com (recommend Matthew creates
     this one himself too, same as the domain/GitHub/Vercel accounts, so it's his to
     manage)
   - `CONTACT_TO` = `matthew@rootedcounseling.us` (confirmed live and receiving mail)
6. Redeploy (**Deployments → ⋯ → Redeploy**) so the environment variables take effect

From here on, every `git push` to the GitHub repo redeploys the live site automatically —
no manual redeploy needed for content or code changes.

---

## 3. Point the domain at it

1. In Vercel: project → **Settings → Domains** → add `rootedcounseling.us` and
   `www.rootedcounseling.us` (set the `www` one to redirect to the root)
2. Vercel displays the DNS records it needs (typically an `A` record for the root and a
   `CNAME` for `www`)
3. In Namecheap: **Domain List → Manage → Advanced DNS**, and enter those exact records
4. Wait — usually minutes, sometimes a couple hours. Vercel issues the HTTPS certificate
   automatically once DNS resolves; no action needed for that part.
5. Visit `https://rootedcounseling.us` to confirm it's live.

Do **not** use Namecheap's domain "forwarding" or parking page options — the DNS records
above are the correct mechanism, not a redirect.

---

## After it's live

- **Update Matthew's Google Business Profile** — the Website field should point to
  `https://rootedcounseling.us`.
- **(Optional) Google Search Console** — add the domain as a property (Google gives a
  DNS TXT record to verify ownership; add it in Namecheap same as step 3), then submit
  `https://rootedcounseling.us/sitemap-index.xml` so Google indexes every page faster.
  Not required — Google finds sites on its own eventually — but it speeds things up.
- **Send Matthew `docs/ASK-MATTHEW.md`** if you haven't — it lists the handful of
  passages written in his voice that are live as placeholders, with plain instructions
  for reviewing or changing them.

---

## Editing after handoff

Two ways, both covered in `docs/EDITING.md`:

- **Locally** — `npm run dev`, then `localhost:4321/keystatic`. Requires Node.js
  installed and the repo cloned.
- **From any browser, no install** — optional, requires connecting a GitHub App once
  (`keystatic.com/docs/github-mode`), then setting `KEYSTATIC_GITHUB_MODE=true` in
  Vercel. Worth doing if Matthew wants to edit text himself without you.
