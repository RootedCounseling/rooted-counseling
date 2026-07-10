import type { APIRoute } from 'astro';
import site from '../../../content/site.json';

export const prerender = false;

// Sends the contact form to Matthew's inbox via Resend (https://resend.com).
// Requires two environment variables in Vercel (see docs/EDITING.md):
//   RESEND_API_KEY  — free API key from Resend
//   CONTACT_TO      — Matthew's real inbox (falls back to the CMS email field)
// Nothing is stored anywhere: the message is relayed to email and discarded.

export const POST: APIRoute = async ({ request, redirect }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect('/message-failed/', 303);
  }

  const field = (name: string, max: number) => String(form.get(name) ?? '').trim().slice(0, max);

  const name = field('name', 120);
  const email = field('email', 200);
  const phone = field('phone', 40);
  const message = field('message', 4000);
  const honeypot = field('website', 200);

  // Bots fill the hidden field; pretend success so they move on.
  if (honeypot) return redirect('/thank-you/', 303);

  if (!name || !email || !message) return redirect('/message-failed/', 303);

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO || site.email;
  if (!apiKey || !to || to.includes('[')) {
    console.error('Contact form not configured: missing RESEND_API_KEY or a real CONTACT_TO address');
    return redirect('/message-failed/', 303);
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    '',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website contact form <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `New message from ${name} — cultivatecounseling website`,
        text: body,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text());
      return redirect('/message-failed/', 303);
    }
  } catch (err) {
    console.error('Contact form send failed:', err);
    return redirect('/message-failed/', 303);
  }

  return redirect('/thank-you/', 303);
};
