import { useEffect, useRef } from 'react'
import normalCursor from '../../../assets/icons/normal cursor.svg'
import clickCursor from '../../../assets/icons/click cursor.svg'
import './SpiderCursor.css'

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
  '[role="slider"]',
  '[role="scrollbar"]',
  '[role="tab"]',
  '[role="checkbox"]',
  '[role="switch"]',
  '[contenteditable]:not([contenteditable="false"])',
  '[draggable="true"]',
  '[data-no-web]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false
  return Boolean(target.closest(INTERACTIVE_SELECTOR))
}

function isScrollbarPress(event) {
  const root = document.documentElement
  if (event.clientX >= root.clientWidth || event.clientY >= root.clientHeight) return true
  for (let element = event.target; element instanceof HTMLElement; element = element.parentElement) {
    if (element === document.body || element === root) continue
    const bounds = element.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    if (element.scrollHeight > element.clientHeight &&
        (x < element.clientLeft || x >= element.clientLeft + element.clientWidth)) return true
    if (element.scrollWidth > element.clientWidth &&
        (y < element.clientTop || y >= element.clientTop + element.clientHeight)) return true
  }
  return false
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

// Fixed-step Verlet integration: each part of the thread falls independently.
function stepFallingRope(rope, heldEnd = null) {
  const points = rope.points
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i]
    if (heldEnd && i === SEGMENTS) {
      point.oldX = point.x
      point.oldY = point.y
      point.x = heldEnd.x
      point.y = heldEnd.y
      continue
    }
    const vx = (point.x - point.oldX) * .992
    const vy = (point.y - point.oldY) * .992
    point.oldX = point.x
    point.oldY = point.y
    point.x += vx
    point.y += vy + .24
  }
  const segmentLength = rope.length / SEGMENTS
  for (let pass = 0; pass < 12; pass += 1) {
    points[0].x = rope.anchor.x
    points[0].y = rope.anchor.y
    if (heldEnd) {
      points[SEGMENTS].x = heldEnd.x
      points[SEGMENTS].y = heldEnd.y
    }
    for (let i = 1; i < points.length; i += 1) {
      const previous = points[i - 1]
      const point = points[i]
      const dx = point.x - previous.x
      const dy = point.y - previous.y
      const distance = Math.max(.0001, Math.hypot(dx, dy))
      const correction = (distance - segmentLength) / distance
      const endPinned = heldEnd && i === SEGMENTS
      if (!endPinned) {
        const weight = i === 1 ? 1 : .5
        point.x -= dx * correction * weight
        point.y -= dy * correction * weight
      }
      if (i > 1) {
        const weight = endPinned ? 1 : .5
        previous.x += dx * correction * weight
        previous.y += dy * correction * weight
      }
    }
  }
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
    let animationFrame = null
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
        points: makeRope(activeWeb.anchor, mouse),
        accumulated: 0,
        anchor: activeWeb.anchor,
        length: Math.max(1, Math.hypot(mouse.x - activeWeb.anchor.x, mouse.y - activeWeb.anchor.y)),
        born: now,
      })
      droppedWebs = droppedWebs.slice(-MAX_DROPPED_WEBS)
      activeWeb = null
      cursor.classList.toggle('spider-cursor--click', hoveringInteractive)
    }

    let movePending = false
    const move = (event) => {
      const previousX = mouse.x
      const previousY = mouse.y
      mouse.x = event.clientX
      mouse.y = event.clientY
      visible = true

      if (activeWeb) {
        activeWeb.velocity.x = mouse.x - previousX
        activeWeb.velocity.y = mouse.y - previousY
      }

      if (!movePending) {
        movePending = true
        requestAnimationFrame(() => {
          movePending = false
          hoveringInteractive = isInteractiveTarget(event.target)
          cursor.style.opacity = '1'
          cursor.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`

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
        })
      }
    }

    const press = (event) => {
      if (event.button !== 0 || event.pointerType === 'touch') return
      if (event.defaultPrevented || isInteractiveTarget(event.target) || isScrollbarPress(event)) return
      move(event)
      dropActiveWeb(performance.now())
      const anchor = [
        { x: 0, y: mouse.y, distance: mouse.x },
        { x: width, y: mouse.y, distance: width - mouse.x },
        { x: mouse.x, y: 0, distance: mouse.y },
        { x: mouse.x, y: height, distance: height - mouse.y },
      ].reduce((closest, candidate) => candidate.distance < closest.distance ? candidate : closest)
      activeWeb = {
        source: 'click',
        anchor: { x: anchor.x, y: anchor.y },
        born: performance.now(),
        velocity: { x: 0, y: 0 },
      }
      move(event)
      cursor.classList.add('spider-cursor--click')
      wakeAnimation()
    }

    const release = () => {
      if (activeWeb?.source !== 'click') return
      dropActiveWeb(performance.now())
      cursor.style.setProperty('--spider-cursor-tilt', '0deg')
    }

    const cancelWeb = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
      activeWeb = null
      droppedWebs = []
      context.clearRect(0, 0, width, height)
      cursor.classList.toggle('spider-cursor--click', hoveringInteractive)
      cursor.style.setProperty('--spider-cursor-tilt', '0deg')
    }

    const leave = () => {
      visible = false
      cursor.style.opacity = '0'
      dropActiveWeb(performance.now())
    }

    const enter = () => {
      visible = true
    }

    const wakeAnimation = () => {
      if (animationFrame !== null) return
      lastTime = performance.now()
      animationFrame = requestAnimationFrame(animate)
    }

    const animate = (now) => {
      animationFrame = null
      const delta = Math.min(32, now - lastTime)
      lastTime = now
      context.clearRect(0, 0, width, height)

      if (activeWeb && visible) {
        const shootProgress = reducedMotion.matches ? 1 : clamp((now - activeWeb.born) / 100, 0, 1)
        const rope = makeRope(mouse, activeWeb.anchor)
        drawRope(context, rope, .92, shootProgress)
      }

      droppedWebs = droppedWebs.filter((rope) => now - rope.born < (reducedMotion.matches ? 0 : 2600))
      droppedWebs.forEach((rope) => {
        const age = now - rope.born
        rope.accumulated += delta
        while (rope.accumulated >= 1000 / 120) {
          stepFallingRope(rope)
          rope.accumulated -= 1000 / 120
        }
        const opacity = .82 * clamp(1 - Math.max(0, age - 1600) / 1000, 0, 1)
        drawRope(context, rope.points, opacity)
      })

      if (activeWeb || droppedWebs.length) animationFrame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    window.addEventListener('pointerup', release, { passive: true })
    window.addEventListener('pointercancel', release, { passive: true })
    window.addEventListener('wheel', cancelWeb, { passive: true })
    window.addEventListener('scroll', cancelWeb, { passive: true, capture: true })
    window.addEventListener('dragstart', cancelWeb)
    window.addEventListener('blur', leave)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      window.removeEventListener('wheel', cancelWeb)
      window.removeEventListener('scroll', cancelWeb, true)
      window.removeEventListener('dragstart', cancelWeb)
      window.removeEventListener('blur', leave)
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
