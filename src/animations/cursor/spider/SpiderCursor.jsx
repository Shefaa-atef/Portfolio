import { useEffect, useRef } from 'react'
import './SpiderCursor.css'

const EDGE_RANGE = 220
const SEGMENTS = 18
const MAX_DROPPED_WEBS = 5

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

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

function endpointGeometry(wallPoint, linePoint) {
  const offsetX = linePoint.x - wallPoint.x
  const offsetY = linePoint.y - wallPoint.y
  const distance = Math.max(0.001, Math.hypot(offsetX, offsetY))
  const direction = { x: offsetX / distance, y: offsetY / distance }

  return {
    webTip: {
      x: wallPoint.x + direction.x * 17,
      y: wallPoint.y + direction.y * 17,
    },
    lineStart: {
      x: wallPoint.x + direction.x * 17,
      y: wallPoint.y + direction.y * 17,
    },
  }
}

function drawWebSplat(
  context,
  anchor,
  edge,
  opacity = 1,
  scale = 1,
  wallPoint = null,
) {
  const outward = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  }[edge]
  const baseAngle = wallPoint
    ? Math.atan2(wallPoint.y - anchor.y, wallPoint.x - anchor.x)
    : Math.atan2(outward.y, outward.x)
  const direction = { x: Math.cos(baseAngle), y: Math.sin(baseAngle) }

  context.save()
  context.globalAlpha = opacity
  context.strokeStyle = '#eef7ff'
  context.lineWidth = 1.15
  context.lineCap = 'round'

  for (let ray = -2; ray <= 2; ray += 1) {
    const angle = baseAngle + ray * 0.34
    const length = (17 - Math.abs(ray) * 1.8) * scale
    context.beginPath()
    context.moveTo(anchor.x, anchor.y)
    context.lineTo(
      anchor.x + Math.cos(angle) * length,
      anchor.y + Math.sin(angle) * length,
    )
    context.stroke()
  }

  for (let ring = 1; ring <= 2; ring += 1) {
    const radius = ring * 6.2 * scale
    context.beginPath()
    for (let ray = -2; ray <= 2; ray += 1) {
      const angle = baseAngle + ray * 0.34
      const px = anchor.x + Math.cos(angle) * radius
      const py = anchor.y + Math.sin(angle) * radius
      if (ray === -2) context.moveTo(px, py)
      else context.quadraticCurveTo(anchor.x + direction.x * radius, anchor.y + direction.y * radius, px, py)
    }
    context.stroke()
  }
  context.restore()
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
    }

    const move = (event) => {
      const previousX = mouse.x
      const previousY = mouse.y
      mouse.x = event.clientX
      mouse.y = event.clientY
      visible = true
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
        const endpoint = endpointGeometry(activeWeb.anchor, mouse)
        const rope = makeRope(endpoint.lineStart, mouse)
        const distance = nearestEdge(mouse.x, width).distance
        const tension = clamp(1 - distance / EDGE_RANGE, 0.18, 1)

        drawRope(context, rope, 0.58 + tension * 0.4, shootProgress)
        drawWebSplat(
          context,
          endpoint.webTip,
          activeWeb.edge,
          shootProgress,
          0.72 + shootProgress * 0.28,
          activeWeb.anchor,
        )
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
        const guidePoints = fallingRopePoints(rope)
        const endpoint = endpointGeometry(rope.anchor, guidePoints[1])
        const points = fallingRopePoints({
          ...rope,
          anchor: endpoint.lineStart,
          length: Math.max(1, rope.length - 17),
        })
        drawRope(context, points, opacity)
        drawWebSplat(
          context,
          endpoint.webTip,
          rope.edge,
          opacity * 0.8,
          1,
          rope.anchor,
        )
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
        <span className="spider-cursor__mask">
          <i className="spider-cursor__eye spider-cursor__eye--left" />
          <i className="spider-cursor__eye spider-cursor__eye--right" />
        </span>
      </div>
    </>
  )
}
