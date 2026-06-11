export default function AuthTabs({ active, onChange }) {
  return (
    <div className="auth-tabs" role="tablist" aria-label="Auth mode">
      {['Sign In', 'Sign Up'].map((tab) => (
        <button key={tab} type="button" className={active === tab ? 'active' : ''} onClick={() => onChange(tab)}>{tab}</button>
      ))}
    </div>
  )
}
