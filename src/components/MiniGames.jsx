import { useState } from 'react';

const rewards = ['Soft Frame', 'Blue Dust', 'Tiny Spark', 'Creator Title', 'Calm Badge', 'Aurora Border'];

export default function MiniGames({ lang = 'id', game, setGame, notify }) {
  const [cards, setCards] = useState(['T', 'U', 'L', 'U', 'S', 'T'].sort(() => Math.random() - .5));
  const [picked, setPicked] = useState([]);
  const addReward = (reward) => {
    setGame({ ...game, xp: (game.xp || 0) + 25, badges: Array.from(new Set([...(game.badges || []), reward])) });
    notify?.(lang === 'en' ? 'Cosmetic unlocked' : 'Cosmetic terbuka', reward);
  };
  return (
    <div className="mini-games-grid">
      <section className="game-card glass-panel"><p className="eyebrow">Memory Card</p><h3>{lang === 'en' ? 'Match soft cards' : 'Cocokkan kartu soft'}</h3><div className="memory-grid">{cards.map((card, index) => <button type="button" key={`${card}-${index}`} onClick={() => { const next = [...picked, index]; setPicked(next); if (next.length >= 2) { addReward('Memory Glow'); setPicked([]); setCards(cards.sort(() => Math.random() - .5)); } }}>{picked.includes(index) ? card : '✦'}</button>)}</div></section>
      <section className="game-card glass-panel"><p className="eyebrow">Click Combo</p><h3>{lang === 'en' ? 'Build profile XP' : 'Tambah Profile XP'}</h3><strong>{game.combo || 0} combo</strong><button className="primary-btn full" type="button" onClick={() => setGame({ ...game, combo: (game.combo || 0) + 1, xp: (game.xp || 0) + 3 })}>Tap</button></section>
      <section className="game-card glass-panel"><p className="eyebrow">Daily Spin</p><h3>{lang === 'en' ? 'Cosmetic only reward' : 'Reward cosmetic saja'}</h3><button className="primary-btn full" type="button" onClick={() => addReward(rewards[Math.floor(Math.random() * rewards.length)])}>Spin</button><small>{lang === 'en' ? 'No real money. No cashout.' : 'Bukan uang asli. Tidak ada cashout.'}</small></section>
      <section className="game-card glass-panel"><p className="eyebrow">Badge Collector</p><h3>Profile XP: {game.xp || 0}</h3><div className="profile-badges">{(game.badges || []).map((badge) => <span key={badge}>{badge}</span>)}</div></section>
    </div>
  );
}
