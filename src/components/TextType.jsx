import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './TextType.css'

export default function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  hideCursorOnComplete = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const [delayComplete, setDelayComplete] = useState(initialDelay === 0)
  const containerRef = useRef(null)
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min
  }, [variableSpeed, typingSpeed])

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return undefined
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setIsVisible(true)
    }, { threshold: 0.1 })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!isVisible) return undefined
    if (!delayComplete) return undefined
    const currentText = textArray[currentTextIndex]
    const processedText = reverseMode ? [...currentText].reverse().join('') : currentText
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedText(processedText)
      setCurrentCharIndex(processedText.length)
      return undefined
    }

    let timeout
    if (isDeleting) {
      if (displayedText === '') {
        setIsDeleting(false)
        if (currentTextIndex === textArray.length - 1 && !loop) return undefined
        onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex)
        setCurrentTextIndex((index) => (index + 1) % textArray.length)
        setCurrentCharIndex(0)
      } else {
        timeout = setTimeout(() => setDisplayedText((value) => value.slice(0, -1)), deletingSpeed)
      }
    } else if (currentCharIndex < processedText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((value) => value + processedText[currentCharIndex])
        setCurrentCharIndex((index) => index + 1)
      }, variableSpeed ? getRandomSpeed() : typingSpeed)
    } else if (loop || currentTextIndex < textArray.length - 1) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
    }

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentTextIndex, delayComplete, deletingSpeed, displayedText, getRandomSpeed, isDeleting, isVisible, loop, onSentenceComplete, pauseDuration, reverseMode, textArray, typingSpeed, variableSpeed])

  useEffect(() => {
    if (!isVisible || delayComplete) return undefined
    const timeout = setTimeout(() => setDelayComplete(true), initialDelay)
    return () => clearTimeout(timeout)
  }, [delayComplete, initialDelay, isVisible])

  const shouldHideCursor = hideCursorWhileTyping
    && (currentCharIndex < textArray[currentTextIndex].length || isDeleting)
  const isComplete = !loop
    && currentTextIndex === textArray.length - 1
    && currentCharIndex >= textArray[currentTextIndex].length
  const color = textColors.length ? textColors[currentTextIndex % textColors.length] : 'inherit'

  return createElement(
    Component,
    { ref: containerRef, className: `text-type ${className}`, ...props },
    <span className="text-type__content" style={{ color }}>{displayedText}</span>,
    showCursor && !(hideCursorOnComplete && isComplete) && (
      <span
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
        style={{ '--cursor-blink-duration': `${cursorBlinkDuration}s` }}
      >
        {cursorCharacter}
      </span>
    ),
  )
}
