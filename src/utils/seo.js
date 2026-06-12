export function applySeo({ title, description, image } = {}) {
  const safeTitle = title || 'TULUS — Premium Profile Platform';
  const safeDescription = description || 'Bangun halaman profil yang terasa hidup.';
  document.title = safeTitle;
  const set = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement(selector.startsWith('meta') ? 'meta' : 'link');
      document.head.appendChild(el);
    }
    if (selector.includes('property')) el.setAttribute('property', selector.match(/"(.+)"/)?.[1] || '');
    if (selector.includes('name')) el.setAttribute('name', selector.match(/"(.+)"/)?.[1] || '');
    el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', safeDescription);
  set('meta[property="og:title"]', 'content', safeTitle);
  set('meta[property="og:description"]', 'content', safeDescription);
  if (image) set('meta[property="og:image"]', 'content', image);
}
