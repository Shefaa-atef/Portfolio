import { useEffect, useRef } from 'react'
import comicOne from '../../assets/images/SVG/section 1/SVG/comic 1.svg'
import comicTwo from '../../assets/images/photos/section 1/Super Programmer_ Code, Design, Impact.webp'
import comicThree from '../../assets/images/SVG/section 1/SVG/comic 3.optimized.svg'
import mainComic from '../../assets/images/SVG/section 1/SVG/COMIC 4.svg'
import dotsOne from '../../assets/images/SVG/section 1/SVG/DOT DESIGN 1.svg'
import dotsTwo from '../../assets/images/SVG/section 1/SVG/DOT DESIGN 2.svg'
import './Hero.css'

function BackgroundComicCover({ className, src }) {
  return (
    <img
      className={`comic-cover comic-cover--background ${className}`}
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  )
}

function MainComicCover() {
  return (
    <div className="main-comic">
      <img
        className="comic-cover comic-cover--main"
        src={mainComic}
        alt="The Amazing Programmer comic-book cover"
        draggable="false"
      />
    </div>
  )
}

function ComicTwoCover() {
  return (
    <div className="comic-cover comic-cover--background comic-cover--middle" aria-hidden="true">
      <img src={comicTwo} alt="" draggable="false" />
      <span className="comic-cover--middle__overlay" />
    </div>
  )
}

function ComicBookStack() {
  return (
    <div className="comic-stack">
      <ComicTwoCover />
      <BackgroundComicCover className="comic-cover--left" src={comicOne} />
      <BackgroundComicCover className="comic-cover--right" src={comicThree} />
      <MainComicCover />
    </div>
  )
}

function ComicSticker({ className, children }) {
  return (
    <div className={`comic-sticker ${className}`}>
      <span>{children}</span>
    </div>
  )
}

function YearBadge() {
  return (
    <div className="year-badge" aria-label="2026">
      <span aria-hidden="true">20</span>
      <span aria-hidden="true">26</span>
    </div>
  )
}

function HalftoneDecoration() {
  return (
    <div className="halftones" aria-hidden="true">
      <img className="halftone halftone--left" src={dotsTwo} alt="" />
      <img className="halftone halftone--right" src={dotsOne} alt="" />
    </div>
  )
}

function MarqueeText() {
  const phrase = 'With great skills come great projects'

  return (
    <div className="marquee-text" aria-hidden="true">
      <div className="marquee-text__track">
        {[0, 1].map((group) => (
          <div className="marquee-text__group" key={group}>
            <span>{phrase}</span>
            <span>{phrase}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomComicBanner() {
  return (
    <div className="bottom-comic-banner" aria-label="With great skills come great projects">
      <span className="bottom-comic-banner__accent bottom-comic-banner__accent--purple" aria-hidden="true" />
      <span className="bottom-comic-banner__accent bottom-comic-banner__accent--blue-lower" aria-hidden="true" />
      <span className="bottom-comic-banner__accent bottom-comic-banner__accent--blue-upper" aria-hidden="true" />
      <div className="bottom-comic-banner__ink">
        <MarqueeText />
      </div>
    </div>
  )
}

export default function Hero({ isReady = true }) {
  const heroRef = useRef(null)
  const pointerFrame = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateScroll = () => {
      if (reducedMotion.matches) return
      const rect = hero.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * 0.58)))
      hero.style.setProperty('--scroll-progress', progress.toFixed(3))
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  const handlePointerMove = (event) => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      hero.style.setProperty('--mouse-x', x.toFixed(3))
      hero.style.setProperty('--mouse-y', y.toFixed(3))
    })
  }

  const resetPointer = () => {
    const hero = heroRef.current
    if (!hero) return
    hero.style.setProperty('--mouse-x', 0)
    hero.style.setProperty('--mouse-y', 0)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`portfolio-hero${isReady ? ' portfolio-hero--ready' : ''}`}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <h1 id="hero-title" className="visually-hidden">Shefa Atef — The Amazing Programmer</h1>
      <HalftoneDecoration />
      <ComicBookStack />
      <ComicSticker className="comic-sticker--portfolio">Portfolio</ComicSticker>
      <ComicSticker className="comic-sticker--name">Shefa Atef</ComicSticker>
      <YearBadge />
      <BottomComicBanner />
    </section>
  )
}
