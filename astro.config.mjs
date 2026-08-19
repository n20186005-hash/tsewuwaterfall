import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Satu-satunya tempat untuk mengatur domain produksi.
// Isi, misalnya, setelah domain final tersedia. Biarkan kosong selama pengembangan.
const SITE = '';

export default defineConfig({
  site: SITE || undefined,
  output: 'static',
  integrations: SITE ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
