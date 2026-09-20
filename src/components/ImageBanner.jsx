import { useRef, useState, useCallback } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

const bannerImages = Array.from({ length: 14 }, (_, i) => `/banner/${i + 1}.webp`)

export default function ImageBanner({ speed = 40 }) {
  const x = useMotionValue(0)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartMotionX = useRef(0)
  const [cursor, setCursor] = useState('grab')

  useAnimationFrame((_, delta) => {
    if (isDragging.current) return
    const container = containerRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    const next = x.get() - (speed * delta) / 1000
    x.set(next <= -halfWidth ? 0 : next)
  })

  const startDrag = useCallback((clientX) => {
    isDragging.current = true
    dragStartX.current = clientX
    dragStartMotionX.current = x.get()
    setCursor('grabbing')
  }, [x])

  const moveDrag = useCallback((clientX) => {
    if (!isDragging.current) return
    const container = containerRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    let next = dragStartMotionX.current + (clientX - dragStartX.current)
    if (next <= -halfWidth) next += halfWidth
    if (next > 0) next -= halfWidth
    x.set(next)
  }, [x])

  const endDrag = useCallback(() => {
    isDragging.current = false
    setCursor('grab')
  }, [])

  const images = [...bannerImages, ...bannerImages]

  return (
    <div
      className="w-full overflow-hidden pt-14 pb-4 select-none relative"
      style={{ cursor }}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX) }}
      onTouchEnd={endDrag}
    >
      <div className="absolute bottom-7 right-3 z-10 pointer-events-none">
        <span style={{ color: '#fdbf69', fontSize: '18px', lineHeight: 1 }}>↔</span>
      </div>

      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-4 w-max"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="h-48 md:h-72 w-[18rem] md:w-[28rem] flex-shrink-0 overflow-hidden rounded-sm"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
