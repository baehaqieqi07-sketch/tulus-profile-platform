import { useState } from 'react'
export default function Billing({ payments = [], setPayments }) {
  const [plan, setPlan] = useState('plus')
  const [proofUrl, setProofUrl] = useState('')
  const submit = () => {
    setPayments((prev) => [{ id: crypto.randomUUID(), plan, amount: plan === 'plus' ? 29000 : plan === 'pro' ? 59000 : 199000, status: 'pending', proof_url: proofUrl, provider: 'manual', created_at: new Date().toISOString() }, ...prev])
    setProofUrl('')
  }
  return (
    <div className="editor-panel">
      <p className="eyebrow">billing</p>
      <h2>Manual payment first.</h2>
      <label>Plan<select value={plan} onChange={(e) => setPlan(e.target.value)}><option value="plus">Plus</option><option value="pro">Pro</option><option value="lifetime">Lifetime</option></select></label>
      <label>Payment proof URL<input value={proofUrl} placeholder="Private storage URL after upload" onChange={(e) => setProofUrl(e.target.value)} /></label>
      <button className="primary-button" onClick={submit}>Send payment proof</button>
      <div className="stack-list">{payments.map((payment) => <div className="stack-item" key={payment.id}><strong>{payment.plan}</strong><span>{payment.status}</span><small>{new Date(payment.created_at).toLocaleString()}</small></div>)}</div>
    </div>
  )
}
