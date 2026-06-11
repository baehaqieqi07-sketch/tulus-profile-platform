export const LANGUAGES = ['id', 'en']
export const dictionary = {
  id: { create: 'Buat Profile', explore: 'Jelajahi', login: 'Masuk', save: 'Simpan', music: 'Musik', theme: 'Tampilan', privacy: 'Privasi', uploadMusic: 'Upload Musik', chooseBackground: 'Pilih Background' },
  en: { create: 'Create Profile', explore: 'Explore', login: 'Login', save: 'Save', music: 'Music', theme: 'Theme', privacy: 'Privacy', uploadMusic: 'Upload Music', chooseBackground: 'Choose Background' }
}
export function t(lang = 'en', key = '') { return dictionary[lang]?.[key] || dictionary.en[key] || key }
export function nextLang(lang = 'en') { return lang === 'id' ? 'en' : 'id' }
