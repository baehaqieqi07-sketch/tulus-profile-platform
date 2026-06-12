export default function GlassCard({ as: Tag = 'section', children, className = '', padded = true, ...props }) {
  return <Tag className={`lux-glass-card ${padded ? 'lux-pad' : ''} ${className}`} {...props}>{children}</Tag>
}
