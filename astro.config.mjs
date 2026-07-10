// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// The Keystatic admin UI (/keystatic) is only mounted in local dev, where it
// edits the content files on disk directly. To enable editing on the live
// site, set KEYSTATIC_GITHUB_MODE=true in Vercel and follow docs/EDITING.md
// to connect the GitHub App — until then, production builds are fully static.
const keystaticEnabled =
  process.env.KEYSTATIC_GITHUB_MODE === 'true' || process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), ...(keystaticEnabled ? [keystatic()] : [])],
  adapter: vercel(),
});
