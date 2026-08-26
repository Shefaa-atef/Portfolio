import { useEffect, useRef } from 'react'
import normalCursor from '../../../assets/icons/normal cursor.svg'
import clickCursor from '../../../assets/icons/click cursor.svg'
import './SpiderCursor.css'

const EDGE_RANGE = 220
const SEGMENTS = 18
const MAX_DROPPED_WEBS = 5

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  'label[for]',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false
  const interactiveElement = target.closest(INTERACTIVE_SELECTOR)

  return Boolean(interactiveElement) || getComputedStyle(target).cursor === 'pointer'
}

function nearestEdge(x, width) {
  const candidates = [
    { edge: 'left', distance: x },
    { edge: 'right', distance: width - x },
  ]

  return candidates.reduce((nearest, candidate) =>
    candidate.distance < nearest.distance ? candidate : nearest,
  )
}

function edgeAnchor(edge, y, width, height) {
  const padding = 18

  if (edge === 'left') return { x: 0, y: clamp(y - 34, padding, height - padding) }
  return { x: width, y: clamp(y - 34, padding, height - padding) }
}

function makeRope(anchor, end) {
  return Array.from({ length: SEGMENTS + 1 }, (_, index) => {
    const progress = index / SEGMENTS
    const x = anchor.x + (end.x - anchor.x) * progress
    const y = anchor.y + (end.y - anchor.y) * progress
    return { x, y, oldX: x, oldY: y }
  })
}

function drawRope(context, points, opacity, progress = 1) {
  const lastIndex = Math.max(1, Math.floor((points.length - 1) * progress))

  context.save()
  context.globalAlpha = opacity
  context.lineCap = 'round'
  context.lineJoin = 'round'

  context.beginPath()
  context.moveTo(points[0].x, points[0].y)
  for (let index = 1; index <= lastIndex; index += 1) {
    const point = points[index]
    const previous = points[index - 1]
    context.quadraticCurveTo(
      previous.x,
      previous.y,
      (previous.x + point.x) / 2,
      (previous.y + point.y) / 2,
    )
  }
  context.strokeStyle = 'rgba(35, 48, 65, .34)'
  context.lineWidth = 3.1
  context.stroke()

  context.strokeStyle = '#f4f9ff'
  context.lineWidth = 1.25
  context.stroke()
  context.restore()
}

function fallingRopePoints(rope) {
  const sag = Math.min(18, rope.length * 0.05)

  return Array.from({ length: SEGMENTS + 1 }, (_, index) => {
    const progress = index / SEGMENTS
    return {
      x:
        rope.anchor.x +
        (rope.end.x - rope.anchor.x) * progress,
      y:
        rope.anchor.y +
        (rope.end.y - rope.anchor.y) * progress +
        Math.sin(progress * Math.PI) * sag,
    }
  })
}

