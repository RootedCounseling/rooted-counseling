# Getting Rooted Counseling live — your steps

You've already got the hard parts done: the domain, your GitHub account, your Vercel
account. What's left is connecting them. This is written so you can do it without
knowing anything about code — it's all clicking buttons in websites you already have
accounts on.

**Order matters here** — do these in order, since a couple of later steps depend on
earlier ones being done first.

---

## 1. Create the repository on GitHub

This is the "folder" your website's files will live in, under your own account.

1. Go to github.com and log in
2. Click the **+** in the top-right corner → **New repository**
3. Repository name: `rooted-counseling`
4. Set it to **Private**
5. **Leave every checkbox unchecked** — don't add a README, .gitignore, or license.
   (Your son already has all of that ready to send; checking these boxes would cause a
   conflict when he sends it over.)
6. Click **Create repository**

You'll land on an empty repo page with some setup instructions on it — ignore those, you
don't need them.

## 2. Add your son as a collaborator

He needs permission to put the website's files into this repository.

1. On that repo's page, click **Settings** (top of the page, not your account settings)
2. In the left sidebar, click **Collaborators**
3. Click **Add people**
4. Type his GitHub username and select him
5. He'll get an email invite — tell him to accept it

Once he's accepted, tell him to go ahead — he'll send the files over from his end.

## 3. Connect Vercel to your GitHub account

1. Go to vercel.com and log in
2. Click **Add New...** → **Project**
3. If Vercel asks to install its GitHub App / connect to GitHub, say yes, and when
   asked which repositories to grant access to, choose **All repositories** (or at
   minimum select `rooted-counseling` once it exists)
4. Once your son has sent the files over (step 2 needs to be done first), the
   `rooted-counseling` repository will appear in a list — click **Import** next to it
5. Vercel will show a settings screen — you don't need to change anything on it, the
   project already knows how to build itself. Click **Deploy**
6. Wait about a minute. When it finishes, Vercel gives you a working link like
   `rooted-counseling-something.vercel.app` — click it to see the live site. This isn't
   your final address yet (that's step 6 below), but it confirms everything worked.

## 4. Create a free Resend account (for the contact form to send email)

Resend is the service that actually delivers messages from your website's contact form
into your inbox. Without this step, the form will show visitors a polite "please email
me directly" message instead of actually sending — so it's worth doing before you
consider the site finished.

1. Go to resend.com and sign up (free — no credit card needed)
2. Once logged in, go to **API Keys** in the left sidebar
3. Click **Create API Key**, give it any name (e.g. "rooted counseling website"), and
   click Create
4. **Copy the key it shows you immediately** — it will not show it to you again. Paste
   it somewhere temporarily safe (a Notes app), you'll need it in the next step.

## 5. Add the two settings the website needs

Back in Vercel:

1. Open your `rooted-counseling` project
2. Click **Settings** → **Environment Variables**
3. Add the first one:
   - Name: `RESEND_API_KEY`
   - Value: the key you copied from Resend in step 4
   - Click **Save**
4. Add the second one:
   - Name: `CONTACT_TO`
   - Value: `matthew@rootedcounseling.us`
   - Click **Save**
5. Go to the **Deployments** tab, find the most recent deployment, click the **⋯**
   (three dots) next to it, and choose **Redeploy**. This is required — the two settings
   you just added don't apply until you redeploy once.

## 6. Point rootedcounseling.us at the site

1. Still in your Vercel project: **Settings** → **Domains**
2. Type `rootedcounseling.us` and click **Add**
3. Also add `www.rootedcounseling.us` — when it asks, set it to redirect to the version
   without `www`
4. Vercel will now show you one or two DNS records (they'll look like technical
   gibberish — that's normal, just note them down or keep the tab open)
5. Open a new tab, go to namecheap.com, log in, go to **Domain List**, find
   `rootedcounseling.us`, click **Manage**
6. Click the **Advanced DNS** tab
7. Enter the exact records Vercel showed you in step 4 (delete any conflicting default
   records Namecheap put there, like a "parking page" record, if Vercel's instructions
   say to)
8. Save

This part just takes time — usually live within 30 minutes, sometimes a few hours.
Vercel handles the security certificate (the padlock icon in browsers) automatically
once it detects the domain is pointed correctly; there's nothing extra to do for that.

**Check it worked:** visit `https://rootedcounseling.us` in a normal browser tab (not
the vercel.app one). If your site loads there with a padlock icon, you're done.

## 7. Update your Google Business Profile

1. Search "Rooted Counseling" on Google, or go to business.google.com
2. Open your business profile, find the **Website** field, edit it
3. Change it to `https://rootedcounseling.us`
4. Save

## 8. The last two sentences that are still placeholders

See `docs/ASK-MATTHEW.md` in the project — two short passages on the About page
(how you describe working with clients, and your note about faith) are still
placeholder wording. No rush, but whenever you get to it, that file explains exactly
what to look at and how to send a replacement.

---

### If something doesn't match what's described here

Vercel and GitHub occasionally rearrange their menus. If a button or page doesn't look
like what's described, the *goal* of each step is more reliable than the exact
click-path — tell your son what you're seeing and he can adjust.
