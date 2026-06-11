export const THEMES = {
  'Pearl Calm': {
    name: 'Pearl Calm',
    free: true,
    background: 'linear-gradient(135deg, #fffaf3 0%, #f8efe6 45%, #fffefe 100%)',
    accent: '#d9a6a1',
    text: '#3e3936',
    muted: '#7d7470',
    card: 'rgba(255,255,255,.58)',
    glow: 'rgba(217,166,161,.36)'
  },
  'Rose Milk': {
    name: 'Rose Milk',
    free: true,
    background: 'linear-gradient(135deg, #fff5f6 0%, #f5dfe6 48%, #fffaf8 100%)',
    accent: '#dfa5b6',
    text: '#4c3f42',
    muted: '#887278',
    card: 'rgba(255,255,255,.55)',
    glow: 'rgba(223,165,182,.35)'
  },
  'Lavender Mist': {
    name: 'Lavender Mist',
    free: true,
    background: 'linear-gradient(135deg, #f8f3ff 0%, #ded5f2 48%, #fffdfb 100%)',
    accent: '#afa0d8',
    text: '#393646',
    muted: '#746f82',
    card: 'rgba(255,255,255,.56)',
    glow: 'rgba(175,160,216,.35)'
  },
  'Blue Silk': {
    name: 'Blue Silk',
    free: true,
    background: 'linear-gradient(135deg, #f7fbff 0%, #ddecf9 52%, #fffefa 100%)',
    accent: '#9ec6e8',
    text: '#293b4d',
    muted: '#607282',
    card: 'rgba(255,255,255,.58)',
    glow: 'rgba(158,198,232,.34)'
  },
  'Sage Cloud': {
    name: 'Sage Cloud',
    free: true,
    background: 'linear-gradient(135deg, #fbfbf2 0%, #dce8dc 48%, #fffaf1 100%)',
    accent: '#b6c8ad',
    text: '#394238',
    muted: '#6f796d',
    card: 'rgba(255,255,255,.56)',
    glow: 'rgba(182,200,173,.35)'
  },
  'Minimal White': {
    name: 'Minimal White',
    free: true,
    background: 'linear-gradient(135deg, #ffffff 0%, #f6f5f1 100%)',
    accent: '#bdb9b0',
    text: '#303030',
    muted: '#767676',
    card: 'rgba(255,255,255,.78)',
    glow: 'rgba(189,185,176,.28)'
  },
  'Aurora Pearl': { name: 'Aurora Pearl', free: false, background: 'linear-gradient(135deg, #fff8ed, #f4e4ff, #e6f7ff)', accent: '#d5a5c7', text: '#3f3942', muted: '#716875', card: 'rgba(255,255,255,.56)', glow: 'rgba(213,165,199,.36)' },
  'Soft Bloom': { name: 'Soft Bloom', free: false, background: 'linear-gradient(135deg, #fff7f3, #f5dbe3, #fdf8ef)', accent: '#e0a2ad', text: '#493b3d', muted: '#806e70', card: 'rgba(255,255,255,.58)', glow: 'rgba(224,162,173,.35)' },
  'Cloud Room': { name: 'Cloud Room', free: false, background: 'linear-gradient(135deg, #ffffff, #edf3f7, #fbf6ee)', accent: '#a9c4d4', text: '#35404a', muted: '#6a7882', card: 'rgba(255,255,255,.6)', glow: 'rgba(169,196,212,.34)' },
  'Vanilla Sky': { name: 'Vanilla Sky', free: false, background: 'linear-gradient(135deg, #fff9e8, #f6e7be, #fffdfa)', accent: '#dabd72', text: '#443d2d', muted: '#817556', card: 'rgba(255,255,255,.57)', glow: 'rgba(218,189,114,.32)' },
  'Ocean Glass': { name: 'Ocean Glass', free: false, background: 'linear-gradient(135deg, #f5fdff, #d6f3f5, #fdfaf3)', accent: '#8ccdd2', text: '#29484c', muted: '#5c7b80', card: 'rgba(255,255,255,.56)', glow: 'rgba(140,205,210,.34)' },
  'Dream Blur': { name: 'Dream Blur', free: false, background: 'linear-gradient(135deg, #fff8ff, #e5ddff, #ffe9f1)', accent: '#c2a0db', text: '#423747', muted: '#75657b', card: 'rgba(255,255,255,.53)', glow: 'rgba(194,160,219,.34)' },
  'Silver Silk': { name: 'Silver Silk', free: false, background: 'linear-gradient(135deg, #ffffff, #ededed, #faf8f3)', accent: '#b8b6b2', text: '#363636', muted: '#77736d', card: 'rgba(255,255,255,.68)', glow: 'rgba(184,182,178,.3)' },
  'Moon Cream': { name: 'Moon Cream', free: false, background: 'linear-gradient(135deg, #fbf5e8, #eee0c7, #ffffff)', accent: '#cfb98f', text: '#403a30', muted: '#786e5d', card: 'rgba(255,255,255,.58)', glow: 'rgba(207,185,143,.32)' },
  'Velvet Night': { name: 'Velvet Night', free: false, background: 'linear-gradient(135deg, #201b2d, #35243d, #191b29)', accent: '#e2bcc7', text: '#fff8fb', muted: '#d8c9cf', card: 'rgba(255,255,255,.12)', glow: 'rgba(226,188,199,.32)' },
  'Midnight Glass': { name: 'Midnight Glass', free: false, background: 'linear-gradient(135deg, #10131c, #1f2633, #151720)', accent: '#b6d9ff', text: '#f7fbff', muted: '#ccd8e3', card: 'rgba(255,255,255,.12)', glow: 'rgba(182,217,255,.28)' }
}

export const DEFAULT_THEME = THEMES['Pearl Calm']

export function themeVars(themeName = 'Pearl Calm') {
  const t = THEMES[themeName] || DEFAULT_THEME
  return {
    '--bg': t.background,
    '--accent': t.accent,
    '--text': t.text,
    '--muted': t.muted,
    '--card': t.card,
    '--glow': t.glow
  }
}
