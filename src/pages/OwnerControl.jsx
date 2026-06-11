import { useState } from 'react';
import Logo from '../components/Logo.jsx';
import FileUploader from '../components/FileUploader.jsx';

const ownerTabs = ['Overview', 'Users', 'Premium Requests', 'Feature Flags', 'Site Settings', 'Reports', 'Analytics', 'Storage', 'Help Articles', 'AI Knowledge', 'Brand', 'Templates', 'Payment Methods'];

export default function OwnerControl({ lang, profile, setProfile, payments, setPayments, analytics, assets, navigate, addNotification }) {
  const [active, setActive] = useState('Overview');
  const [maintenance, setMaintenance] = useState(false);
  const [banner, setBanner] = useState('');
  const decide = (id, status) => {
    const next = payments.map((payment) => payment.id === id ? { ...payment, status, ownerNote: status === 'approved' ? 'Approved by owner.' : 'Rejected. Please upload clearer proof.' } : payment);
    setPayments(next);
    if (status === 'approved') {
      setProfile({ ...profile, plan: 'pro', verified: true, draft: false });
      addNotification?.('Payment approved', 'Premium visual badge aktif setelah owner approve.');
    } else addNotification?.('Payment rejected', 'Owner memberi catatan pada payment history.');
  };
  return (
    <main className="owner-page">
      <aside className="owner-sidebar"><button type="button" onClick={() => navigate('/')}><Logo /></button><p>Hidden owner/control route. Pasang auth beneran sebelum production.</p>{ownerTabs.map((tab) => <button key={tab} type="button" className={active === tab ? 'active' : ''} onClick={() => setActive(tab)}>{tab}</button>)}</aside>
      <section className="owner-main"><div className="section-title"><p className="eyebrow">/tulus-control</p><h1>{active}</h1><span>Owner guard skeleton, tidak ditampilkan di navbar publik.</span></div>
        {active === 'Overview' && <div className="overview-grid"><article className="metric-card"><span>Users demo</span><strong>1</strong></article><article className="metric-card"><span>Premium pending</span><strong>{payments.filter((p) => p.status === 'pending').length}</strong></article><article className="metric-card"><span>Storage assets</span><strong>{assets.length}</strong></article><article className="metric-card"><span>Views</span><strong>{analytics.views}</strong></article></div>}
        {active === 'Premium Requests' && <div className="glass-panel owner-table"><h3>Payment proof review</h3>{payments.length === 0 ? <p>Belum ada request.</p> : payments.map((p) => <div className="owner-row" key={p.id}><div><b>@{p.user}</b><span>{p.plan} • {p.amount} • {p.status}</span>{p.ownerNote && <em>{p.ownerNote}</em>}</div><div><button className="primary-btn" type="button" onClick={() => decide(p.id, 'approved')}>Approve</button><button className="ghost-btn" type="button" onClick={() => decide(p.id, 'rejected')}>Reject</button></div></div>)}</div>}
        {active === 'Feature Flags' && <div className="settings-grid"><label className="switch"><input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} /> Maintenance mode</label><label className="switch"><input type="checkbox" defaultChecked /> AI Bekiw enabled</label><label className="switch"><input type="checkbox" defaultChecked /> Premium manual approval</label><label className="switch"><input type="checkbox" defaultChecked /> Mini games cosmetic</label></div>}
        {active === 'Site Settings' && <div className="glass-panel form-grid"><label className="field"><span>Announcement banner</span><textarea value={banner} onChange={(e) => setBanner(e.target.value)} placeholder="Tulis pengumuman singkat." /></label><button className="primary-btn" type="button" onClick={() => addNotification?.('Announcement saved', banner || 'Banner updated')}>Save banner</button></div>}
        {active === 'Storage' && <div className="glass-panel"><h3>Storage usage</h3><p>{assets.length} assets saved in local demo. Production pakai Supabase Storage policies.</p><FileUploader label="Upload logo/brand placeholder" kind="image" onFiles={() => addNotification?.('Brand asset', 'Logo/brand setting skeleton updated.')} /></div>}
        {active !== 'Overview' && active !== 'Premium Requests' && active !== 'Feature Flags' && active !== 'Site Settings' && active !== 'Storage' && <div className="glass-panel skeleton-admin"><h3>{active} manager skeleton</h3><p>Panel ini disiapkan untuk production: auth guard, Supabase admin query, pagination, search, audit log, dan permission owner.</p><button className="ghost-btn" type="button">Export data</button></div>}
      </section>
    </main>
  );
}
