import { useRef, useState } from 'react'
import './DepthCarousel.css'

const getOffset = (index, active, count) => {
  let offset = (index - active + count) % count
  if (offset > count / 2) offset -= count
  return offset
}

export default function DepthCarousel({ items, className = '' }) {
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const dragRef = useRef(null)
  const suppressClickRef = useRef(false)
  const count = items.length
  const move = (step) => setActive((current) => (current + step + count) % count)

  const startDrag = (event) => {
    if (event.button !== 0 || event.target.closest('.depth-carousel__controls')) return
    dragRef.current = { id: event.pointerId, startX: event.clientX, x: event.clientX }
    rootRef.current?.setPointerCapture(event.pointerId)
    rootRef.current?.classList.add('is-dragging')
  }

  const drag = (event) => {
    if (!dragRef.current) return
    dragRef.current.x = event.clientX
    rootRef.current?.style.setProperty('--drag-x', `${event.clientX - dragRef.current.startX}px`)
  }

  const endDrag = () => {
    if (!dragRef.current) return
    const distance = dragRef.current.x - dragRef.current.startX
    suppressClickRef.current = Math.abs(distance) > 6
    dragRef.current = null
    rootRef.current?.classList.remove('is-dragging')
    rootRef.current?.style.setProperty('--drag-x', '0px')
    if (Math.abs(distance) >= 48) move(distance < 0 ? 1 : -1)
  }

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label="朱彦霏个人照片"
      tabIndex="0"
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
    >
      <div className="depth-carousel__stage">
        {items.map((item, index) => {
          const offset = getOffset(index, active, count)
          return (
            <button
              className={`depth-carousel__card${offset === 0 ? ' is-active' : ''}`}
              key={item.image}
              type="button"
              style={{ '--card-offset': offset, '--card-depth': Math.abs(offset), '--card-position': item.position }}
              aria-label={`查看第 ${index + 1} 张个人照片`}
              aria-current={offset === 0 ? 'true' : undefined}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false
                  return
                }
                setActive(index)
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                draggable="false"
                loading={offset === 0 ? 'eager' : 'lazy'}
                fetchPriority={offset === 0 ? 'high' : 'low'}
                decoding="async"
              />
            </button>
          )
        })}
      </div>

      {count > 1 && (
        <div className="depth-carousel__controls">
          <button type="button" aria-label="上一张照片" onClick={() => move(-1)}>←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
          <button type="button" aria-label="下一张照片" onClick={() => move(1)}>→</button>
        </div>
      )}
    </div>
  )
}
