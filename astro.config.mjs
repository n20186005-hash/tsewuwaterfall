import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Satu-satunya tempat untuk mengatur domain produksi.
// Domain sudah aktif, sehingga diisi agar tag canonical, URL Open Graph absolut,
// dan sitemap ikut dihasilkan (penting untuk konsolidasi http/https di Google).
const SITE = 'https://tsewuwaterfall.com';

export default defineConfig({
  site: SITE || undefined,
  output: 'static',
  // Sitemap aktif hanya bila SITE terisi (sekarang aktif).
  integrations: SITE ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
