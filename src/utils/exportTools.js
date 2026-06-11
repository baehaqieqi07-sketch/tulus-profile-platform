import { appCatalog } from '../data/apps.js';
import { helpArticles } from '../data/helpArticles.js';
import { templates, layouts } from '../data/templates.js';

export function makeFeatureMap(profile) {
  return {
    brand: 'TULUS',
    stack: 'React + Vite + Supabase skeleton',
    routes: ['/', '/dashboard', '/help', '/tulus-control', '/:username'],
    lockedDirection: 'Continue TULUS premium profile platform. Do not regenerate from zero.',
    profileFields: Object.keys(profile || {}),
    templates: templates.map((t) => t.name),
    layouts: layouts.map((l) => l.name),
    apps: appCatalog.map((app) => app.type),
    helpArticles: helpArticles.map((a) => a.id),
    safeUpdateParts: ['Part 1 UI', 'Part 2 Backend', 'Part 3 Supabase', 'Part 4 Docs', 'Part 5 Final ZIP']
  };
}

export function compactUpdatePrompt() {
  return `Lanjutkan project TULUS yang sudah ada. Jangan mulai ulang, jangan ganti arah, jangan hapus fitur lama, jangan tampilkan versi internal. Pertahankan React + Vite, Supabase skeleton, /:username, /tulus-control, dashboard, live preview, upload via file picker, AI Bekiw, Help Center, Premium Center, Analytics, Mini Games cosmetic, Safe Update Guard. Pecah update besar bila perlu: UI, Backend, Supabase, Docs, Final ZIP. Jalankan npm run check dan npm run build sebelum ZIP.`;
}

export function projectChecklist() {
  return ['Backup project', 'Read PROJECT_MAP.md', 'Read UPDATE_LOCKS.md', 'Do not regenerate from zero', 'Keep routes working', 'Run npm install', 'Run npm run check', 'Run npm run build', 'Pack without node_modules'];
}
