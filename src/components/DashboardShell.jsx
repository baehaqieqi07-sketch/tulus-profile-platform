import Logo from './Logo.jsx';
import NotificationCenter from './NotificationCenter.jsx';

export default function DashboardShell({ lang, setLang, route, setRoute, tabs, children, notifications, setNotifications }) {
  return (
    <div className="dashboard-shell">
      <aside className="dash-sidebar">
        <button className="logo-button" type="button" onClick={() => setRoute('/') }><Logo /></button>
        <nav>{tabs.map((tab) => <button key={tab.id} className={route === tab.id ? 'active' : ''} type="button" onClick={() => setRoute(tab.id)}><span>{tab.icon}</span>{tab.label[lang] || tab.label.id}</button>)}</nav>
        <div className="sidebar-note">Preview aman aktif. Edit profile, cek hasilnya, lalu publish kalau sudah rapi.</div>
      </aside>
      <main className="dash-main">
        <header className="dash-topbar">
          <div><b>TULUS Dashboard</b><span>{lang === 'en' ? 'Build, preview, publish.' : 'Atur, preview, lalu publish.'}</span></div>
          <div className="topbar-actions">
            <button type="button" className="ghost-btn" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>{lang === 'id' ? 'English' : 'Indonesia'}</button>
            <NotificationCenter items={notifications} setItems={setNotifications} lang={lang} />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
