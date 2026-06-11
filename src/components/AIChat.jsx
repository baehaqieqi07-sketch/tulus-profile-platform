import { useEffect, useMemo, useRef, useState } from 'react';
import { aiGreeting, aiModes, aiQuickReplies } from '../data/aiKnowledge.js';
import { generateAIResponse } from '../utils/aiEngine.js';

export default function AIChat({ lang = 'id', profile, articleId, onRecord }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('design');
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const greeting = aiGreeting[lang] || aiGreeting.id;
  const quick = aiQuickReplies[lang] || aiQuickReplies.id;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 'hello', role: 'ai', text: greeting, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }
  }, [open, greeting, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  const title = useMemo(() => lang === 'en' ? 'Ask Bekiw' : 'Tanya Bekiw', [lang]);

  const send = (text = input) => {
    const clean = String(text || '').trim();
    if (!clean) return;
    setInput('');
    const userMsg = { id: crypto.randomUUID(), role: 'user', text: clean, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((old) => [...old, userMsg]);
    setTyping(true);
    onRecord?.('ai_chat', { mode, text: clean.slice(0, 80) });
    const delay = Math.min(1400, Math.max(520, clean.length * 18));
    window.setTimeout(() => {
      const reply = generateAIResponse({ message: clean, lang, mode, profile, articleId });
      setTyping(false);
      setMessages((old) => [...old, { id: crypto.randomUUID(), role: 'ai', text: reply, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, delay);
  };

  return (
    <>
      <button className="ai-float" type="button" onClick={() => setOpen(true)} aria-label={title}>
        <span>✉</span><b>{title}</b>
      </button>
      {open && <section className="ai-panel" aria-label="AI Bekiw chat">
        <header>
          <div><b>Bekiw</b><span>{lang === 'en' ? 'AI assistant for TULUS' : 'AI assistant untuk TULUS'}</span></div>
          <button type="button" onClick={() => setOpen(false)}>×</button>
        </header>
        <div className="ai-modes">
          {aiModes.map((item) => <button key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => setMode(item.id)} type="button">{item.label[lang] || item.label.id}</button>)}
        </div>
        <div className="ai-messages">
          {messages.map((msg) => <div key={msg.id} className={`bubble ${msg.role}`}><p>{msg.text}</p><time>{msg.at}</time></div>)}
          {typing && <div className="bubble ai typing"><span /><span /><span /><em>{lang === 'en' ? 'Bekiw is helping…' : 'Bekiw sedang bantu…'}</em></div>}
          <div ref={bottomRef} />
        </div>
        <div className="quick-replies">{quick.map((item) => <button key={item} type="button" onClick={() => send(item)}>{item}</button>)}</div>
        <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === 'en' ? 'Type a question…' : 'Ketik pertanyaan…'} />
          <button type="submit">↗</button>
        </form>
      </section>}
    </>
  );
}
