import Logo from '../components/Logo.jsx';
import HelpCenter from '../components/HelpCenter.jsx';

export default function HelpCenterPage({ lang, setLang, navigate, onAskBekiw }) {
  return (
    <main className="site-page help-page">
      <nav className="site-nav"><button onClick={() => navigate('/')} type="button"><Logo /></button><div><button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} type="button">{lang === 'id' ? 'English' : 'Indonesia'}</button><button className="primary-btn" onClick={() => navigate('/dashboard?tab=help')} type="button">Dashboard Help</button></div></nav>
      <section className="page-hero"><p className="eyebrow">Help Center</p><h1>{lang === 'en' ? 'Find clean, practical TULUS guides.' : 'Cari panduan TULUS yang rapi dan praktis.'}</h1><p>{lang === 'en' ? 'Search articles, copy steps, or ask Bekiw from any guide.' : 'Cari artikel, copy langkah, atau tanya Bekiw dari artikel mana pun.'}</p></section>
      <HelpCenter lang={lang} onAskBekiw={onAskBekiw} />
    </main>
  );
}
