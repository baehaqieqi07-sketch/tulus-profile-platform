export const labels={id:{save:'Simpan',login:'Masuk',music:'Musik'},en:{save:'Save',login:'Login',music:'Music'}}; export function t(lang,key){return labels[lang]?.[key]||labels.en[key]||key}
