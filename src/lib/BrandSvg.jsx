import { normalizeBrandName } from './brandIcons.js'

export function BrandSvg({ name = 'custom' }) {
  const brand = normalizeBrandName(name)
  switch (brand) {
    case 'discord':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8.5 9.6c4.7-2.2 10.3-2.2 15 0 1.7 2.4 2.5 5 2.7 8.1-2 1.6-3.9 2.5-5.7 2.9l-1-1.6c1-.3 1.9-.7 2.7-1.3-3.9 1.8-8.5 1.8-12.4 0 .8.6 1.7 1 2.7 1.3l-1 1.6c-1.8-.4-3.7-1.3-5.7-2.9.2-3.1 1-5.7 2.7-8.1Z"/><circle cx="12.6" cy="15.3" r="1.45"/><circle cx="19.4" cy="15.3" r="1.45"/></svg>
    case 'instagram':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7.5" y="7.5" width="17" height="17" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.2"/><circle cx="16" cy="16" r="4.3" fill="none" stroke="currentColor" strokeWidth="2.1"/><circle cx="21.1" cy="10.9" r="1.35"/></svg>
    case 'roblox':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8.5" y="8.5" width="15" height="15" rx="2.2" transform="rotate(15 16 16)"/><rect x="14" y="14" width="4" height="4" fill="rgba(255,255,255,.95)" transform="rotate(15 16 16)"/></svg>
    case 'spotify':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10.6"/><path d="M10.1 13.1c4.4-1 8.5-.7 12 1" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="2" strokeLinecap="round"/><path d="M11.2 16.7c3.5-.8 6.8-.5 9.7.8" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="1.7" strokeLinecap="round"/><path d="M12.3 20c2.5-.5 4.8-.3 6.9.6" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="1.35" strokeLinecap="round"/></svg>
    case 'appleMusic':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12.8 9.4 23 7.4v11a3.4 3.4 0 1 1-2-3.1v-4.1l-6.3 1.2v8.7a3.5 3.5 0 1 1-1.9-3.1V9.4Z"/></svg>
    case 'youtube':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6.4" y="10" width="19.2" height="12" rx="4.1"/><path d="m14 13.3 5.7 2.7-5.7 2.7v-5.4Z" fill="rgba(255,255,255,.96)"/></svg>
    case 'tiktok':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 7.2c.7 3 2.6 4.7 5.5 5.4v4.2c-2.1-.1-3.8-.8-5.4-2v5.6a6.1 6.1 0 1 1-5.1-6v4.3a2 2 0 1 0 1.5 1.9V7.2H18Z"/></svg>
    case 'x':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 8h4.4l3.6 4.9L21.2 8H25l-6.1 7 6.6 9h-4.4l-4.1-5.6L12.2 24H8.4l6.8-7.8L9 8Zm3.2 2 10 12h1.1l-10-12h-1.1Z"/></svg>
    case 'github':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6.5a9.6 9.6 0 0 0-3 18.7c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-4.8 0-1 .4-1.9 1.1-2.6-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1.8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.6 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.9v2.5c0 .3.2.6.7.5A9.6 9.6 0 0 0 16 6.5Z"/></svg>
    case 'telegram':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25.2 8.2 21.7 24c-.2 1-1 .9-1.6.6l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2l-10.8 6.8-4.7-1.5c-1-.3-1-1 .2-1.4L23.9 7.6c.8-.3 1.6.2 1.3.6Z"/></svg>
    case 'soundcloud':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 21.6H8.9a4.5 4.5 0 0 1 0-9c.8 0 1.5.2 2.1.6A6.9 6.9 0 0 1 24.5 15a3.3 3.3 0 0 1-.7 6.6H12Zm-2-7v5.2m3-7.5v7.5m3-9.3v9.3m3-8.1v8.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>
    case 'twitch':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 7h16v11l-5 5h-4l-3.2 3.2V23H9V7Zm2.6 2.5v10.8h3.9v2.2l2.2-2.2h4.2l2.1-2.1V9.5H11.6Zm4.3 3h2v5h-2v-5Zm5 0h2v5h-2v-5Z"/></svg>
    case 'steam':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6a10 10 0 0 0-9.8 8.1l5.4 2.2a3 3 0 0 1 3.6 2.4l3.8-2.7a3.9 3.9 0 1 1 2 2l-4 2.8a3.1 3.1 0 0 1-6 1.3l-4.2-1.7A10 10 0 1 0 16 6Zm5.9 5.1a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm-9.1 8.1 2 1a1.3 1.3 0 0 0-2.5.6 1.3 1.3 0 0 0 2.5.4c-.1.1-.2.1-.4.1l-1.9-.9.3-1.2Z"/></svg>
    case 'pinterest':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6.8a9.2 9.2 0 0 0-3.3 17.8c-.1-.8-.2-2 .1-2.9l1.1-4.7s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2- .8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.1 0 .8.3 1.7.7 2.2.1.1.1.2.1.3l-.3 1.1c0 .2-.2.3-.4.2-1.3-.6-2.1-2.4-2.1-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.9 0 3.5-2.2 6.3-5.2 6.3-1 0-2-.5-2.3-1.1l-.6 2.3c-.2.9-.8 2-1.2 2.7A9.2 9.2 0 1 0 16 6.8Z"/></svg>
    case 'google':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25.1 16.2c0-.8-.1-1.5-.2-2.1H16v4h5.1c-.5 2.4-2.6 4-5.1 4a6.1 6.1 0 1 1 4.4-10.4l2.9-2.8A10.1 10.1 0 1 0 16 26.1c5.7 0 9.1-3.9 9.1-9.9Z"/></svg>
    case 'email':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 10h18v12H7V10Zm2.2 2 6.8 5 6.8-5H9.2Zm13.8 8v-5.5l-7 5.1-7-5.1V20h14Z"/></svg>
    case 'whatsapp':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6.7A9.1 9.1 0 0 0 8.3 20.6L7 25.3l4.9-1.3A9.1 9.1 0 1 0 16 6.7Zm5.1 13.1c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.2c.3-.3.6-.3.8-.3h.6c.2 0 .5-.1.7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4.1.1.1.6-.1 1.2Z"/></svg>
    case 'facebook':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 26V17.5h2.8l.5-3.5H18v-2.2c0-1 .3-1.7 1.8-1.7h1.7V7.1c-.3 0-1.5-.1-2.6-.1-2.7 0-4.5 1.6-4.5 4.6V14h-3v3.5h3V26H18Z"/></svg>
    case 'snapchat':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6.7c-3 0-5.2 2.2-5.2 5.4v2.4c0 .4-.2.7-.6.8l-1 .4c-.6.2-.6 1.1 0 1.4 1.2.6 1.8 1.2 2.2 2.1.3.7-.2 1.4-1 1.6-.5.1-.6.8-.1 1.1 1.2.6 2.2.5 3.1.8.8.2 1.2 1.3 2.6 1.3s1.8-1.1 2.6-1.3c.9-.3 1.9-.2 3.1-.8.5-.3.4-1-.1-1.1-.8-.2-1.3-.9-1-1.6.4-.9 1-1.5 2.2-2.1.6-.3.6-1.2 0-1.4l-1-.4c-.4-.1-.6-.4-.6-.8v-2.4c0-3.2-2.2-5.4-5.2-5.4Z"/></svg>
    case 'reddit':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M23.3 14.6c.6.5.9 1.2.9 2 0 3-3.7 5.4-8.2 5.4s-8.2-2.4-8.2-5.4c0-.8.3-1.5.9-2a2.1 2.1 0 1 1 3-2.6c1.1-.5 2.5-.8 3.9-.9l.8-3.8 3.6.8a1.7 1.7 0 1 1-.3 1.3l-2.3-.5-.5 2.2c1.3.1 2.5.4 3.5.9a2.1 2.1 0 1 1 3 2.6ZM13 16.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm6 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm-5.6 2.2c1.5 1 3.7 1 5.2 0 .4-.3 0-.9-.4-.6-1.2.7-3.2.7-4.4 0-.4-.3-.8.3-.4.6Z"/></svg>
    case 'linkedin':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 13h4v12H9V13Zm2-5.8a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM15.2 13H19v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V25h-4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V25h-4V13Z"/></svg>
    case 'paypal':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11.4 7h7.1c3 0 5 1.6 4.5 4.8-.6 3.7-3 5.6-6.2 5.6h-2l-.9 5.6h-3.7L11.4 7Zm4.1 3.2-.6 3.9h1.5c1.4 0 2.6-.5 2.9-2 .2-1.3-.6-1.9-2-1.9h-1.8Zm-1.6 8h4.1c2.5 0 4.2-1.1 5.2-3.1.2 3.6-2.3 6.2-6.1 6.2h-1.5l-.7 4.7h-3.7l2.7-7.8Z"/></svg>
    case 'dana':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="9" width="20" height="14" rx="7"/><path d="M11 16h10" stroke="rgba(255,255,255,.95)" strokeWidth="2.2" strokeLinecap="round"/><path d="M18.2 12.8 21.4 16l-3.2 3.2" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'gopay':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10"/><path d="M12 16a4 4 0 1 1 4 4h-3" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="2.2" strokeLinecap="round"/><path d="M18.7 12.8h3.2v3.2" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="1.7" strokeLinecap="round"/></svg>
    case 'ovo':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6c5.5 0 10 4.2 10 9.4 0 6.2-6 10.6-10 10.6S6 21.6 6 15.4C6 10.2 10.5 6 16 6Zm0 5.4a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Z"/></svg>
    case 'shopeepay':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 11h12l1.2 13H8.8L10 11Zm3-1a3 3 0 0 1 6 0v1h-2v-1a1 1 0 0 0-2 0v1h-2v-1Z"/><path d="M13 17c.8 1.1 5.2 1.1 6 0M13 20c.8 1.1 5.2 1.1 6 0" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="1.6" strokeLinecap="round"/></svg>
    case 'qris':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 7h8v8H7V7Zm10 0h8v8h-8V7ZM7 17h8v8H7v-8Zm3-7v2h2v-2h-2Zm10 0v2h2v-2h-2Zm-10 10v2h2v-2h-2Zm8-2h2v2h-2v-2Zm4 0h3v2h-3v-2Zm-4 4h3v3h-3v-3Zm5 1h2v2h-2v-2Z"/></svg>
    case 'bank':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 7 6.5 12v2h19v-2L16 7Zm-7 9h3v7H9v-7Zm5 0h3v7h-3v-7Zm5 0h3v7h-3v-7ZM7 24h18v2H7v-2Z"/></svg>
    case 'website':
      return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M7.5 16h17M16 7c2.3 2.4 3.5 5.4 3.5 9S18.3 22.6 16 25c-2.3-2.4-3.5-5.4-3.5-9S13.7 9.4 16 7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    default:
      return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13.8 9.6h8.6v8.6h-2.5v-4.3l-8.1 8.1-1.8-1.8 8.1-8.1h-4.3V9.6Z"/><path d="M8 8h8v2.3h-5.7v11.4h11.4V16H24v8H8V8Z"/></svg>
  }
}
