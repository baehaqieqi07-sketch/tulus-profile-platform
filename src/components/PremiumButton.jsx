import { useRef } from 'react'

export default function PremiumButton({ as: Tag = 'button', children, variant = 'primary', className = '', onClick, ...props }) {
  const ref = useRef(null)
  const handleClick = (event) => {
    const node = ref.current
    if (node) {
      const rect = node.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      ripple.className = 'ripple'
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`
      node.appendChild(ripple)
      window.setTimeout(() => ripple.remove(), 650)
    }
    onClick?.(event)
  }
  return <Tag ref={ref} className={`premium-button ${variant} ${className}`} onClick={handleClick} {...props}>{children}</Tag>
}
