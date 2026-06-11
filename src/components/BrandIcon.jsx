import { getBrandMeta, normalizeBrandName } from '../lib/brandIcons.js'
import { BrandSvg } from '../lib/BrandSvg.jsx'

export function brandFor(value = '') {
  return getBrandMeta(value)
}

export default function BrandIcon({ name = 'custom', size = 42, variant = 'glass', label, showLabel = false, className = '' }) {
  const brandName = normalizeBrandName(name || label)
  const meta = getBrandMeta(brandName)
  const title = label || meta.label
  const style = size ? { '--brand-size': `${size}px` } : undefined
  return (
    <span
      className={`brand-icon brand-${meta.className} brand-variant-${variant} ${showLabel ? 'with-label' : ''} ${className}`}
      style={style}
      title={title}
      aria-label={title}
      role="img"
    >
      <i><BrandSvg name={brandName} /></i>
      {showLabel && <b>{title}</b>}
    </span>
  )
}
