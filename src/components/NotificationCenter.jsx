import { useState } from 'react';

export default function NotificationCenter({ items = [], setItems, lang = 'id' }) {
  const [open, setOpen] = useState(false);
  const unread = items.filter((item) => !item.read).length;
  const markRead = (id) => setItems(items.map((item) => item.id === id ? { ...item, read: true } : item));
  return (
    <div className="notif-wrap">
      <button className="notif-button" type="button" onClick={() => setOpen(!open)}>◔ {unread > 0 && <span>{unread}</span>}</button>
      {open && <div className="notif-panel glass-panel">
        <header><b>{lang === 'en' ? 'Notifications' : 'Notifikasi'}</b><button type="button" onClick={() => setItems([])}>{lang === 'en' ? 'Clear' : 'Bersihkan'}</button></header>
        {items.length === 0 ? <p className="empty-mini">{lang === 'en' ? 'No notifications yet.' : 'Belum ada notifikasi.'}</p> : items.map((item) => <button key={item.id} type="button" className={item.read ? '' : 'unread'} onClick={() => markRead(item.id)}><b>{item.title}</b><span>{item.message}</span><em>{item.time}</em></button>)}
      </div>}
    </div>
  );
}
