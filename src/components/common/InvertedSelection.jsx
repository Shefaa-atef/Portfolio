import { useEffect, useState } from 'react'

export default function InvertedSelection() {
  const [rects, setRects] = useState([])

  useEffect(() => {
    const updateSelection = () => {
      const selection = window.getSelection()

      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        setRects(previous => previous.length ? [] : previous)
        return
      }

      const selectionText = selection.toString()
      if (!selectionText || selectionText.trim() === '') {
        setRects(previous => previous.length ? [] : previous)
        return
      }

      try {
        const range = selection.getRangeAt(0)
        const clientRects = Array.from(range.getClientRects())

        const validRects = clientRects
          .filter((rect) => rect.width > 0 && rect.height > 0)
          .map((rect) => ({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }))

        setRects(validRects)
      } catch {
        setRects(previous => previous.length ? [] : previous)
      }
    }

    document.addEventListener('selectionchange', updateSelection)
    window.addEventListener('scroll', updateSelection, { capture: true, passive: true })
    window.addEventListener('resize', updateSelection)

    return () => {
      document.removeEventListener('selectionchange', updateSelection)
      window.removeEventListener('scroll', updateSelection, { capture: true })
      window.removeEventListener('resize', updateSelection)
    }
  }, [])

  if (rects.length === 0) return null

  return (
    <div
      className="inverted-selection-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
        overflow: 'hidden',
      }}
    >
      {rects.map((rect, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            backdropFilter: 'invert(1)',
            WebkitBackdropFilter: 'invert(1)',
            pointerEvents: 'none',
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  )
}
