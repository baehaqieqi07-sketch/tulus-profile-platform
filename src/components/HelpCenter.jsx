import { useMemo, useState } from 'react';
import { helpArticles, helpCategories } from '../data/helpArticles.js';

export default function HelpCenter({ lang = 'id', onAskBekiw }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(helpCategories[0]);
  const [active, setActive] = useState(helpArticles[0]?.id);
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return helpArticles.filter((article) => {
      const text = [article.category, article.title.id, article.title.en, article.summary.id, article.summary.en].join(' ').toLowerCase();
      return (!q || text.includes(q)) && (!category || article.category === category);
    });
  }, [query, category]);
  const selected = helpArticles.find((item) => item.id === active) || filtered[0] || helpArticles[0];
  const steps = selected?.steps?.[lang] || selected?.steps?.id || [];

  return (
    <section className="help-layout">
      <aside className="help-sidebar">
        <label className="search-label"><span>{lang === 'en' ? 'Search Help' : 'Cari Bantuan'}</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === 'en' ? 'Search article…' : 'Cari artikel…'} /></label>
        <div className="category-list">{helpCategories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => { setCategory(item); setActive(helpArticles.find((a) => a.category === item)?.id); }}>{item}</button>)}</div>
      </aside>
      <main className="help-content">
        <div className="breadcrumb">TULUS / Help Center / {selected?.category}</div>
        {filtered.length === 0 ? <div className="empty-state"><b>{lang === 'en' ? 'No article found.' : 'Artikel tidak ditemukan.'}</b><span>{lang === 'en' ? 'Try another keyword or ask Bekiw.' : 'Coba kata lain atau tanya Bekiw.'}</span></div> : (
          <>
            <div className="article-list">{filtered.map((article) => <button key={article.id} className={active === article.id ? 'active' : ''} type="button" onClick={() => setActive(article.id)}><span>{article.icon}</span><b>{article.title[lang] || article.title.id}</b><em>{article.summary[lang] || article.summary.id}</em></button>)}</div>
            <article className="help-article glass-panel">
              <p className="eyebrow">{selected.icon} {selected.category}</p>
              <h2>{selected.title[lang] || selected.title.id}</h2>
              <p>{selected.summary[lang] || selected.summary.id}</p>
              <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <div className="article-actions">
                <button type="button" className="primary-btn" onClick={() => onAskBekiw?.(selected)}>{lang === 'en' ? 'Ask Bekiw about this' : 'Tanya Bekiw tentang ini'}</button>
                <button type="button" className="ghost-btn" onClick={() => navigator.clipboard?.writeText(steps.join('\n'))}>{lang === 'en' ? 'Copy Steps' : 'Copy Steps'}</button>
              </div>
            </article>
          </>
        )}
      </main>
    </section>
  );
}
