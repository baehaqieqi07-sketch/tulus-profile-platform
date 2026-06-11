export default function TulusLogo({ compact = false, className = '' }) {
  return (
    <span className={`tulus-logo orbit-logo ${compact ? 'compact' : ''} ${className}`} aria-label="TULUS">
      <svg viewBox="0 0 72 72" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="tulusOrbitBlue" x1="10" y1="8" x2="62" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAF3FF" />
            <stop offset=".28" stopColor="#8FB7FF" />
            <stop offset=".62" stopColor="#4F8CFF" />
            <stop offset="1" stopColor="#C8B8FF" />
          </linearGradient>
          <filter id="softOrbitGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect x="9" y="9" width="54" height="54" rx="22" fill="rgba(7,17,32,.72)" stroke="rgba(255,255,255,.34)" strokeWidth="1.4" />
        <path d="M17 38c7.6-16 30.4-20.2 38-5.2" fill="none" stroke="url(#tulusOrbitBlue)" strokeWidth="5" strokeLinecap="round" filter="url(#softOrbitGlow)" />
        <path d="M22 50c9.6-5.6 20.8-5.6 30.2 0" fill="none" stroke="rgba(234,243,255,.78)" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 21v30" stroke="white" strokeWidth="5.2" strokeLinecap="round" />
        <circle cx="54" cy="21" r="4.7" fill="#EAF3FF" />
        <circle cx="18" cy="51" r="2.2" fill="#8FB7FF" />
      </svg>
      {!compact && <b>TULUS</b>}
    </span>
  )
}
