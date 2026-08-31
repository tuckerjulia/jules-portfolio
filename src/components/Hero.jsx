import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import photo from '../assets/photo.jpg'

function PH({ children }) {
  return (
    <span className="relative inline-block">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full" viewBox="0 0 120 24" preserveAspectRatio="none" style={{ top: '10%', height: '85%' }}>
        <path d="M2,18 C10,8 20,4 40,6 C60,8 80,5 100,7 C112,8 118,12 118,16 C118,20 110,22 90,21 C70,20 40,21 20,20 C8,19 2,21 2,18 Z" fill="#fdbf69" opacity="0.7"/>
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}

function PhotoLightbox({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <motion.img
        src={photo}
        alt="Jules Tucker"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-full max-h-full object-contain rounded-sm cursor-default"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-150 text-xl leading-none"
        aria-label="Close"
      >
        ✕
      </button>
    </motion.div>
  )
}

export default function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="px-6 md:px-16 pt-24 md:pt-20 pb-16 max-w-5xl mx-auto">
      {/* Mobile: photo + name side by side */}
      <div className="flex flex-row gap-5 items-end md:hidden mb-6">
        <div className="shrink-0">
          <img
            src={photo}
            alt="Jules Tucker"
            className="w-32 rounded-sm block cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
        </div>
        <div>
          <h1
            className="text-4xl font-light leading-tight mb-2"
            style={{ fontFamily: 'var(--font-display)', color: '#2d2e8c', fontStyle: 'italic' }}
          >
            Jules Tucker
          </h1>
          <p className="text-sm font-light tracking-wide text-stone/60">Interior Designer</p>
        </div>
      </div>

      {/* Mobile: bio below */}
      <div className="md:hidden space-y-4 mb-6">
        <p className="text-xs font-light leading-relaxed text-stone/80 text-justify">
          My name is Jules, a South African trained Interior Architect passionate about <PH>storytelling</PH> and <PH>crafting</PH> spaces through the lens of <PH>human wellbeing</PH> &amp; <PH>sustainability</PH>. After gaining three years of professional experience, earning my LEED Green Associate credential, and graduating Cum Laude with my Honours in Interior Architecture, I have developed a strong commitment to designing interiors that exceed client expectations.
        </p>
        <p className="text-xs font-light leading-relaxed text-stone/80 text-justify">
          My work spans luxury residential and commercial projects across the world, where I have had the creative freedom to explore bespoke design solutions and refine my ability to craft detail-driven spaces that engage and inspire. My design approach blends <PH>aesthetics</PH>, <PH>comfort</PH>, <PH>place-making</PH> and <PH>brand identity</PH> to create <PH>meaningful</PH>, <PH>human-centred</PH> environments that tell <PH>stories</PH>. I am committed to delivering spaces that positively impact both their users and the environment.
        </p>
      </div>

      {/* Desktop: original layout */}
      <div className="hidden md:flex flex-row gap-16 items-end">
        <div className="md:sticky md:top-20 shrink-0">
          <img
            src={photo}
            alt="Jules Tucker"
            className="w-80 rounded-sm block cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
        </div>
        <div className="flex flex-col justify-start space-y-6">
          <div>
            <h1
              className="text-7xl font-light leading-tight mb-3"
              style={{ fontFamily: 'var(--font-display)', color: '#2d2e8c', fontStyle: 'italic' }}
            >
              Jules Tucker
            </h1>
            <p className="text-lg font-light tracking-wide text-stone/60">Interior Designer</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-light leading-relaxed text-stone/80 text-justify">
              My name is Jules, a South African trained Interior Architect passionate about <PH>storytelling</PH> and <PH>crafting</PH> spaces through the lens of <PH>human wellbeing</PH> &amp; <PH>sustainability</PH>. After gaining three years of professional experience, earning my LEED Green Associate credential, and graduating Cum Laude with my Honours in Interior Architecture, I have developed a strong commitment to designing interiors that exceed client expectations.
            </p>
            <p className="text-sm font-light leading-relaxed text-stone/80 text-justify">
              My work spans luxury residential and commercial projects across the world, where I have had the creative freedom to explore bespoke design solutions and refine my ability to craft detail-driven spaces that engage and inspire. My design approach blends <PH>aesthetics</PH>, <PH>comfort</PH>, <PH>place-making</PH> and <PH>brand identity</PH> to create <PH>meaningful</PH>, <PH>human-centred</PH> environments that tell <PH>stories</PH>. I am committed to delivering spaces that positively impact both their users and the environment.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && <PhotoLightbox onClose={() => setLightboxOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
