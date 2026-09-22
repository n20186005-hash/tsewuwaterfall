// Nama situs terpadu untuk SEO: "Nama objek + Kota + Panduan Wisata".
// Satu-satunya sumber kebenaran untuk title beranda, akhiran title subhalaman,
// dan og:site_name agar konsisten di seluruh halaman.
export const SITE_NAME = 'Air Terjun Tumpak Sewu Lumajang — Panduan Wisata';

// Akhiran ' | ' + SITE_NAME untuk subhalaman (Kebijakan Privasi, Syarat, dll).
export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}
