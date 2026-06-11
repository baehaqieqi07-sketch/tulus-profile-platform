import BrandMark from './BrandMark.jsx';

export default function Logo({ compact = false, className = '' }) {
  return (
    <div className={`logo-lockup ${compact ? 'is-compact' : ''} ${className}`}>
      <BrandMark size={compact ? 34 : 44} />
      {!compact && <span className="logo-word">TULUS</span>}
    </div>
  );
}
