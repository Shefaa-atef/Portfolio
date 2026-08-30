import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SectionBoundaryBlur.css'

gsap.registerPlugin(ScrollTrigger)

export default function SectionBoundaryBlur() {
  const boundaryRef = useRef(null)
  const blurRef = useRef(null)

  useEffect(() => {
    const boundary = boundaryRef.current
    const blur = blurRef.current
    if (!boundary || !blur) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      gsap.set(blur, { opacity: 0 })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(blur, { opacity: 0 }, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: boundary,
          start: 'top bottom-=24',
          end: 'top bottom-=180',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }, boundary)

    return () => context.revert()
  }, [])

  return (
    <div ref={boundaryRef} className="section-boundary-blur" aria-hidden="true">
      <div ref={blurRef} className="section-boundary-blur__zone" />
    </div>
  )
}
