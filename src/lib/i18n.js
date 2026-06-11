export const LANGUAGES = ['id', 'en', 'su', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ar']
export const languageNames = {
  id: 'Bahasa Indonesia', en: 'English', su: 'Basa Sunda', ja: '日本語', ko: '한국어', es: 'Español', fr: 'Français', de: 'Deutsch', pt: 'Português', ar: 'العربية'
}
export const dictionary = {
  id: { create: 'Buat Profile', explore: 'Jelajahi', login: 'Masuk', save: 'Simpan', music: 'Musik', theme: 'Tampilan', privacy: 'Privasi', uploadMusic: 'Upload Musik', chooseBackground: 'Pilih Background', help: 'Pusat Bantuan', dashboard: 'Dashboard' },
  en: { create: 'Create Profile', explore: 'Explore', login: 'Login', save: 'Save', music: 'Music', theme: 'Theme', privacy: 'Privacy', uploadMusic: 'Upload Music', chooseBackground: 'Choose Background', help: 'Help Center', dashboard: 'Dashboard' },
  su: { create: 'Jieun Profile', explore: 'Tingali', login: 'Asup', save: 'Simpen', music: 'Musik', theme: 'Tampilan', privacy: 'Privasi', uploadMusic: 'Upload Musik', chooseBackground: 'Pilih Background', help: 'Bantuan', dashboard: 'Dashboard' }
}
export function t(lang = 'id', key = '') { return dictionary[lang]?.[key] || dictionary.en[key] || dictionary.id[key] || key }
export function getInitialLang() { return localStorage.getItem('tulus.lang') || (navigator.language || 'id').slice(0,2) || 'id' }
export function nextLang(lang = 'id') { const idx = LANGUAGES.indexOf(lang); return LANGUAGES[(idx + 1) % LANGUAGES.length] }
