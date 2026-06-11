import BrandIcon from './BrandIcon.jsx'

export default function AppIcon({ app = 'custom', name, size = 42, label, variant = 'glass', className = '' }) {
  return <BrandIcon name={app || name} label={label} size={size} variant={variant} className={`app-icon ${className}`} />
}
