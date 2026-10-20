# Panduan Tumpak Sewu

Independent Indonesian visitor guide built with Astro, Tailwind and TypeScript. Use the Node and package-manager versions in `package.json`, install the committed lockfile, then run `pnpm check` and `pnpm build`.

The production origin is configured in `astro.config.mjs`. The ASSETS Worker in `src/worker.ts` runs before static assets, redirects HTTP/www to HTTPS apex while preserving path/query, and retains unknown-path404 with noindex. `wrangler.jsonc` serves `dist` through the ASSETS binding. Run a Wrangler deployment dry-run after building; verify the actual Cloudflare project and domain mapping before publishing.

The repository previously tracked build output. When preparing a release, include newly generated CSS/404/sitemap files as well as changed or removed output, or rebuild the output from source. Local checks do not confirm production release or actual mobile browser layout.

The four existing page families are the guide, privacy, terms and cookie settings. FAQs share visible and structured-data content. Primary mobile navigation remains visible with at least 44px targets. Analytics is opt-in; cookie preferences are stored locally and storage failures do not stop navigation.

Photo creators and original Pexels pages are documented in `ASSET_SOURCES.md`; source links are visible on the guide. Photos illustrate the destination and do not establish current access or operating conditions. Keep private reports, local paths, credentials and runtime caches out of the published tree.
