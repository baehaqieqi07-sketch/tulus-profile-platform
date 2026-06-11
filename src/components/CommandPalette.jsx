import { useEffect, useMemo, useState } from 'react';
import { compactUpdatePrompt, makeFeatureMap, projectChecklist } from '../utils/exportTools.js';
import { downloadText } from '../utils/analytics.js';

export default function CommandPalette({ lang = 'id', profile, navigate, openBekiw }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const fn = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);
  const actions = [
    { label: 'Open Profile Builder', keywords: 'profile builder dashboard', run: () => navigate('/dashboard?tab=builder') },
    { label: 'Open Assets Manager', keywords: 'assets upload background avatar music', run: () => navigate('/dashboard?tab=assets') },
    { label: 'Open Premium Center', keywords: 'payment premium invoice', run: () => navigate('/dashboard?tab=premium') },
    { label: 'Open Help Center', keywords: 'help faq docs', run: () => navigate('/help') },
    { label: 'Preview Public Profile', keywords: 'preview public username', run: () => navigate(`/${profile.username || 'bekiw'}`) },
    { label: 'Ask Bekiw', keywords: 'ai bekiw assistant', run: () => openBekiw?.() },
    { label: 'Export Feature Map', keywords: 'safe update export map', run: () => downloadText('tulus-feature-map.json', JSON.stringify(makeFeatureMap(profile), null, 2)) },
    { label: 'Copy Compact Update Prompt', keywords: 'prompt safe update', run: () => navigator.clipboard?.writeText(compactUpdatePrompt()) },
    { label: 'Export Project Checklist', keywords: 'checklist safe backup', run: () => downloadText('tulus-project-checklist.txt', projectChecklist().join('\n')) }
  ];
  const filtered = useMemo(() => actions.filter((a) => `${a.label} ${a.keywords}`.toLowerCase().includes(query.toLowerCase())), [query]);
  if (!open) return null;
  return <div className="palette-overlay" onMouseDown={() => setOpen(false)}><section className="command-palette glass-panel" onMouseDown={(e) => e.stopPropagation()}><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === 'en' ? 'Search actions…' : 'Cari fitur…'} />{filtered.map((action) => <button key={action.label} type="button" onClick={() => { action.run(); setOpen(false); }}>{action.label}</button>)}</section></div>;
}
