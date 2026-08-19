# Panduan Tumpak Sewu

Situs informasi wisata independen dan non-profit untuk Air Terjun Tumpak Sewu, Sidomulyo, Pronojiwo, Kabupaten Lumajang, Jawa Timur.

## Teknologi

- Astro 7.2.2
- Tailwind CSS 4.3.3 melalui `@tailwindcss/vite`
- TypeScript 6.0.3
- pnpm 11.22.0
- Node.js 24.19.0
- Cloudflare Workers Static Assets melalui Wrangler 4.123.0

Semua versi paket langsung dipatok secara presisi di `package.json` dan `pnpm-lock.yaml` disertakan.

## Menjalankan proyek

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm dev
```

## Domain produksi

Domain hanya dikonfigurasi pada satu tempat, yaitu konstanta `SITE` di `astro.config.mjs`.

```js
const SITE = '';
```

Biarkan kosong selama domain belum ditetapkan. Dalam keadaan kosong, build tetap dapat berjalan, tag canonical dan URL Open Graph absolut tidak dipaksakan, JSON-LD tidak memakai domain contoh, dan integrasi sitemap tidak diaktifkan. Setelah domain tersedia, isi nilai tersebut dengan URL produksi lalu build ulang.

## Deploy Cloudflare Workers

`wrangler.jsonc` mengarahkan Static Assets ke `./dist`.

```bash
pnpm deploy
```

## Google Analytics dan persetujuan Cookie

Measurement ID: `G-HXM22WWPKP`. Skrip Google Analytics tidak dimuat sebelum pengunjung secara eksplisit mengaktifkan cookie analitik di `/pengaturan-cookie/`. Preferensi disimpan di `localStorage` dan dapat diubah kapan saja pada halaman tersebut.

## Foto

Semua foto utama disimpan lokal di `public/images/` dalam format WebP. Kredit fotografer ditampilkan pada halaman utama. Sumber foto: Pexels, dengan hak cipta tetap pada masing-masing fotografer.

## Sumber editorial utama

Informasi inti dibandingkan dengan publikasi Pemerintah Kabupaten Lumajang, Dinas Pariwisata Kabupaten Lumajang, sumber pariwisata nasional Indonesia, dan data lokasi Google Maps. Nilai yang mudah berubah seperti tarif, jam operasional, kondisi jalur, serta transportasi selalu diberi anjuran untuk diverifikasi kembali sebelum berangkat.

## Pemeriksaan sebelum rilis

```bash
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

Lalu periksa hasil build agar tidak mengandung domain contoh/localhost, `chrome-extension://`, atau sitemap dengan URL palsu/`lastmod` yang dibuat-buat.

Pemeriksaan yang sama tersedia sebagai `scripts/self-check.sh` untuk dijalankan pada lingkungan yang memiliki akses ke registry paket.
