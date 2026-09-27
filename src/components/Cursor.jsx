import { useEffect, useRef, useState } from 'react'

// Trailing cursor ball: a small blue dot that glides after the mouse, grows
// over anything clickable, and grows most over elements marked with
// data-cursor-grow. Desktop (fine pointer) only.
// The dot is drawn at its largest size and scaled down, so it stays crisp when
// it grows (scaling a small element up makes it look pixelated).
const MAX_SCALE = 2.5

export default function Cursor() {
  const dot = useRef(null)
  const [enabled] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  useEffect(() => {
    if (!enabled) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduce ? 1 : 0.18
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let scale = 1
    let targetScale = 1
    let visible = false
    let frame

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) {
        pos.x = target.x
        pos.y = target.y
        visible = true
        dot.current.style.opacity = '1'
      }
      const el = e.target.closest?.('[data-cursor-grow], a, button, input, textarea, select, label, [role="button"], img, video')
      const grow = el?.closest('[data-cursor-grow]')
      targetScale = grow ? MAX_SCALE : el ? 1.6 : 1
    }
    const onLeave = () => {
      visible = false
      dot.current.style.opacity = '0'
    }
    const onDown = () => { targetScale *= 0.8 }
    const onUp = () => { targetScale /= 0.8 }

    const tick = () => {
      pos.x += (target.x - pos.x) * ease
      pos.y += (target.y - pos.y) * ease
      scale += (targetScale - scale) * (reduce ? 1 : 0.15)
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale / MAX_SCALE})`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dot}
        className="absolute top-0 left-0 w-5 h-5 rounded-full bg-terra"
        style={{ opacity: 0, transition: 'opacity 0.3s', willChange: 'transform' }}
      />
    </div>
  )
}
