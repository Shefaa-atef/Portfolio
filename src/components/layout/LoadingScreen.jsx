import { useEffect, useRef, useState } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onComplete }) {
  const [isRevealing, setIsRevealing] = useState(false)
  const hasFinished = useRef(false)

  useEffect(() => {
    let firstFrameId
    let secondFrameId
    let fallbackId

    const startReveal = () => {
      firstFrameId = window.requestAnimationFrame(() => {
        secondFrameId = window.requestAnimationFrame(() => setIsRevealing(true))
      })
    }

    startReveal()
    fallbackId = window.setTimeout(() => {
      if (!hasFinished.current) {
        hasFinished.current = true
        onComplete()
      }
    }, 6200)

    return () => {
      window.cancelAnimationFrame(firstFrameId)
      window.cancelAnimationFrame(secondFrameId)
      window.clearTimeout(fallbackId)
    }
  }, [onComplete])

  const finishLoading = () => {
    if (hasFinished.current) return
    hasFinished.current = true
    onComplete()
  }

  const handleAnimationEnd = (event) => {
    if (event.animationName === 'spider-page-reveal') {
      finishLoading()
    }
  }

  return (
    <div
      aria-hidden="true"
      className={`loading-screen${isRevealing ? ' loading-screen--reveal' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="loading-screen__spider-curtain" />
    </div>
  )
}

export default LoadingScreen
