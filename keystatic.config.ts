import { config, fields, singleton, collection } from '@keystatic/core';

// All site text lives in content/ as JSON files, edited through this admin UI
// (/keystatic in local dev; see docs/EDITING.md for enabling it on the live site).
//
// Fields labeled "(Matthew's voice — DRAFT)" hold placeholder text that must be
// rewritten by Matthew before launch. They are deliberately isolated fields so
// rewriting them never touches layout or code.

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Cultivate Counseling Ohio' },
  },
  singletons: {
    site: singleton({
      label: 'Practice details',
      path: 'content/site',
      format: { data: 'json' },
      schema: {
        practiceName: fields.text({ label: 'Practice name', defaultValue: 'Cultivate Counseling Ohio' }),
        addressLine1: fields.text({ label: 'Address line', defaultValue: '8859 Cincinnati Dayton Rd. #203' }),
        addressLine2: fields.text({ label: 'City, state, zip', defaultValue: 'West Chester, OH 45069' }),
        email: fields.text({
          label: 'Contact email',
          description: 'Where contact-form messages are sent and the email shown on the site.',
          defaultValue: '[matthew@example.com — replace before launch]',
        }),
        phone: fields.text({
          label: 'Phone (optional)',
          description: 'Shown on the contact page if filled in. Leave blank to hide.',
          defaultValue: '',
        }),
        simplePracticeUrl: fields.url({
          label: 'SimplePractice scheduling link',
          description: 'Every "schedule" button on the site points here.',
          defaultValue: 'https://example.clientsecure.me',
        }),
        supervisionDisclosure: fields.text({
          label: 'Supervision disclosure (footer + About page)',
          description:
            'Ohio requires LPCs under supervision to name their supervisor on all materials. Replace before launch — or clear it entirely if fully licensed (LPCC) by opening day.',
          defaultValue: '[Supervision disclosure — confirm before launch]',
        }),
        headshot: fields.image({
          label: 'Headshot photo',
          description: 'Used on the homepage and About page.',
          directory: 'public/assets',
          publicPath: '/assets/',
        }),
      },
    }),

    home: singleton({
      label: 'Homepage',
      path: 'content/home',
      format: { data: 'json' },
      schema: {
        heroHeading: fields.text({
          label: 'Hero heading',
          multiline: true,
          defaultValue: 'Whatever brought you here tonight, you don’t have to carry it alone.',
        }),
        heroSubtext: fields.text({
          label: 'Hero subtext',
          multiline: true,
          defaultValue:
            'Counseling for betrayal trauma, addiction recovery, relationships, anxiety, and depression — in person in West Chester, Ohio, or by telehealth anywhere in the state.',
        }),
        personalWelcome: fields.text({
          label: "Personal welcome (Matthew's voice — DRAFT)",
          description:
            'One or two sentences from Matthew to the person reading, shown beside his photo on the homepage. REWRITE BEFORE LAUNCH — the current text is a placeholder.',
          multiline: true,
          defaultValue:
            "[DRAFT — Matthew to rewrite in his own words] I'm Matthew. Reaching out is hard — I want you to know that whatever you bring, you'll be met with acceptance, not judgment.",
        }),
      },
    }),

    about: singleton({
      label: 'About Matthew',
      path: 'content/about',
      format: { data: 'json' },
      schema: {
        bio: fields.text({
          label: 'Bio — Matthew’s own words (verbatim)',
          description: 'This is Matthew’s statement, kept verbatim. Edit only if Matthew himself revises it.',
          multiline: true,
          defaultValue:
            'I have experienced the power of walking with a counselor and friends to heal past hurts and build a path filled with hope. That is my heart for every client: that they would be unconditionally loved and accepted regardless of how they have been harmed by themselves or others. You deserve a safe space to speak the unspeakable that you may cultivate healing to your very core. That leads to a life filled with joy and influence.',
        }),
        credentials: fields.text({
          label: 'Credentials line',
          description: 'Shown under Matthew’s name. Update when licensure changes (e.g., LPC → LPCC).',
          defaultValue: 'Licensed Professional Counselor (LPC), State of Ohio',
        }),
        approachNote: fields.text({
          label: "How I work (Matthew's voice — DRAFT)",
          description:
            'Matthew’s personal take on how sessions with him feel, beyond the factual CBT/EFT description. REWRITE BEFORE LAUNCH — the current text is a placeholder.',
          multiline: true,
          defaultValue:
            '[DRAFT — Matthew to rewrite in his own words] Sessions with me are unhurried and honest. We go at your pace, and nothing you say will shock me.',
        }),
        faithNote: fields.text({
          label: "On faith (Matthew's voice — DRAFT)",
          description:
            'Matthew’s personal words about faith-based integration. The factual policy (available if you want it, never assumed) is stated separately on the page — this field is his personal framing. REWRITE BEFORE LAUNCH.',
          multiline: true,
          defaultValue:
            '[DRAFT — Matthew to rewrite in his own words] Faith is a meaningful part of my own story, and if it’s part of yours, we can bring it into our work together. If it isn’t, that changes nothing about the care you’ll receive.',
        }),
      },
    }),

    fees: singleton({
      label: 'Fees & FAQ',
      path: 'content/fees',
      format: { data: 'json' },
      schema: {
        sessionFee: fields.text({
          label: 'Session fee',
          description: 'e.g. "$140 per 50-minute session". Replace before launch.',
          defaultValue: '[Session fee — Matthew to confirm]',
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value || 'New question',
          }
        ),
      },
    }),
  },

  collections: {
    specialties: collection({
      label: 'Specialties',
      path: 'content/specialties/*',
      format: { data: 'json' },
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Specialty name' } }),
        order: fields.integer({ label: 'Display order', defaultValue: 1 }),
        cardText: fields.text({
          label: 'Card text (homepage & overview)',
          description: 'One short factual sentence shown on the specialty card.',
          multiline: true,
        }),
        whatThisFeelsLike: fields.text({
          label: "What this feels like (Matthew's voice — DRAFT)",
          description:
            'The opening of the specialty page, speaking directly to the person’s experience. REWRITE BEFORE LAUNCH — the current text is a short placeholder, not finished copy.',
          multiline: true,
        }),
        howWeWork: fields.text({
          label: 'How we’ll work on it (factual)',
          description: 'Plain description of the approach (CBT, EFT, pacing). Factual copy — fine to keep as written.',
          multiline: true,
        }),
      },
    }),
  },
});
