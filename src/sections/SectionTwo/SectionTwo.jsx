import { useEffect, useRef } from 'react'
import aiLogo from '../../assets/images/SVG/section 2/SVG/ai.svg'
import yellowShape from '../../assets/images/SVG/section 2/SVG/big yellow circle top left.svg'
import purpleCircle from '../../assets/images/SVG/section 2/SVG/circle puple left buttom corner.svg'
import cityBuildings from '../../assets/images/SVG/section 2/SVG/city buildings.svg'
import halftoneDots from '../../assets/images/SVG/section 2/SVG/dots halftone left buttom corner.svg'
import drawingLineOne from '../../assets/images/SVG/section 2/SVG/drawing line 1.svg'
import drawingLineTwo from '../../assets/images/SVG/section 2/SVG/drawing line 2.svg'
import figmaLogo from '../../assets/images/SVG/section 2/SVG/figma logo.svg'
import flutterLogo from '../../assets/images/SVG/section 2/SVG/flutter logo.svg'
import hijabiHacker from '../../assets/images/SVG/section 2/SVG/hijabi hacker.svg'
import mainCard from '../../assets/images/SVG/section 2/SVG/main card.svg'
import pinkPaint from '../../assets/images/SVG/section 2/SVG/paint pink buttom left.svg'
import reactLogo from '../../assets/images/SVG/section 2/SVG/react logo.svg'
import smallYellowCircle from '../../assets/images/SVG/section 2/SVG/small yellow circle.svg'
import smallYellowCircleTwo from '../../assets/images/SVG/section 2/SVG/small yellow circle 2.svg'
import blueSplash from '../../assets/images/SVG/section 2/SVG/splash blue buttom right.svg'
import uiArtwork from '../../assets/images/SVG/section 2/SVG/ui.svg'
import uxArtwork from '../../assets/images/SVG/section 2/SVG/ux.svg'
import './SectionTwo.css'

function CollageImage({ className, src, width, height, eager = false }) {
  return (
    <img
      className={`section-two__art ${className}`}
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={width}
      height={height}
    />
  )
}

function BackgroundCollage() {
  return (
    <div className="section-two__background" aria-hidden="true">
      <CollageImage className="section-two__yellow-shape" src={yellowShape} width="603" height="519" />
      <CollageImage className="section-two__city" src={cityBuildings} width="581" height="1033" />
      <CollageImage className="section-two__pink-paint" src={pinkPaint} width="587" height="518" />
      <CollageImage className="section-two__purple-circle" src={purpleCircle} width="586" height="586" />
      <CollageImage className="section-two__blue-splash" src={blueSplash} width="347" height="340" />
      <CollageImage className="section-two__halftone" src={halftoneDots} width="670" height="669" />
      <CollageImage className="section-two__ui" src={uiArtwork} width="420" height="587" />
      <CollageImage className="section-two__ux" src={uxArtwork} width="429" height="544" />
    </div>
  )
}

function FloatingDoodles() {
  return (
    <div className="section-two__doodles" aria-hidden="true">
      <CollageImage className="section-two__hacker" src={hijabiHacker} width="592" height="740" eager />
      <CollageImage className="section-two__yellow-dot section-two__yellow-dot--large" src={smallYellowCircle} width="52" height="52" />
      <CollageImage className="section-two__yellow-dot section-two__yellow-dot--small" src={smallYellowCircleTwo} width="37" height="37" />
      <CollageImage className="section-two__line section-two__line--one" src={drawingLineOne} width="72" height="152" />
      <CollageImage className="section-two__line section-two__line--two" src={drawingLineTwo} width="329" height="709" />
      <CollageImage className="section-two__tech section-two__tech--ai" src={aiLogo} width="149" height="148" />
      <CollageImage className="section-two__tech section-two__tech--react" src={reactLogo} width="157" height="170" />
      <CollageImage className="section-two__tech section-two__tech--figma" src={figmaLogo} width="144" height="202" />
      <CollageImage className="section-two__tech section-two__tech--flutter" src={flutterLogo} width="209" height="233" />
    </div>
  )
}

function IdentityTicket() {
  return (
    <figure className="section-two__ticket">
      <img
        src={mainCard}
        alt="UI/UX designer, front-end and mobile developer — Computer Science graduate"
        draggable="false"
        decoding="async"
        loading="eager"
        width="1193"
        height="863"
      />
      <figcaption className="visually-hidden">
        Shefa Atef is a UI/UX designer, front-end and mobile developer, and computer science graduate.
      </figcaption>
    </figure>
  )
}

export default function SectionTwo() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = null

    const updateCard = () => {
      animationFrame = null

      if (reducedMotion.matches) {
        section.style.setProperty('--ticket-progress', '1')
        return
      }

      const sectionTop = section.getBoundingClientRect().top
      const viewportHeight = window.innerHeight
      const start = viewportHeight * 1.08
      const finish = viewportHeight * .08
      const progress = Math.min(1, Math.max(0, (start - sectionTop) / (start - finish)))
      section.style.setProperty('--ticket-progress', progress.toFixed(4))
    }

    const requestUpdate = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(updateCard)
    }

    updateCard()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', requestUpdate)

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)
    }
  }, [])

  return (
    <section ref={sectionRef} id="profile" className="section-two" aria-labelledby="profile-heading">
      <h2 id="profile-heading" className="visually-hidden">Designer and developer profile</h2>
      <div className="section-two__canvas">
        <BackgroundCollage />
        <FloatingDoodles />
        <IdentityTicket />
      </div>
    </section>
  )
}