export default function SpiderCursor() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const cursor = cursorRef.current
    const context = canvas.getContext('2d')
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches) return undefined

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationFrame
    let lastTime = performance.now()
    let visible = false
    let activeWeb = null
    let droppedWebs = []
    const mouse = { x: width / 2, y: height / 2 }
    let hoveringInteractive = false

    document.documentElement.classList.add('spider-cursor-active')

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const dropActiveWeb = (now) => {
      if (!activeWeb) return

      droppedWebs.push({
        anchor: activeWeb.anchor,
        end: { x: mouse.x, y: mouse.y },
        length: Math.max(
          1,
          Math.hypot(
            mouse.x - activeWeb.anchor.x,
            mouse.y - activeWeb.anchor.y,
          ),
        ),
        velocity: {
          x: clamp(activeWeb.velocity.x, -14, 14) * 0.34,
          y: clamp(activeWeb.velocity.y, -14, 14) * 0.34,
        },
        edge: activeWeb.edge,
        born: now,
      })
      droppedWebs = droppedWebs.slice(-MAX_DROPPED_WEBS)
      activeWeb = null
      cursor.classList.toggle('spider-cursor--click', hoveringInteractive)
    }

    const move = (event) => {
      const previousX = mouse.x
      const previousY = mouse.y
      mouse.x = event.clientX
      mouse.y = event.clientY
      visible = true
      hoveringInteractive = isInteractiveTarget(event.target)
      cursor.style.opacity = '1'
      cursor.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`

      const nearest = nearestEdge(mouse.x, width)
      const attachRange = reducedMotion.matches ? 165 : EDGE_RANGE
      const now = performance.now()

      if (nearest.distance <= attachRange) {
        if (!activeWeb || activeWeb.edge !== nearest.edge) {
          dropActiveWeb(now)
          activeWeb = {
            edge: nearest.edge,
            anchor: edgeAnchor(nearest.edge, mouse.y, width, height),
            born: now,
            velocity: { x: 0, y: 0 },
          }
        }
        activeWeb.velocity.x = mouse.x - previousX
        activeWeb.velocity.y = mouse.y - previousY
      } else if (activeWeb && nearest.distance > attachRange + 30) {
        dropActiveWeb(now)
      }

      cursor.classList.toggle(
        'spider-cursor--click',
        hoveringInteractive || Boolean(activeWeb),
      )

      const tilt = activeWeb
        ? (Math.atan2(
            activeWeb.anchor.y - mouse.y,
            activeWeb.anchor.x - mouse.x,
          ) *
            180) /
            Math.PI +
          90
        : 0
      cursor.style.setProperty('--spider-cursor-tilt', `${tilt}deg`)
    }

    const leave = () => {
      visible = false
      cursor.style.opacity = '0'
      dropActiveWeb(performance.now())
    }

    const enter = () => {
      visible = true
    }

    const animate = (now) => {
      const delta = Math.min(32, now - lastTime)
      lastTime = now
      context.clearRect(0, 0, width, height)

      if (activeWeb && visible) {
        const shootProgress = clamp((now - activeWeb.born) / 145, 0, 1)
        const rope = makeRope(mouse, activeWeb.anchor)
        const distance = nearestEdge(mouse.x, width).distance
        const tension = clamp(1 - distance / EDGE_RANGE, 0.18, 1)

        drawRope(context, rope, 0.58 + tension * 0.4, shootProgress)
      }

      droppedWebs = droppedWebs.filter((rope) => now - rope.born < 1900)
      droppedWebs.forEach((rope) => {
        const age = now - rope.born
        const frameScale = Math.max(0.001, delta / 16.67)
        const previousX = rope.end.x
        const previousY = rope.end.y
        rope.velocity.y += 0.34 * frameScale
        rope.velocity.x *= Math.pow(0.988, frameScale)
        rope.end.x += rope.velocity.x * frameScale
        rope.end.y += rope.velocity.y * frameScale

        const offsetX = rope.end.x - rope.anchor.x
        const offsetY = rope.end.y - rope.anchor.y
        const distance = Math.max(0.001, Math.hypot(offsetX, offsetY))
        rope.end.x = rope.anchor.x + (offsetX / distance) * rope.length
        rope.end.y = rope.anchor.y + (offsetY / distance) * rope.length
        rope.velocity.x = (rope.end.x - previousX) / frameScale
        rope.velocity.y = (rope.end.y - previousY) / frameScale

        const opacity = clamp(1 - Math.max(0, age - 1050) / 850, 0, 0.82)
        const points = fallingRopePoints(rope)
        drawRope(context, points, opacity)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('spider-cursor-active')
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="spider-web-canvas" aria-hidden="true" />
      <div ref={cursorRef} className="spider-cursor" aria-hidden="true">
        <img
          className="spider-cursor__icon spider-cursor__icon--normal"
          src={normalCursor}
          alt=""
        />
        <img
          className="spider-cursor__icon spider-cursor__icon--click"
          src={clickCursor}
          alt=""
        />
      </div>
    </>
  )
}
