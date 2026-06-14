export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return <div className={`loading-skeleton glass-card ${className}`} aria-label="Loading">{Array.from({ length: lines }).map((_, i) => <span key={i} />)}</div>
}
