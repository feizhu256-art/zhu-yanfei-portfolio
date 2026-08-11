import { useRef } from 'react'
import './BorderGlow.css'

export default function BorderGlow({ children, className = '' }) {
  const cardRef = useRef(null)

  const followPointer = (event) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={cardRef} className={`border-glow-card ${className}`.trim()} onPointerMove={followPointer}>
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
