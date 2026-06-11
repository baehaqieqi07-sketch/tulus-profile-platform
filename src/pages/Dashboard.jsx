import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import FileUploader from '../components/FileUploader.jsx';
import HelpCenter from '../components/HelpCenter.jsx';
import MiniGames from '../components/MiniGames.jsx';
import ProfilePreview from '../components/ProfilePreview.jsx';
import { appCatalog, appCategories } from '../data/apps.js';
import { plans, paymentMethods } from '../data/plans.js';
import { buttonStyles, fontStyles, layouts, particleEffects, templates } from '../data/templates.js';
import { downloadText, toCsv } from '../utils/analytics.js';
import { compactUpdatePrompt, makeFeatureMap, projectChecklist } from '../utils/exportTools.js';
import { clamp, profileHealth, safeUsername, validateUrl } from '../utils/validation.js';

const tabs = [
  { id: 'overview', icon: '⌂', label: { id: 'Overview', en: 'Overview' } },
  { id: 'builder', icon: '◈', label: { id: 'Profile Builder', en: 'Profile Builder' } },
  { id: 'preview', icon: '◐', label: { id: 'Live Preview', en: 'Live Preview' } },
  { id: 'templates', icon: '✦', label: { id: 'Templates', en: 'Templates' } },
  { id: 'theme', icon: '◌', label: { id: 'Theme Studio', en: 'Theme Studio' } },
  { id: 'assets', icon: '▣', label: { id: 'Assets', en: 'Assets' } },
  { id: 'apps', icon: '⌁', label: { id: 'Apps & Links', en: 'Apps & Links' } },
  { id: 'premium', icon: '◆', label: { id: 'Premium', en: 'Premium' } },
  { id: 'analytics', icon: '⌬', label: { id: 'Analytics', en: 'Analytics' } },
  { id: 'games', icon: '◇', label: { id: 'Mini Games', en: 'Mini Games' } },
  { id: 'help', icon: '?', label: { id: 'Help Center', en: 'Help Center' } },
  { id: 'safe', icon: '☑', label: { id: 'Safe Update', en: 'Safe Update' } }
];

function SectionTitle({ eyebrow, title, subtitle }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{subtitle && <span>{subtitle}</span>}</div>;
}

function Field({ label, children, hint }) {
  return <label className="field"><span>{label}</span>{children}{hint && <em>{hint}</em>}</label>;
}

function newAsset(file, type) {
  return { id: crypto.randomUUID(), name: file.name, type, size: file.size, url: URL.createObjectURL(file), favorite: false, createdAt: new Date().toISOString() };
}

