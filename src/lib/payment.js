export const plans={free:0,plus:29000,pro:59000,lifetime:299000}; export function formatPrice(v){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR'}).format(v||0)}
