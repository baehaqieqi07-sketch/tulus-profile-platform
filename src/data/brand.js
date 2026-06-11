export const brand = {
  name: 'TULUS',
  tagline: {
    id: 'Bangun halaman profil yang terasa hidup.',
    en: 'Build a profile page that feels alive.'
  },
  colors: {
    navy: '#07111F',
    surface: 'rgba(11, 22, 38, .72)',
    blue: '#0B5CFF',
    sky: '#8FD7FF',
    cyan: '#00E5FF',
    violet: '#A78BFA',
    text: '#F7FBFF',
    muted: '#AFC4D8'
  },
  radii: { card: 28, button: 18, pill: 999 },
  copy: {
    id: ['Preview dulu sebelum publish.', 'Atur profil tanpa ribet.', 'Tanya Bekiw kalau kamu bingung.'],
    en: ['Preview before publishing.', 'Customize without friction.', 'Ask Bekiw whenever you need help.']
  }
};

export const initialProfile = {
  username: 'bekiw',
  displayName: 'BEKIW',
  bio: 'ORANG TULUS profile — soft blue, clean links, calm music.',
  status: 'Available',
  visibility: 'public',
  plan: 'free',
  verified: false,
  draft: true,
  layout: 'Soft Blue ORANG TULUS',
  templateId: 'orang-tulus-blue',
  avatar: '',
  background: '',
  backgroundVideo: '',
  music: '',
  cursor: '',
  accent: '#73C8FF',
  palette: ['#07111F', '#0B5CFF', '#73C8FF', '#A78BFA'],
  radius: 28,
  glow: 45,
  blur: 22,
  opacity: 72,
  particle: 34,
  motion: 60,
  reducedMotion: false,
  buttonStyle: 'Glass Pill',
  fontStyle: 'Modern Sans',
  autoplayMusic: true,
  badges: ['Soft Blue', 'Creator'],
  gallery: [],
  apps: [
    { id: 'roblox', type: 'Roblox', title: 'Roblox', username: 'orangtulus', url: 'https://roblox.com', icon: '◇', category: 'Game', visible: true, highlighted: true, pinned: true, clicks: 128, accent: '#73C8FF' },
    { id: 'apple', type: 'Apple Music', title: 'Apple Music', username: 'Playlist Tulus', url: 'https://music.apple.com', icon: '♪', category: 'Music', visible: true, highlighted: false, pinned: false, clicks: 88, accent: '#A78BFA' },
    { id: 'discord', type: 'Discord', title: 'Discord', username: 'ORANG TULUS', url: 'https://discord.com', icon: '✦', category: 'Social', visible: true, highlighted: true, pinned: false, clicks: 210, accent: '#8FD7FF' }
  ],
  socials: [],
  customButtons: [
    { id: 'main', label: 'Join ORANG TULUS', url: 'https://discord.com', visible: true, style: 'primary' }
  ],
  featured: { title: 'ORANG TULUS Profile', description: 'A clean creator card with live preview, music, apps, and links.', url: '' },
  healthNotes: []
};
