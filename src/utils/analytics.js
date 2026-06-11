export function recordEvent(analytics, type, payload = {}) {
  const event = { id: crypto.randomUUID(), type, payload, at: new Date().toISOString() };
  const next = {
    ...analytics,
    views: type === 'profile_view' ? (analytics.views || 0) + 1 : analytics.views,
    clicks: type === 'link_click' ? (analytics.clicks || 0) + 1 : analytics.clicks,
    aiChats: type === 'ai_chat' ? (analytics.aiChats || 0) + 1 : analytics.aiChats,
    events: [event, ...(analytics.events || [])].slice(0, 200)
  };
  return next;
}

export function toCsv(rows) {
  const safe = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const head = ['type', 'at', 'payload'];
  const body = rows.map((row) => [row.type, row.at, JSON.stringify(row.payload || {})].map(safe).join(','));
  return [head.join(','), ...body].join('\n');
}

export function downloadText(name, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
