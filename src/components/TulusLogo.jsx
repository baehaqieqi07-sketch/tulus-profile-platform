export default function TulusLogo({ compact = false, className = '' }) {
  return (
    <span className={`tulus-logo ${compact ? 'compact' : ''} ${className}`} aria-label="TULUS">
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="tulusMarkGradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8FB7FF" />
            <stop offset=".48" stopColor="#4F8CFF" />
            <stop offset="1" stopColor="#C8B8FF" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="50" height="50" rx="18" fill="url(#tulusMarkGradient)" />
        <path d="M18 24.5c7.8-6.4 20.2-6.4 28 0" fill="none" stroke="white" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M32 22v21" fill="none" stroke="white" strokeWidth="5.2" strokeLinecap="round" />
        <path d="M24 35h16" fill="none" stroke="white" strokeWidth="4.8" strokeLinecap="round" />
        <circle cx="47" cy="17" r="4" fill="rgba(255,255,255,.85)" />
      </svg>
      {!compact && <b>TULUS</b>}
    </span>
  )
}
