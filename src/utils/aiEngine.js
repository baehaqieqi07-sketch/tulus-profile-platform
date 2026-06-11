import { helpArticles } from '../data/helpArticles.js';
import { templates } from '../data/templates.js';
import { tulusKnowledge } from '../data/aiKnowledge.js';

const id = {
  design: 'Saran cepat: pakai Soft Blue ORANG TULUS, background blur 22–28, glow sekitar 35–45, lalu pin satu link utama. Jangan terlalu banyak warna supaya tetap premium.',
  upload: 'Buka Dashboard > Assets, klik tombol upload sesuai kebutuhan, pilih file dari galeri, cek preview, lalu simpan. Untuk demo lokal file tampil lewat preview browser. Di production, sambungkan ke Supabase Storage.',
  premium: 'Premium TULUS aktif setelah owner verifikasi pembayaran. Pilih plan, ikuti instruksi Dana/OVO/GoPay/Bank/QRIS, upload bukti, lalu tunggu status approved di owner panel.',
  error: 'Cek dulu: npm install, npm run check, npm run build, env tidak kosong, file upload sesuai tipe, dan URL harus http/https. Kalau error masih muncul, kirim pesan error lengkap.',
  publish: 'Alurnya: cek live preview, buka mode mobile/desktop, pastikan username aman, visibility public/unlisted sesuai kebutuhan, lalu klik Publish. Draft mode aman untuk edit sebelum tampil publik.',
  template: 'Untuk style ORANG TULUS, pilih ORANG TULUS Blue atau Blue Aurora. Untuk simple mahal, pilih Premium Minimal. Untuk musik, pilih Music Neon Soft.',
  logo: 'Logo TULUS dibuat simple: mark huruf T, orbit lembut, dan wordmark bersih. Jangan pakai detail kecil atau logo milik web lain.',
  apps: 'Apps & Links bisa untuk Roblox, Apple Music, Spotify, Discord, YouTube, TikTok, Instagram, WhatsApp, Telegram, GitHub, Website, dan Custom App. Pin link yang paling penting.',
  analytics: 'Analytics menunjukkan views, clicks, top app, daily chart, dan export CSV. Angka demo bisa diganti ke data Supabase saat production.',
  safe: 'Untuk update besar, jangan satu prompt terlalu panjang. Export Feature Map, backup, lalu pecah Part 1 UI, Part 2 Backend, Part 3 Supabase, Part 4 Docs, Part 5 Final ZIP.'
};

const en = {
  design: 'Quick design tip: use Soft Blue ORANG TULUS, background blur around 22–28, glow around 35–45, and pin one main link. Keep colors limited for a premium look.',
  upload: 'Open Dashboard > Assets, click the right upload button, choose a file from your device, check preview, then save. In production, connect it to Supabase Storage.',
  premium: 'Premium is activated after owner verification. Pick a plan, follow Dana/OVO/GoPay/Bank/QRIS instructions, upload proof, then wait for owner approval.',
  error: 'Check these first: npm install, npm run check, npm run build, env values, file type, and valid http/https URLs. If it still fails, send the full error message.',
  publish: 'Flow: review live preview, check mobile/desktop, keep username safe, set visibility, then publish. Draft mode is safe before going public.',
  template: 'For ORANG TULUS style, choose ORANG TULUS Blue or Blue Aurora. For clean luxury, choose Premium Minimal. For music, choose Music Neon Soft.',
  logo: 'The TULUS logo stays simple: T mark, soft orbit, clean wordmark. Avoid tiny details and never copy another website logo.',
  apps: 'Apps & Links support Roblox, Apple Music, Spotify, Discord, YouTube, TikTok, Instagram, WhatsApp, Telegram, GitHub, Website, and Custom App. Pin your most important link.',
  analytics: 'Analytics shows views, clicks, top app, daily chart, and CSV export. Demo numbers can be connected to Supabase in production.',
  safe: 'For huge updates, do not send one oversized prompt. Export Feature Map, backup, then split into UI, Backend, Supabase, Docs, and Final ZIP.'
};

function findArticle(text) {
  const q = text.toLowerCase();
  return helpArticles.find((a) => [a.id, a.category, a.title.id, a.title.en, a.summary.id, a.summary.en].join(' ').toLowerCase().includes(q));
}

export function generateAIResponse({ message, lang = 'id', mode = 'design', profile, articleId }) {
  const text = String(message || '').toLowerCase();
  const dict = lang === 'en' ? en : id;
  const article = articleId ? helpArticles.find((a) => a.id === articleId) : findArticle(text);
  if (/background|avatar|upload|galeri|gallery|music|musik|cursor|asset/.test(text)) return dict.upload;
  if (/bayar|payment|premium|qris|dana|ovo|gopay|bank|approve|invoice/.test(text)) return dict.premium;
  if (/publish|public|preview|username|draft/.test(text)) return dict.publish;
  if (/template|layout|warna|color|desain|design|jelek|rapi|aesthetic/.test(text)) return `${dict.template}\n\n${dict.design}`;
  if (/error|bug|gagal|build|timeout|request/.test(text)) return /timeout/.test(text) ? dict.safe : dict.error;
  if (/analytics|view|click|statistik|csv/.test(text)) return dict.analytics;
  if (/app|link|roblox|apple|spotify|discord|youtube|tiktok|instagram|whatsapp|telegram|github/.test(text)) return dict.apps;
  if (/logo|brand|favicon/.test(text)) return dict.logo;
  if (article) {
    const steps = article.steps[lang] || article.steps.id;
    return `${article.summary[lang] || article.summary.id}\n\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  }
  const current = templates.find((t) => t.id === profile?.templateId)?.name || profile?.layout || 'ORANG TULUS Blue';
  const knowledgeHint = tulusKnowledge[Math.floor(Math.random() * tulusKnowledge.length)];
  return lang === 'en'
    ? `I can help with that. Your current style is ${current}. Start with one clear goal, then use preview before publishing. Related TULUS feature: ${knowledgeHint}`
    : `Bisa. Style kamu sekarang ${current}. Mulai dari satu tujuan dulu, lalu cek preview sebelum publish. Fitur TULUS yang nyambung: ${knowledgeHint}`;
}
