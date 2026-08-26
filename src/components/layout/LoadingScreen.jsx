import { useEffect, useRef, useState } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onComplete }) {
  const [isRevealing, setIsRevealing] = useState(false)
  const hasFinished = useRef(false)

  useEffect(() => {
    let frameId

    const startReveal = () => {
      frameId = window.requestAnimationFrame(() => setIsRevealing(true))
    }

    if (document.readyState === 'complete') {
      startReveal()
    } else {
      window.addEventListener('load', startReveal, { once: true })
    }

    return () => {
      window.removeEventListener('load', startReveal)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

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