export default function Dashboard(props) {
  const { lang, setLang, profile, setProfile, navigate, assets, setAssets, payments, setPayments, game, setGame, analytics, setAnalytics, notifications, setNotifications, addNotification } = props;
  const initial = new URLSearchParams(window.location.search).get('tab') || 'overview';
  const [active, setActive] = useState(tabs.some((tab) => tab.id === initial) ? initial : 'overview');
  const [previewMode, setPreviewMode] = useState('mobile');
  const [assetFilter, setAssetFilter] = useState('All');
  const [assetQuery, setAssetQuery] = useState('');
  const health = profileHealth(profile);
  const update = (patch) => setProfile((current) => ({ ...current, ...patch }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && tabs.some((item) => item.id === tab)) setActive(tab);
  }, []);

  const notify = (title, message) => addNotification?.(title, message);
  const addAssets = (files, type, field) => {
    const created = files.map((file) => newAsset(file, type));
    setAssets([...created, ...assets]);
    if (field && created[0]) update({ [field]: created[0].url });
    if (type === 'gallery') update({ gallery: [...(profile.gallery || []), ...created] });
    notify(lang === 'en' ? 'Asset uploaded' : 'Asset diupload', created.map((a) => a.name).join(', '));
  };
  const applyTemplate = (template) => {
    update({ templateId: template.id, layout: template.layout, accent: template.accent, palette: template.palette, glow: template.glow, blur: template.blur, particle: template.particle });
    notify('Template', `${template.name} applied`);
  };
  const addApp = (type = 'Custom App') => {
    const base = appCatalog.find((a) => a.type === type) || appCatalog.at(-1);
    update({ apps: [...(profile.apps || []), { id: crypto.randomUUID(), type: base.type, title: base.type, username: '', url: '', icon: base.icon, category: base.category, visible: true, highlighted: false, pinned: false, clicks: 0, accent: base.color }] });
  };
  const updateApp = (id, patch) => update({ apps: (profile.apps || []).map((app) => app.id === id ? { ...app, ...patch } : app) });
  const removeApp = (id) => update({ apps: (profile.apps || []).filter((app) => app.id !== id) });
  const moveApp = (id, dir) => {
    const list = [...(profile.apps || [])];
    const index = list.findIndex((app) => app.id === id);
    const next = index + dir;
    if (index < 0 || next < 0 || next >= list.length) return;
    [list[index], list[next]] = [list[next], list[index]];
    update({ apps: list });
  };
  const submitPayment = (plan) => {
    const next = [{ id: crypto.randomUUID(), user: profile.username, plan: plan.id, amount: plan.price, method: 'manual', status: 'pending', proof: '', note: '', createdAt: new Date().toISOString() }, ...payments];
    setPayments(next);
    notify(lang === 'en' ? 'Payment pending' : 'Pembayaran pending', `${plan.name} menunggu verifikasi owner.`);
  };
  const filteredAssets = assets.filter((asset) => (assetFilter === 'All' || asset.type === assetFilter) && asset.name.toLowerCase().includes(assetQuery.toLowerCase()));
  const topApp = (profile.apps || []).slice().sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0];

  return (
    <DashboardShell lang={lang} setLang={setLang} route={active} setRoute={setActive} tabs={tabs} notifications={notifications} setNotifications={setNotifications}>
      <div className="dashboard-content">
        {active === 'overview' && <section className="dash-section"><SectionTitle eyebrow="Command Center" title={lang === 'en' ? 'Premium profile dashboard' : 'Dashboard profile premium'} subtitle={lang === 'en' ? 'Everything stays connected: builder, preview, assets, apps, payment, help, and Safe Update.' : 'Semua nyambung: builder, preview, assets, apps, payment, help, dan Safe Update.'} /><div className="overview-grid"><article className="glass-panel score-card"><b>Profile Health</b><strong>{health.score}%</strong><div className="meter"><span style={{ width: `${health.score}%` }} /></div>{health.notes.slice(0, 3).map((note) => <p key={note}>• {note}</p>)}</article><article className="glass-panel"><b>Draft Mode</b><p>{profile.draft ? 'Profile masih draft. Preview dulu sebelum publish.' : 'Profile sudah publish.'}</p><button className="primary-btn full" onClick={() => update({ draft: !profile.draft })} type="button">{profile.draft ? 'Publish profile' : 'Back to draft'}</button></article><article className="glass-panel"><b>Quick Preview</b><p>@{profile.username}</p><button className="ghost-btn full" onClick={() => navigate(`/${profile.username || 'bekiw'}`)} type="button">Open public route</button></article><article className="glass-panel"><b>AI Proactive Tips</b><p>{health.notes[0] || 'Profile sudah terlihat rapi. Coba polish apps highlight dan SEO preview.'}</p><button className="ghost-btn full" onClick={() => setActive('help')} type="button">Open Help Center</button></article></div></section>}

        {active === 'builder' && <section className="dash-section two-column"><div><SectionTitle eyebrow="Profile Builder" title="Atur identitas profile" subtitle="Safe preview sebelum publish, tidak perlu refresh halaman." /><div className="form-grid"><Field label="Username"><input value={profile.username} onChange={(e) => update({ username: safeUsername(e.target.value) })} /></Field><Field label="Display name"><input value={profile.displayName} onChange={(e) => update({ displayName: e.target.value })} /></Field><Field label="Bio"><textarea value={profile.bio} onChange={(e) => update({ bio: e.target.value.slice(0, 220) })} /></Field><Field label="Status badge"><input value={profile.status} onChange={(e) => update({ status: e.target.value })} /></Field><Field label="Visibility"><select value={profile.visibility} onChange={(e) => update({ visibility: e.target.value })}><option>public</option><option>private</option><option>unlisted</option></select></Field><Field label="Featured project title"><input value={profile.featured?.title || ''} onChange={(e) => update({ featured: { ...profile.featured, title: e.target.value } })} /></Field><Field label="Featured project description"><textarea value={profile.featured?.description || ''} onChange={(e) => update({ featured: { ...profile.featured, description: e.target.value } })} /></Field><label className="switch"><input type="checkbox" checked={profile.verified} onChange={(e) => update({ verified: e.target.checked })} /> Premium/admin visual badge</label><label className="switch"><input type="checkbox" checked={profile.autoplayMusic} onChange={(e) => update({ autoplayMusic: e.target.checked })} /> Music autoplay after click-to-enter</label></div></div><aside className="sticky-preview"><ProfilePreview profile={profile} entered mode={previewMode} /></aside></section>}

        {active === 'preview' && <section className="dash-section"><SectionTitle eyebrow="Live Preview Engine" title="Preview langsung berubah" subtitle="Mode mobile, desktop, click-to-enter, music, apps, badge, gallery, dan particles." /><div className="preview-toolbar"><button className={previewMode === 'mobile' ? 'active' : ''} onClick={() => setPreviewMode('mobile')} type="button">Mobile</button><button className={previewMode === 'desktop' ? 'active' : ''} onClick={() => setPreviewMode('desktop')} type="button">Desktop</button><button onClick={() => update({ reducedMotion: !profile.reducedMotion })} type="button">{profile.reducedMotion ? 'Motion off' : 'Motion on'}</button></div><div className="preview-stage"><ProfilePreview profile={profile} entered mode={previewMode} /></div></section>}

        {active === 'templates' && <section className="dash-section"><SectionTitle eyebrow="Template System" title="Pilih template tanpa merusak data" subtitle="Setiap layout beda visual, bukan cuma ganti warna." /><div className="template-grid">{templates.map((template) => <article className={`template-card ${profile.templateId === template.id ? 'active' : ''}`} key={template.id} style={{ '--template-accent': template.accent }}><b>{template.name}</b><span>{template.layout}</span><p>{template.mood}</p><button className="glass-btn full" type="button" onClick={() => applyTemplate(template)}>Apply</button></article>)}</div><div className="layout-list">{layouts.map((layout) => <button key={layout.name} type="button" className={profile.layout === layout.name ? 'active' : ''} onClick={() => update({ layout: layout.name })}><b>{layout.name}</b><span>{layout.note}</span></button>)}</div></section>}

        {active === 'theme' && <section className="dash-section two-column"><div><SectionTitle eyebrow="Theme Studio" title="Kontrol rasa visual" subtitle="Export/import theme JSON, reset, duplicate, dan reduced motion." /><div className="form-grid"><Field label="Accent color"><input type="color" value={profile.accent} onChange={(e) => update({ accent: e.target.value })} /></Field><Field label="Button style"><select value={profile.buttonStyle} onChange={(e) => update({ buttonStyle: e.target.value })}>{buttonStyles.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Font style"><select value={profile.fontStyle} onChange={(e) => update({ fontStyle: e.target.value })}>{fontStyles.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Particle effect"><select value={profile.particleEffect || 'Soft Bokeh'} onChange={(e) => update({ particleEffect: e.target.value })}>{particleEffects.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Glass blur"><input type="range" min="0" max="40" value={profile.blur} onChange={(e) => update({ blur: clamp(e.target.value, 0, 40) })} /></Field><Field label="Card opacity"><input type="range" min="35" max="100" value={profile.opacity} onChange={(e) => update({ opacity: clamp(e.target.value, 35, 100) })} /></Field><Field label="Border radius"><input type="range" min="8" max="42" value={profile.radius} onChange={(e) => update({ radius: clamp(e.target.value, 8, 42) })} /></Field><Field label="Glow"><input type="range" min="0" max="70" value={profile.glow} onChange={(e) => update({ glow: clamp(e.target.value, 0, 70) })} /></Field><Field label="Motion intensity"><input type="range" min="0" max="100" value={profile.motion} onChange={(e) => update({ motion: clamp(e.target.value, 0, 100) })} /></Field><label className="switch"><input type="checkbox" checked={profile.reducedMotion} onChange={(e) => update({ reducedMotion: e.target.checked })} /> Reduced motion</label></div><div className="button-row"><button className="ghost-btn" type="button" onClick={() => downloadText('tulus-theme.json', JSON.stringify({ accent: profile.accent, palette: profile.palette, blur: profile.blur, glow: profile.glow, radius: profile.radius }, null, 2))}>Export theme JSON</button><button className="ghost-btn" type="button" onClick={() => applyTemplate(templates[0])}>Reset theme</button></div></div><aside className="sticky-preview"><ProfilePreview profile={profile} entered mode="mobile" /></aside></section>}

        {active === 'assets' && <section className="dash-section"><SectionTitle eyebrow="Assets Manager" title="Upload via file picker" subtitle="Avatar, background, gallery, music, icon, cursor. Tidak hardcode storage secret di frontend." /><div className="upload-grid"><FileUploader label="Upload Avatar" kind="image" onFiles={(files) => addAssets(files, 'avatar', 'avatar')} /><FileUploader label="Upload Background" kind="image" onFiles={(files) => addAssets(files, 'background', 'background')} /><FileUploader label="Upload Gallery" kind="image" multiple onFiles={(files) => addAssets(files, 'gallery')} /><FileUploader label="Upload Music" kind="music" accept="audio/*" onFiles={(files) => addAssets(files, 'music', 'music')} /><FileUploader label="Upload Custom Icon" kind="image" onFiles={(files) => addAssets(files, 'icon')} /><FileUploader label="Upload Custom Cursor" kind="cursor" onFiles={(files) => addAssets(files, 'cursor', 'cursor')} /></div><div className="asset-tools"><input value={assetQuery} onChange={(e) => setAssetQuery(e.target.value)} placeholder="Search asset name" /><select value={assetFilter} onChange={(e) => setAssetFilter(e.target.value)}><option>All</option><option>avatar</option><option>background</option><option>gallery</option><option>music</option><option>icon</option><option>cursor</option></select><span>Storage usage demo: {Math.round(assets.reduce((sum, item) => sum + (item.size || 0), 0) / 1024)} KB</span></div><div className="asset-grid">{filteredAssets.length === 0 ? <div className="empty-state"><b>Belum ada asset.</b><span>Upload file dari tombol di atas.</span></div> : filteredAssets.map((asset) => <article className="asset-card" key={asset.id}>{asset.type !== 'music' ? <img src={asset.url} alt={asset.name} /> : <audio src={asset.url} controls />}<b>{asset.name}</b><span>{asset.type}</span><div><button type="button" onClick={() => setAssets(assets.map((a) => a.id === asset.id ? { ...a, favorite: !a.favorite } : a))}>{asset.favorite ? '★' : '☆'}</button><button type="button" onClick={() => navigator.clipboard?.writeText(asset.url)}>Copy URL</button><button type="button" onClick={() => setAssets(assets.filter((a) => a.id !== asset.id))}>Delete</button></div></article>)}</div></section>}

        {active === 'apps' && <section className="dash-section"><SectionTitle eyebrow="Apps & Links" title="Atur apps premium" subtitle="Drag/reorder sederhana, validasi URL, click count, highlight, pinned app." /><div className="add-app-row">{appCatalog.map((item) => <button key={item.type} type="button" onClick={() => addApp(item.type)}>{item.icon} {item.type}</button>)}</div><div className="apps-editor">{(profile.apps || []).map((app) => { const valid = validateUrl(app.url); return <article className="app-editor glass-panel" key={app.id}><div className="app-editor-head"><b>{app.icon} {app.title}</b><span>{app.category} • {app.clicks || 0} clicks</span></div><div className="form-grid"><Field label="Title"><input value={app.title} onChange={(e) => updateApp(app.id, { title: e.target.value })} /></Field><Field label="Username"><input value={app.username} onChange={(e) => updateApp(app.id, { username: e.target.value })} /></Field><Field label="URL"><input value={app.url} onChange={(e) => updateApp(app.id, { url: e.target.value })} placeholder={appCatalog.find((c) => c.type === app.type)?.placeholder} />{!valid.ok && <em className="field-error">Broken link warning: {valid.message}</em>}</Field><Field label="Category"><select value={app.category} onChange={(e) => updateApp(app.id, { category: e.target.value })}>{appCategories.filter((c) => c !== 'All').map((cat) => <option key={cat}>{cat}</option>)}</select></Field><Field label="Accent"><input type="color" value={app.accent || profile.accent} onChange={(e) => updateApp(app.id, { accent: e.target.value })} /></Field></div><div className="button-row"><label className="switch"><input type="checkbox" checked={app.visible !== false} onChange={(e) => updateApp(app.id, { visible: e.target.checked })} /> Visible</label><label className="switch"><input type="checkbox" checked={app.highlighted} onChange={(e) => updateApp(app.id, { highlighted: e.target.checked })} /> Highlight</label><label className="switch"><input type="checkbox" checked={app.pinned} onChange={(e) => updateApp(app.id, { pinned: e.target.checked })} /> Pinned</label><button type="button" onClick={() => moveApp(app.id, -1)}>↑</button><button type="button" onClick={() => moveApp(app.id, 1)}>↓</button><button type="button" onClick={() => removeApp(app.id)}>Remove</button></div></article>; })}</div></section>}

        {active === 'premium' && <section className="dash-section"><SectionTitle eyebrow="Premium Payment Center" title="Manual owner approval" subtitle="Tidak auto-claim. User upload bukti, owner approve/reject di /tulus-control." /><div className="plans-grid">{plans.map((plan) => <article className="plan-card glass-panel" key={plan.id}><em>{plan.badge}</em><h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.caption[lang]}</p><ul>{plan.benefits.map((b) => <li key={b}>{b}</li>)}</ul><button className="primary-btn full" type="button" onClick={() => submitPayment(plan)}>Create invoice</button></article>)}</div><div className="payment-center"><article className="glass-panel"><h3>Payment Methods</h3>{paymentMethods.map((method) => <p key={method.id}><b>{method.name}</b> — {method.note}</p>)}</article><article className="glass-panel"><h3>Upload payment proof</h3><FileUploader label="Upload proof image" kind="image" onFiles={(files) => addAssets(files, 'payment-proof')} /><p>Setelah upload, owner tetap harus review manual.</p></article><article className="glass-panel"><h3>Payment History</h3>{payments.length === 0 ? <p>Belum ada invoice.</p> : payments.map((p) => <div className="history-row" key={p.id}><b>{p.plan}</b><span>{p.amount}</span><em>{p.status}</em></div>)}</article></div></section>}

        {active === 'analytics' && <section className="dash-section"><SectionTitle eyebrow="Analytics" title="Data ringan dan jelas" subtitle="Placeholder siap diganti ke Supabase event table." /><div className="analytics-grid"><article className="metric-card"><span>Profile views</span><strong>{analytics.views}</strong></article><article className="metric-card"><span>Link clicks</span><strong>{analytics.clicks}</strong></article><article className="metric-card"><span>Top app</span><strong>{topApp?.title || '-'}</strong></article><article className="metric-card"><span>AI chats</span><strong>{analytics.aiChats}</strong></article></div><div className="chart-card glass-panel"><h3>Daily views</h3><div className="bar-chart">{(analytics.daily || []).map((value, index) => <span key={index} style={{ height: `${Math.max(10, value)}%` }}><em>{value}</em></span>)}</div><p className="privacy-note">Privacy note: jangan simpan data sensitif visitor tanpa izin.</p><button className="ghost-btn" type="button" onClick={() => downloadText('tulus-analytics.csv', toCsv(analytics.events || []))}>Export CSV</button></div></section>}

        {active === 'games' && <section className="dash-section"><SectionTitle eyebrow="Mini Games Aman" title="Reward cosmetic saja" subtitle="Tidak ada judi uang asli, taruhan, cashout, atau sistem berbahaya." /><MiniGames lang={lang} game={game} setGame={setGame} notify={notify} /></section>}

        {active === 'help' && <section className="dash-section"><SectionTitle eyebrow="Help Center" title="Bantuan di dashboard" subtitle="Cari artikel, copy steps, dan tanya Bekiw." /><HelpCenter lang={lang} onAskBekiw={(article) => notify('Bekiw', `Artikel siap: ${article.title[lang] || article.title.id}`)} /></section>}

        {active === 'safe' && <section className="dash-section"><SectionTitle eyebrow="Safe Export / Update Guard" title="Anti request timeout" subtitle="Web tidak bisa mendeteksi batas internal ChatGPT, jadi guard dibuat dari checklist, export, dan prompt compact." /><div className="safe-grid"><article className="glass-panel warning-card"><h3>Update besar harus dipecah</h3><p>Kalau update terlalu besar, pecah menjadi Part 1 UI, Part 2 Backend, Part 3 Supabase, Part 4 Docs, Part 5 Final ZIP agar tidak request timeout.</p></article><article className="glass-panel"><h3>Copy Compact Update Prompt</h3><textarea readOnly value={compactUpdatePrompt()} /><button className="primary-btn full" type="button" onClick={() => navigator.clipboard?.writeText(compactUpdatePrompt())}>Copy prompt</button></article><article className="glass-panel"><h3>Export Current Feature Map</h3><button className="ghost-btn full" type="button" onClick={() => downloadText('tulus-feature-map.json', JSON.stringify(makeFeatureMap(profile), null, 2))}>Export map</button></article><article className="glass-panel"><h3>Project Checklist</h3><ul>{projectChecklist().map((item) => <li key={item}>{item}</li>)}</ul><button className="ghost-btn full" type="button" onClick={() => downloadText('tulus-project-checklist.txt', projectChecklist().join('\n'))}>Export checklist</button></article></div></section>}
      </div>
    </DashboardShell>
  );
}
