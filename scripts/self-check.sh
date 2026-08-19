#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo '[1/4] Instalasi bersih, pemeriksaan Astro, dan build'
rm -rf node_modules dist
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build

echo '[2/4] Pemeriksaan workspace'
if [[ -f pnpm-workspace.yaml ]]; then
  node <<'NODE'
const fs = require('node:fs');
const text = fs.readFileSync('pnpm-workspace.yaml', 'utf8');
const match = text.match(/^packages:\s*\n((?:\s+-\s+.+\n?)+)/m);
if (!match || !/\S/.test(match[1])) {
  console.error('pnpm-workspace.yaml ada tetapi packages kosong atau hilang.');
  process.exit(1);
}
NODE
else
  echo 'pnpm-workspace.yaml tidak ada (sesuai proyek paket tunggal).'
fi

echo '[3/4] Pemeriksaan hasil build untuk placeholder/URL ilegal'
if grep -RInE 'example\.com|localhost|chrome-extension://' dist; then
  echo 'Ditemukan placeholder atau URL ilegal di dist.' >&2
  exit 1
fi

echo '[4/4] Pemeriksaan sitemap'
mapfile -t sitemaps < <(find dist -type f \( -name 'sitemap*.xml' -o -name 'sitemap-index.xml' \) -print)
if (( ${#sitemaps[@]} == 0 )); then
  echo 'Tidak ada sitemap: benar bila SITE masih kosong.'
else
  if grep -InE 'example\.com|localhost|<lastmod>' "${sitemaps[@]}"; then
    echo 'Sitemap mengandung domain placeholder atau lastmod yang tidak diizinkan.' >&2
    exit 1
  fi
  echo "Sitemap ditemukan dan lolos pemeriksaan: ${sitemaps[*]}"
fi

echo 'Semua pemeriksaan rilis lulus.'
