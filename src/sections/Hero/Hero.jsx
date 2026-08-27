import { useEffect, useRef } from 'react'
import purpleBackground from '../../assets/images/photos/section 1/purple background.png'
import spiderWoman from '../../assets/images/photos/section 1/spider woman.png'
import paperBackground from '../../assets/images/photos/section 1/paper background.png'
import spiderWebOne from '../../assets/images/SVG/section 1/spider web 1.svg'
import spiderWebTwo from '../../assets/images/SVG/section 1/spider web 2.svg'
import spiderWebThree from '../../assets/images/SVG/section 1/spider web 3.svg'
import dots from '../../assets/images/SVG/section 1/dots.svg'
import tape from '../../assets/images/SVG/section 1/tape.svg'
import './Hero.css'

const titleWords = ['Creative', 'Developer']

export default function Hero({ isReady = true }) {
  const ribbonTrackRef = useRef(null)
  const ribbonAnimationRef = useRef(null)
  let letterIndex = 0

  useEffect(() => {
    const track = ribbonTrackRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!track || reducedMotion.matches) return undefined

    const animation = track.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-25%)' },
      ],
      {
        duration: 18000,
        easing: 'linear',
        iterations: Infinity,
      },
    )
    ribbonAnimationRef.current = animation

    return () => {
      animation.cancel()
      ribbonAnimationRef.current = null
    }
  }, [])

  const setRibbonSpeed = (playbackRate) => {
    ribbonAnimationRef.current?.updatePlaybackRate(playbackRate)
  }

  return (
    <section
      className={`hero-section${isReady ? ' hero-section--ready' : ''}`}
      aria-labelledby="hero-title"
    >
      <img
        className="hero-section__purple-background"
        src={purpleBackground}
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-section__character"
        src={spiderWoman}
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-section__paper"
        src={paperBackground}
        alt=""
        aria-hidden="true"
      />

      <img className="hero-web hero-web--one" src={spiderWebOne} alt="" />
      <img className="hero-web hero-web--two" src={spiderWebTwo} alt="" />
      <img className="hero-web hero-web--three" src={spiderWebThree} alt="" />
      <img className="hero-dots" src={dots} alt="" aria-hidden="true" />

      <header className="hero-header">
        <button className="menu-button" type="button" aria-label="Open menu">
          <span>Menu</span>
        </button>
      </header>

      <div className="hero-label hero-kicker" data-spider-web-leave>
        <p><span>Portfolio</span></p>
      </div>
      <div className="hero-label hero-name" data-spider-web-leave>
        <p><span>Shefa Atef</span></p>
      </div>

      <div className="hero-year" aria-label="2026">
        <img src={tape} alt="" aria-hidden="true" />
        <div className="hero-year__paper" aria-hidden="true">
          <span>20</span>
          <span>26</span>
        </div>
      </div>

      <h1 id="hero-title" className="hero-title" aria-label="Creative Developer">
        {titleWords.map((word, wordPosition) => (
          <span className="hero-title__word" aria-hidden="true" key={word}>
            {[...word].map((letter, index) => {
              const currentIndex = letterIndex
              letterIndex += 1

              return (
                <span
                  className="hero-title__letter"
                  style={{
                    '--letter-delay': `${currentIndex * 46}ms`,
                    '--letter-tilt': `${((currentIndex % 5) - 2) * 2.1}deg`,
                  }}
                  key={`${letter}-${index}`}
                >
                  {letter}
                </span>
              )
            })}
            {wordPosition < titleWords.length - 1 && ' '}
          </span>
        ))}
      </h1>

      <div
        className="hero-ribbon"
        aria-hidden="true"
        onMouseEnter={() => setRibbonSpeed(.3)}
        onMouseLeave={() => setRibbonSpeed(1)}
      >
        <div className="hero-ribbon__viewport">
          <div className="hero-ribbon__track" ref={ribbonTrackRef}>
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
          </div>
        </div>
        <img className="hero-tape hero-tape--left" src={tape} alt="" />
        <img className="hero-tape hero-tape--right" src={tape} alt="" />
      </div>
    </section>
  )
}
