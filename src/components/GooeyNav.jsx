import { useEffect, useRef, useState } from 'react'
import './GooeyNav.css'

export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
}) {
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const filterRef = useRef(null)
  const textRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const selectedIndex = controlledActiveIndex ?? activeIndex
  const noise = (n = 1) => n / 2 - Math.random() * n

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const makeParticles = (element) => {
    const bubbleTime = animationTime * 2 + timeVariance
    element.style.setProperty('--time', `${bubbleTime}ms`)
    for (let i = 0; i < particleCount; i += 1) {
      const time = animationTime * 2 + noise(timeVariance * 2)
      const start = getXY(particleDistances[0], particleCount - i, particleCount)
      const end = getXY(particleDistances[1] + noise(7), particleCount - i, particleCount)
      const rotate = noise(particleR / 10)
      element.classList.remove('active')
      setTimeout(() => {
        const particle = document.createElement('span')
        const point = document.createElement('span')
        particle.className = 'gooey-particle'
        point.className = 'gooey-point'
        particle.style.cssText = `--start-x:${start[0]}px;--start-y:${start[1]}px;--end-x:${end[0]}px;--end-y:${end[1]}px;--time:${time}ms;--scale:${1 + noise(0.2)};--color:var(--color-${colors[Math.floor(Math.random() * colors.length)]},white);--rotate:${(rotate > 0 ? rotate + particleR / 20 : rotate - particleR / 20) * 10}deg`
        particle.appendChild(point)
        element.appendChild(particle)
        requestAnimationFrame(() => element.classList.add('active'))
        setTimeout(() => particle.remove(), time)
      }, 30)
    }
  }

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const pos = element.getBoundingClientRect()
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    }
    Object.assign(filterRef.current.style, styles)
    Object.assign(textRef.current.style, styles)
    textRef.current.innerText = element.innerText
  }

  const selectItem = (element, index) => {
    if (selectedIndex === index) return
    setActiveIndex(index)
    updateEffectPosition(element)
    filterRef.current?.querySelectorAll('.gooey-particle').forEach((particle) => particle.remove())
    textRef.current?.classList.remove('active')
    void textRef.current?.offsetWidth
    textRef.current?.classList.add('active')
    if (filterRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      makeParticles(filterRef.current)
    }
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return undefined
    const update = () => {
      const activeItem = navRef.current?.querySelectorAll('li')[selectedIndex]
      if (activeItem) updateEffectPosition(activeItem)
    }
    update()
    textRef.current?.classList.add('active')
    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [selectedIndex])

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="主要导航">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={selectedIndex === index ? 'active' : ''}>
              <a
                href={item.href}
                aria-current={selectedIndex === index ? 'location' : undefined}
                onClick={(event) => selectItem(event.currentTarget.parentElement, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gooey-effect gooey-filter" ref={filterRef} />
      <span className="gooey-effect gooey-text" ref={textRef} />
    </div>
  )
}
