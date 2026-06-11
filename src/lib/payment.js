export const PLAN_PRICES = { free: 0, plus: 25000, pro: 55000, lifetime: 199000 }
export function formatRupiah(value = 0) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value) }
export function paymentProviderReady(env = import.meta.env) { return Boolean(env.VITE_PAYMENT_PROVIDER_READY) }
export function manualPaymentDraft(plan = 'plus') { return { plan, amount: PLAN_PRICES[plan] || 0, status: 'pending', provider: 'manual' } }
