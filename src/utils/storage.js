import { initialProfile } from '../data/brand.js';

const keys = {
  profile: 'tulus.profile',
  assets: 'tulus.assets',
  payments: 'tulus.payments',
  notifications: 'tulus.notifications',
  analytics: 'tulus.analytics',
  game: 'tulus.game',
  settings: 'tulus.settings'
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function loadProfile() { return { ...initialProfile, ...read(keys.profile, {}) }; }
export function saveProfile(profile) { return write(keys.profile, profile); }
export function loadAssets() { return read(keys.assets, []); }
export function saveAssets(assets) { return write(keys.assets, assets); }
export function loadPayments() { return read(keys.payments, []); }
export function savePayments(payments) { return write(keys.payments, payments); }
export function loadNotifications() { return read(keys.notifications, []); }
export function saveNotifications(items) { return write(keys.notifications, items); }
export function loadAnalytics() { return read(keys.analytics, { views: 1240, clicks: 426, aiChats: 38, helpSearches: 17, daily: [12, 18, 24, 31, 27, 44, 52], events: [] }); }
export function saveAnalytics(data) { return write(keys.analytics, data); }
export function loadGame() { return read(keys.game, { xp: 240, streak: 3, badges: ['First Profile'], spins: 1, combo: 0, memoryWins: 0 }); }
export function saveGame(data) { return write(keys.game, data); }
export function loadSettings() { return read(keys.settings, { lang: 'id', onboardingDone: false }); }
export function saveSettings(settings) { return write(keys.settings, settings); }
export function resetDemo() { Object.values(keys).forEach((key) => localStorage.removeItem(key)); }
