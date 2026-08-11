import './TiltedCard.css'

export default function TiltedCard({ children, className = '' }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const inner = event.currentTarget.firstElementChild
    inner.style.setProperty('--rotate-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -12}deg`)
    inner.style.setProperty('--rotate-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 12}deg`)
  }

  const reset = (event) => {
    const inner = event.currentTarget.firstElementChild
    inner.style.setProperty('--rotate-x', '0deg')
    inner.style.setProperty('--rotate-y', '0deg')
  }

  return (
    <div className={`tilted-card ${className}`} onPointerMove={handleMove} onPointerLeave={reset}>
      <div className="tilted-card__inner">
        {children}
      </div>
    </div>
  )
}
