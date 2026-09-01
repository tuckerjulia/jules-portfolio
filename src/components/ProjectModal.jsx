import { useEffect, useRef, useState } from 'react'
import { MdTouchApp } from 'react-icons/md'
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion'

function PerspBanner({ speed = 30 }) {
  const x = useMotionValue(0)
  const imgRef = useRef(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartMotionX = useRef(0)
  const [cursor, setCursor] = useState('grab')

  useAnimationFrame((_, delta) => {
    if (isDragging.current) return
    const img = imgRef.current
    if (!img) return
    const imgWidth = img.naturalWidth / img.naturalHeight * img.offsetHeight
    const next = x.get() - (speed * delta) / 1000
    x.set(next <= -imgWidth ? 0 : next)
  })

  function startDrag(clientX) {
    isDragging.current = true
    dragStartX.current = clientX
    dragStartMotionX.current = x.get()
    setCursor('grabbing')
  }

  function moveDrag(clientX) {
    if (!isDragging.current) return
    const img = imgRef.current
    if (!img) return
    const imgWidth = img.naturalWidth / img.naturalHeight * img.offsetHeight
    let next = dragStartMotionX.current + (clientX - dragStartX.current)
    if (next <= -imgWidth) next += imgWidth
    if (next > 0) next -= imgWidth
    x.set(next)
  }

  function endDrag() {
    isDragging.current = false
    setCursor('grab')
  }

  return (
    <div
      className="w-full overflow-hidden mt-3 select-none"
      style={{ cursor }}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX) }}
      onTouchEnd={endDrag}
    >
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1].map(n => (
          <img
            key={n}
            ref={n === 0 ? imgRef : null}
            src="/projects/jungle-resort/perspectives-strip.webp"
            alt=""
            aria-hidden="true"
            className="h-36 w-auto flex-shrink-0 object-contain pointer-events-none"
            draggable={false}
          />
        ))}
      </motion.div>
    </div>
  )
}


function ImageBanner({ images, speed = 40, onImageClick }) {
  const x = useMotionValue(0)
  const containerRef = useRef(null)
  const doubled = [...images, ...images]

  useAnimationFrame((_, delta) => {
    const container = containerRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    const next = x.get() - (speed * delta) / 1000
    x.set(next <= -halfWidth ? 0 : next)
  })

  return (
    <div className="w-full overflow-hidden">
      <motion.div ref={containerRef} style={{ x }} className="flex gap-3 w-max items-stretch h-48 md:h-64">
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-full w-auto object-cover flex-shrink-0 rounded-sm cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={() => onImageClick(i % images.length)}
          />
        ))}
      </motion.div>
    </div>
  )
}


function PH({ children }) {
  return (
    <span className="relative inline">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full" viewBox="0 0 120 24" preserveAspectRatio="none" style={{ top: '10%', height: '85%' }}>
        <path d="M2,18 C10,8 20,4 40,6 C60,8 80,5 100,7 C112,8 118,12 118,16 C118,20 110,22 90,21 C70,20 40,21 20,20 C8,19 2,21 2,18 Z" fill="#fdbf69" opacity="0.7"/>
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const panel = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: 32, transition: { duration: 0.22, ease: 'easeIn' } },
}

const SITE_GALLERY = [
  '/projects/pavilion-counter/site/site-1.webp',
  '/projects/pavilion-counter/site/site-2.webp',
  '/projects/pavilion-counter/site/site-3.webp',
  '/projects/pavilion-counter/site/site-4.webp',
  '/projects/pavilion-counter/site/site-5.webp',
  '/projects/pavilion-counter/site/site-6.webp',
]

const PAVILION_GALLERY = [
  '/projects/pavilion-counter.webp',
  '/projects/pavilion-counter/pavilion-1.webp',
]

const SHOP_GALLERY = [
  '/projects/tropical-spa/shop-1.webp',
  '/projects/tropical-spa/shop-2.webp',
  '/projects/tropical-spa/shop-3.webp',
]

const TREATMENT_GALLERY = [
  '/projects/tropical-spa/treatment-1.webp',
  '/projects/tropical-spa/treatment-2.webp',
  '/projects/tropical-spa/treatment-3.webp',
  '/projects/tropical-spa/treatment-4.webp',
  '/projects/tropical-spa/treatment-5.webp',
]

const RELAXATION_GALLERY = [
  '/projects/tropical-spa/relaxation-2.webp',
  '/projects/tropical-spa/relaxation-3.webp',
]

const GYM_GALLERY = [
  '/projects/tropical-spa/gym-1.webp',
  '/projects/tropical-spa/gym-2.webp',
]

const RESORT_MAIN_GALLERY = [
  '/projects/jungle-resort/resort-2.webp',
  '/projects/jungle-resort/resort-1.webp',
]

const RESORT_PLANS_GALLERY = [
  '/projects/jungle-resort/floorplan.webp',
  '/projects/jungle-resort/floorplan-2.webp',
]

const SKETCHES_GALLERY = Array.from({ length: 15 }, (_, i) => `/projects/closed-loop-incubator/sketches/${i + 1}.jpg`)

const SIDERIS_SITE_GALLERY = [
  '/projects/sideris-church-foyer/site/site-1.webp',
  '/projects/sideris-church-foyer/site/site-2.webp',
  '/projects/sideris-church-foyer/site/site-3.webp',
]

const SIDERIS_PROPOSED_GALLERY = [
  '/projects/sideris-church-foyer/proposed-layout.webp',
  '/projects/sideris-church-foyer/proposed-movement.webp',
]

const SIDERIS_RENDERS_GALLERY = [
  '/projects/sideris-church-foyer/renders/render-1.webp',
  '/projects/sideris-church-foyer/renders/render-2.webp',
]

export default function ProjectModal({ project, onClose }) {
  // enlargedImg = { src, gallery: string[] | null, index: number }
  const [enlargedImg, setEnlargedImg] = useState(null)
  const [sketchesExpanded, setSketchesExpanded] = useState(false)
  const touchStartX = useRef(null)

  function openEnlarged(src, gallery = null, index = 0) {
    setEnlargedImg({ src, gallery, index })
  }

  function navigateEnlarged(dir) {
    if (!enlargedImg?.gallery) return
    const newIndex = enlargedImg.index + dir
    if (newIndex < 0 || newIndex >= enlargedImg.gallery.length) return
    setEnlargedImg({ ...enlargedImg, src: enlargedImg.gallery[newIndex], index: newIndex })
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { enlargedImg ? setEnlargedImg(null) : onClose() }
      if (e.key === 'ArrowLeft')  navigateEnlarged(-1)
      if (e.key === 'ArrowRight') navigateEnlarged(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, enlargedImg])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const Img = ({ src, alt, className, gallery = null, galleryIndex = 0 }) => (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-zoom-in`}
      onClick={() => openEnlarged(src, gallery, galleryIndex)}
    />
  )

  const hasPrev = enlargedImg?.gallery && enlargedImg.index > 0
  const hasNext = enlargedImg?.gallery && enlargedImg.index < enlargedImg.gallery.length - 1

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div
        className="absolute inset-0 bg-stone/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        variants={panel}
        className="relative bg-offwhite w-full md:max-w-2xl rounded-sm max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone/40 hover:text-stone transition-colors duration-150 text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-8 md:p-12">
          <p className="text-xs tracking-[0.2em] uppercase text-sage font-semibold mb-4">
            {project.category}
          </p>

          <h3
            className="text-4xl md:text-5xl font-light leading-tight mb-1"
            style={{ fontFamily: 'var(--font-display)', color: '#2d2e8c', fontStyle: 'italic' }}
          >
            {project.name}
          </h3>
          {project.subtitle && (
            <p className="text-base font-light text-stone/50 mb-1">{project.subtitle}</p>
          )}
          <p className="text-sm text-stone/50 mb-3">{project.location}</p>
          {project.id === 1 && (
            <p className="text-[10px] font-light text-stone/35 italic mb-3">(disclaimer: the design of this project is copyright and remains the property of Silvio Rech & Lesley Carstens).</p>
          )}
          {project.id === 2 && (
            <p className="text-[10px] font-light text-stone/35 italic mb-3">(disclaimer: the design of this project is copyright and remains the property of Luxury Frontiers).</p>
          )}

          <div className="relative pt-6 border-t border-stone/10 mb-0">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Year', value: project.year },
                ...(project.id !== 2 ? [{ label: 'Area', value: project.area }] : []),
                { label: 'Role', value: project.role },
              ].filter(({ value }) => value).map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs tracking-widest uppercase text-stone/40 mb-1">{label}</p>
                  <p className="text-sm text-stone whitespace-nowrap">{value}</p>
                </div>
              ))}
            </div>
            {project.id === 2 && (
              <img src="/projects/jungle-resort/hummingbird.webp" alt="Hummingbird" className="absolute top-0 right-0 h-40 w-auto object-contain pointer-events-none hidden md:block" />
            )}
          </div>

          {project.software && (
            <div className="py-6 border-b border-stone/10 mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-3">Software</p>
              <div className="flex flex-wrap gap-2">
                {project.software.map(s => (
                  <span key={s} className="text-[10px] md:text-xs tracking-wide lowercase text-sage border border-sage/30 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4 border border-[#fdbf69] rounded-sm px-3 py-2">
            {project.id === 1 ? (
              <p className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify">A luxury spa and wellness center on a private island in the Seychelles, designed in collaboration with Silvio Rech & Lesley Carstens, blending tropical materiality with calm, resort-style interiors across treatment rooms, relaxation areas, a gym, changerooms, thermal suite, and a retail and arrival space.</p>
            ) : (
              project.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify mb-2 last:mb-0">
                  {para.split(project.name).map((chunk, j, arr) => (
                    <span key={j}>
                      {chunk}
                      {j < arr.length - 1 && <em>{project.name}</em>}
                    </span>
                  ))}
                </p>
              ))
            )}
          </div>

          {project.id === 10 && (
            <>
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Brand
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Cepheid</p>
              <p className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify mb-4">Cepheid is a California-based diagnostics company that revolutionised testing through its GeneXpert System and range of on-demand disease tests. Its philosophy is rooted in Kaizen (the continuous pursuit of improvement).</p>
              <Img src="/projects/cepheid-culross/brand.png" alt="Cepheid brand identity — logo, wordmark, and Kaizen philosophy diagram" className="w-2/3 h-auto rounded-sm mb-8 mx-auto" />
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                COVID-19 &amp; Beyond
              </p>
              <div className="flex gap-2 mb-8">
                <Img src="/projects/cepheid-culross/venn-safe-economy.png" alt="Venn diagram of physical, emotional, and cognitive factors converging on the safe economy" className="w-1/2 h-auto rounded-sm" />
                <Img src="/projects/cepheid-culross/venn.png" alt="Venn diagram of placemaking, corporate culture, and best practice converging on work wellness" className="w-1/2 h-auto rounded-sm" />
              </div>
              <p className="text-xs italic mb-4" style={{ color: '#fdbf69' }}>Insights</p>
              <Img src="/projects/cepheid-culross/insights.png" alt="Four workplace insights: evolving office roles, culture and collaboration, accelerating pre-pandemic trends, and hybrid workforce flexibility" className="w-4/5 h-auto rounded-sm mb-8 mx-auto" />
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Design Principles
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Kaizen</p>
              <Img src="/projects/cepheid-culross/design-principles.png" alt="Five Kaizen design principles: asymmetry, simplicity, naturalness, subtlety, and stillness" className="w-full h-auto rounded-sm mb-8" />
              <p className="text-xs italic mb-4" style={{ color: '#fdbf69' }}>Workplace Implementation</p>
              <Img src="/projects/cepheid-culross/implementation.png" alt="Five Kaizen design principles applied in the workplace: asymmetry, simplicity, naturalness, subtlety, and stillness" className="w-full h-auto rounded-sm mb-8" />
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Colour & Materiality
              </p>
              <Img src="/projects/cepheid-culross/materiality.png" alt="Materiality moodboard: porcelain floor tiles, ceramic wall tiles, frosted glass, timber slats, plywood, cork, OSB, herringbone flooring, window treatment, acoustic absorbers, and colour palette" className="w-4/5 h-auto rounded-sm mb-8 mx-auto" />
            </>
          )}

          {project.id === 9 && (
            <>
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Existing Layout
              </p>
              <Img
                src="/projects/sideris-church-foyer/existing-layout.webp"
                alt="Sideris Church Foyer existing layout floor plan"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Site Photos</p>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {SIDERIS_SITE_GALLERY.map((src, i) => (
                  <Img
                    key={src}
                    src={src}
                    alt={`Sideris Church Foyer site photo ${i + 1}`}
                    className="w-full h-auto rounded-sm"
                    gallery={SIDERIS_SITE_GALLERY}
                    galleryIndex={i}
                  />
                ))}
              </div>
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Proposed Layout
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                <Img
                  src="/projects/sideris-church-foyer/proposed-layout.webp"
                  alt="Sideris Church Foyer proposed layout floor plan"
                  className="w-full h-auto rounded-sm"
                  gallery={SIDERIS_PROPOSED_GALLERY}
                  galleryIndex={0}
                />
                <Img
                  src="/projects/sideris-church-foyer/proposed-movement.webp"
                  alt="Sideris Church Foyer proposed layout movement and circulation diagram"
                  className="w-full h-auto rounded-sm"
                  gallery={SIDERIS_PROPOSED_GALLERY}
                  galleryIndex={1}
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Look &amp; Feel
              </p>
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Walls</p>
              <Img
                src="/projects/sideris-church-foyer/walls.webp"
                alt="Sideris Church Foyer wall materiality moodboard"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Lighting</p>
              <Img
                src="/projects/sideris-church-foyer/lighting.webp"
                alt="Sideris Church Foyer lighting moodboard"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Ceiling</p>
              <Img
                src="/projects/sideris-church-foyer/ceiling.webp"
                alt="Sideris Church Foyer ceiling moodboard"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Flooring</p>
              <Img
                src="/projects/sideris-church-foyer/flooring.webp"
                alt="Sideris Church Foyer flooring moodboard"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Visualisations
              </p>
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Axonometric Perspectives</p>
              <Img
                src="/projects/sideris-church-foyer/axo-perspectives.webp"
                alt="Sideris Church Foyer axonometric perspective renders"
                className="w-full h-auto rounded-sm mb-8"
              />
              <p className="text-xs tracking-wide lowercase font-light italic mb-4" style={{ color: '#fdbf69' }}>Renders</p>
              <div className="flex flex-col gap-2 mb-8">
                {SIDERIS_RENDERS_GALLERY.map((src, i) => (
                  <Img
                    key={src}
                    src={src}
                    alt={`Sideris Church Foyer render ${i + 1}`}
                    className="w-full h-auto rounded-sm"
                    gallery={SIDERIS_RENDERS_GALLERY}
                    galleryIndex={i}
                  />
                ))}
              </div>
            </>
          )}

          {project.id === 3 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Sneak Peek through Sketches
              </p>
              {sketchesExpanded && (
                <button
                  onClick={() => setSketchesExpanded(false)}
                  className="block mb-3 text-[10px] tracking-widest uppercase text-stone/35 hover:text-stone/60 transition-colors duration-150"
                >
                  ← collapse
                </button>
              )}
              <AnimatePresence mode="wait">
                {sketchesExpanded ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                  >
                    {SKETCHES_GALLERY.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-full aspect-square object-cover rounded-sm cursor-zoom-in hover:opacity-90 transition-opacity duration-150"
                        onClick={() => openEnlarged(src, SKETCHES_GALLERY, i)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="banner" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
                    <ImageBanner
                      images={SKETCHES_GALLERY}
                      onImageClick={() => setSketchesExpanded(true)}
                    />
                    <div className="absolute top-3 left-3 pointer-events-none z-10">
                      <MdTouchApp size={22} style={{ color: '#fdbf69' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Existing
              </p>
              <Img src="/projects/between-tide-time/existing-user-journey.webp" alt="Existing guestroom user journey and floor plan analysis" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Concept
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Between Tide &amp; Time</p>
              <Img src="/projects/between-tide-time/concept-inspiration.webp" alt="Concept inspiration moodboard: restoration, sanctuary, connection, discovery, purpose" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs italic mb-4" style={{ color: '#fdbf69' }}>Rhythm - Nature Translated</p>
              <p className="text-xs leading-relaxed text-stone/80 text-justify mb-3">Between the <PH>ancient landscape</PH> of <PH>Anantara Sir Bani Yas Island</PH> &amp; the <PH>ever-changing rhythm</PH> of the <PH>Arabian Gulf</PH>, the guestroom is envisioned as a <PH>secluded wilderness sanctuary</PH>.</p>
              <p className="text-xs leading-relaxed text-stone/80 text-justify mb-3">A space that is not inspired by the desert island, but by the <PH>process</PH> that created it.</p>
              <p className="text-xs leading-relaxed text-stone/80 text-justify mb-4">This is celebrated in the interior through <PH>authentic</PH> &amp; <PH>timeless</PH> materials, <PH>texture</PH>, and refined <PH>craftmanship</PH> to create a restorative retreat immersed in nature.</p>
              <p className="text-xs italic text-stone/40 tracking-wide">Timeless &middot; Tactile &middot; Restorative &middot; Immersive</p>
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-wide lowercase font-light italic mb-3" style={{ color: '#fdbf69' }}>Overall Look &amp; Feel</p>
              <Img src="/projects/between-tide-time/look-feel.webp" alt="Look and feel moodboard: organic forms inspired by the surroundings" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Zoning
              </p>
              <Img src="/projects/between-tide-time/zoning-options.webp" alt="Zoning options 01 and 02 with circulation diagrams" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Spatial Configuration
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Exploration</p>
              <Img src="/projects/between-tide-time/spatial-exploration.webp" alt="Spatial configuration exploration sketches with design questions" className="w-full h-auto rounded-sm" />
              <p className="text-xs italic mt-6 mb-4 ml-4" style={{ color: '#fdbf69' }}>Final</p>
              <Img src="/projects/between-tide-time/spatial-final.webp" alt="Final guestroom spatial layout with circulation diagram" className="w-full h-auto rounded-sm" />
              <Img src="/projects/between-tide-time/spatial-final-annotated.webp" alt="Annotated final floor plan with furniture and joinery notes" className="w-full h-auto rounded-sm mt-2" />
              <Img src="/projects/between-tide-time/final-user-journey.webp" alt="Final user journey with circulation path through the guestroom" className="w-full h-auto rounded-sm mt-2" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Material Palette
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Shaped by Nature</p>
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 items-start">
                <Img src="/projects/between-tide-time/material-palette.webp" alt="Material palette moodboard with color swatches, timber, stone and textiles" className="w-full h-auto rounded-sm" />
                <div>
                  <p className="text-[10px] italic text-stone/70 leading-tight"><PH>Earth</PH> &ndash; The Memory of Time</p>
                  <p className="text-[10px] leading-tight text-stone/80 text-justify">Materials that feel ancient &amp; grounded.</p>
                  <p className="text-[10px] italic text-stone/40 tracking-wide mb-2">Permanent &middot; Warm &middot; Tactile</p>
                  <p className="text-[10px] italic text-stone/70 leading-tight"><PH>Water</PH> &ndash; The Rhythm of Tide</p>
                  <p className="text-[10px] leading-tight text-stone/80 text-justify">Materials that create softness &amp; movement.</p>
                  <p className="text-[10px] italic text-stone/40 tracking-wide mb-2">Calm &middot; Fluid &middot; Restorative</p>
                  <p className="text-[10px] italic text-stone/70 leading-tight"><PH>Craft</PH> &ndash; The Human Touch</p>
                  <p className="text-[10px] leading-tight text-stone/80 text-justify">Materials that celebrate artisanship.</p>
                  <p className="text-[10px] italic text-stone/40 tracking-wide">Authentic &middot; Personal &middot; Memorable</p>
                </div>
              </div>
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                FF&amp;E
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Refreshments &amp; Wardrobe</p>
              <Img src="/projects/between-tide-time/ffe-refreshments-wardrobe.webp" alt="Refreshments and wardrobe FF&E moodboard with arrival narrative, joinery, and styling details" className="w-full h-auto rounded-sm" />
              <p className="text-xs italic mt-6 mb-4 ml-4" style={{ color: '#fdbf69' }}>Bedroom</p>
              <Img src="/projects/between-tide-time/ffe-bedroom.webp" alt="Bedroom FF&E moodboard with lighting, textiles, bed, and furniture details" className="w-full h-auto rounded-sm" />
              <p className="text-xs italic mt-6 mb-4 ml-4" style={{ color: '#fdbf69' }}>Bathroom</p>
              <Img src="/projects/between-tide-time/ffe-bathroom.webp" alt="Bathroom FF&E moodboard with fixtures, stone surfaces, and rainfall shower details" className="w-full h-auto rounded-sm" />
              <p className="text-xs italic mt-6 mb-4 ml-4" style={{ color: '#fdbf69' }}>Balcony</p>
              <Img src="/projects/between-tide-time/ffe-balcony.webp" alt="Balcony FF&E moodboard with lounge furniture and natural textures" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Art Direction
              </p>
              <div className="relative overflow-hidden">
                <Img src="/projects/between-tide-time/art-direction.webp" alt="Art direction moodboard: fragments of the island with abstract landscapes and wildlife photography" className="w-full h-auto rounded-sm mt-12 md:mt-0" />
                <div className="absolute top-0 left-0 px-3 py-2 md:px-4 md:py-3 max-w-[70%] md:max-w-xs">
                  <p className="text-xs italic mb-0 leading-tight" style={{ color: '#fdbf69' }}>Fragments of the Island</p>
                  <ul className="text-[8px] md:text-[10px] text-stone/70 leading-tight list-disc pl-4 space-y-0.5 mt-0.5">
                    <li>Abstract desert landscapes</li>
                    <li>Wildlife photography</li>
                    <li>Geological studies</li>
                    <li>Handmade Emirati crafts</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {project.id === 7 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                The Renovated Guestroom
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Between Tide &amp; Time</p>
              <p className="text-xs leading-relaxed text-stone/80 text-justify mb-4">A <PH>private refuge</PH> where guests <PH>wake with the desert</PH>, <PH>retreat with the tide</PH>, &amp; experience the <PH>timeless beauty of the Anantara Sir Bani Yas Island</PH>.</p>
              <Img src="/projects/between-tide-time/color-palette-banner.webp" alt="Color palette banner with five material and mood swatches" className="w-full h-auto rounded-sm" />
            </div>
          )}

          {project.id === 2 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">01</span>Resort Main Area
              </p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Img src="/projects/jungle-resort/resort-2.webp" alt="Resort main area aerial" className="w-full h-auto rounded-sm" gallery={RESORT_MAIN_GALLERY} galleryIndex={0} />
                <Img src="/projects/jungle-resort/resort-1.webp" alt="Resort main area" className="w-full h-auto rounded-sm" gallery={RESORT_MAIN_GALLERY} galleryIndex={1} />
              </div>
              <p className="text-[10px] font-light text-stone/35 italic mb-4">(disclaimer: render was produced by an internal employee).</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Img src="/projects/jungle-resort/floorplan.webp" alt="Resort floor plan" className="w-full h-auto rounded-sm" gallery={RESORT_PLANS_GALLERY} galleryIndex={0} />
                  <p className="text-[9px] font-light text-stone/35 italic mt-1">ground floor plan - NTS</p>
                </div>
                <div>
                  <Img src="/projects/jungle-resort/floorplan-2.webp" alt="Resort floor plan 2" className="w-full h-auto rounded-sm" gallery={RESORT_PLANS_GALLERY} galleryIndex={1} />
                  <p className="text-[9px] font-light text-stone/35 italic mt-1">first floor plan - NTS</p>
                </div>
              </div>
              <p className="text-xs tracking-wide lowercase font-light italic mt-6" style={{ color: '#fdbf69' }}>perspectives</p>
              <PerspBanner />
              <p className="text-xs tracking-wide lowercase font-light italic mt-8" style={{ color: '#fdbf69' }}>Look &amp; Feel</p>
              <p className="text-xs font-light leading-relaxed text-stone/70 text-justify mt-2 mb-3">The design features a natural material palette, rich in organic textures and earthy tones, complemented by vibrant pops of colour. This contrast brings energy and visual interest to the space, while allowing the warmth and authenticity of the natural materials to remain the foundation of the overall aesthetic.</p>
              <img src="/projects/jungle-resort/look-feel.webp" alt="Look and feel" className="w-full h-auto rounded-sm" />
              <p className="text-xs tracking-widest uppercase text-stone/40 mt-8 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">02</span>Resort Accommodation Units
              </p>
              <p className="text-xs font-light leading-relaxed text-stone/70 text-justify mt-3">The Resort Interior colour palette is inspired by the vibrant colours of the flowers native to the Puerto Rican rainforest. These forms are celebrated through the natural patterns and lively colours scattered through the Orocovis rainforest.</p>
              <Img src="/projects/jungle-resort/accommodation.webp" alt="Resort accommodation floor plan" className="w-full h-auto rounded-sm" />
              <p className="text-[9px] font-light text-stone/35 italic mt-1">ground floor plan - NTS</p>
              <p className="text-xs tracking-wide lowercase font-light italic mt-6" style={{ color: '#fdbf69' }}>Materiality</p>
              <div className="grid grid-cols-10 gap-1 sm:gap-3 mt-3">
                {[
                  { name: 'Timber Floor Insert',       img: 'swatch-1.webp'  },
                  { name: 'Ceiling Texture',            img: 'swatch-2.webp'  },
                  { name: 'Shower Tiles',               img: 'swatch-3.webp'  },
                  { name: 'Parota Timber Furniture',    img: 'swatch-4.webp'  },
                  { name: 'Colour Details',             img: 'swatch-5.webp'  },
                  { name: 'Daybed Upholstery',          img: 'swatch-6.webp'  },
                  { name: 'Exterior Balustrade',        img: 'swatch-7.webp'  },
                  { name: 'Textured Timber Wardrobe',   img: 'swatch-8.webp'  },
                  { name: 'Natural Upholstery',         img: 'swatch-9.webp'  },
                  { name: 'Cementitious Finish',        img: 'swatch-10.webp' },
                ].map(({ name, img }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <img src={`/projects/jungle-resort/swatches/${img}`} alt={name} className="w-full aspect-square object-cover rounded-sm" />
                    <p className="text-[6px] sm:text-[8px] text-center text-stone/60 leading-tight italic">{name}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs tracking-wide lowercase font-light italic mt-6" style={{ color: '#fdbf69' }}>Bedroom</p>
              <Img src="/projects/jungle-resort/bedroom.webp" alt="Bedroom sketch" className="w-full h-auto mt-3 rounded-sm" />
              <Img src="/projects/jungle-resort/bedroom-elevation.webp" alt="Bedroom elevation" className="w-full h-auto mt-2 rounded-sm" />
              <p className="text-[9px] font-light text-stone/35 italic mt-1">bed elevation - NTS</p>
              <Img src="/projects/jungle-resort/bedroom-render.webp" alt="Bedroom render" className="w-full h-auto mt-2 rounded-sm" />
              <p className="text-[10px] font-light text-stone/35 italic mt-1">(disclaimer: render was produced by an internal employee).</p>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-wide lowercase font-light italic mb-1" style={{ color: '#fdbf69' }}>Floor Plan</p>
              <p className="text-xs text-stone/40 italic mb-3">(concealed for confidentiality purposes)</p>
              <svg viewBox="0 0 9693 4374" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto rounded-sm" style={{fontFamily:"'Poppins', system-ui, sans-serif"}}>
                <g transform="matrix(1,0,0,1,-17957.001442,-3593.152831)">
                  <g transform="matrix(1,0,0,1,-15354.998558,-372.847169)">
                    <path d="M33563,5167L33593,5228L33595,5356L33605,5508L33647,5721L33676,5834L33752,6052L33836,6248L33902,6356L33936,6402L33700,6576L33712,6597L33715,6601L33726,6593L33814,6829L33687,6970L33740,7076L33786,7217L33806,7310L33829,7386L33875,7464L33928,7516L34008,7564L34085,7592L34135,7599L34201,7591L34255,7581L34287,7582L34317,7582L34382,7603L34421,7636L34461,7681L34511,7767L34551,7825L34623,7875L34697,7904L34763,7911L34827,7908L34895,7883L34945,7870L34973,7861L35026,7864L35101,7885L35190,7945L35286,8020L35341,8055L35420,8085L35477,8093L35555,8089L35597,8083L35660,8056L35714,8023L35742,8001L35790,7964L35809,7953L35832,7934L35857,7913L35904,7885L35965,7866L36015,7860L36069,7867L36114,7882L36163,7899L36213,7907L36266,7911L36318,7900L36381,7875L36442,7833L36480,7790L36521,7727L36538,7697L36553,7671L36574,7647L36593,7629L36635,7604L36673,7589L36704,7582L36733,7582L36824,7596L36862,7597L36905,7594L36969,7579L37009,7562L37052,7534L37103,7493L37135,7459L37161,7419L37186,7368L37200,7312L37213,7245L37227,7188L37252,7114L37275,7057L37296,7020L37319,6972L37196,6824L37281,6593L37289,6601L37308,6575L37174,6477L37989,6427L38009,6518L38052,6619L38090,6692L38171,6777L38212,6811L39666,6809L39721,6758.582L39771,6708L39825,6625L39855,6555L39885,6452L39895,6365L39896,6312L39880,6217L39817,6072L39767,5986L39727,5940L39664,5886L39587,5836L39436,5838L39436,5781L39267,5781L39270,5451.194L39333,5356L39418,5327L39463,5190L39463,5171.602L39476,5142L39481,5142L39483,5147L39484,5151L39520,5130L39565,5104L39599,5081L39615,5110L39634,5171.602L39661,5252L39696,5327L39760,5435L39795,5488L39842,5554L39901,5622L39955,5676L39996,5711L39966,5768L39945,5824L39923,5910L39908,6006L39908,6073L39916,6184L39938,6275L39964,6346L39976,6383L40004,6431L40054,6510L40098,6567L40151,6613L40210,6663L40331,6735L40378,6758.582L40416,6771L40447,6692L40491,6715L40541,6745L40597,6797L40646,6846L40689,6910L40713,6952L40733,6992L40777,6976L40792,7009L40844,7121L40873,7176L40911,7256L40944,7359L40957,7421L40969,7486L40988,7625L40994,7662L41009,7736L41026,7831L41044,7912L41071,8034L41090,8130L40617,8238L40633,8315L41111,8209L41122,8259L41325,8215L41313,8161L41806,8047L41788,7971L41294,8084L41239,7846L41206,7668L41174,7462L41136,7275L41088,7144L41042,7049L40987,6937L40973,6905L41022,6890L41012,6790L41018,6742L41025,6704L41034,6667L41047,6632.367L41072,6584L41097,6549L41159,6610L41211,6560L41249,6513L41282,6467L41333,6373L41378,6248L41392,6170L41401,6066L41398,5984L41387,5926L41368,5850L41344,5784L41330,5742L41279,5654L41244,5606L41206,5561L41151,5510L41113,5477L41258,5228L42656,6032L42676,5994L42619,5959.349L42980,5330L41051,4225L41023,4274L40942,4229L40885,4207L40865,4205L40837,4205L40802,4210L40762,4225L40738,4240L40706,4269L40676,4319L40659,4378L40659,4407L40665,4441L40685,4486L40690,4493L40642,4498L40606,4512L40569,4532L40531,4572L40509,4610L40498,4642L40494,4678L40500,4723L40516,4767L40540,4805L40570,4831L40596,4850L41039,5103L40895,5354L40783,5326L40684,5315L40618,5315L40530,5325L40481,5335L40373,5371L40274,5419L40229,5451.194L40166,5500L40127,5465L40090,5424L40052,5379L40008,5315L39958,5229L39908,5122L39875,5020L39846,4955L39796,4876L39779,4860L39820,4701L39822,4630L39817,4540L39794,4449L39767,4380L39717,4381L39700,4382L39666,4383L39632,4373L39601,4351L39512,4284L39447,4251L39404,4213L39298,4100L39213,4050L39135,4018L39050,4000L38966,3991L38894,3994L38810,4006L38683,4036L38602,4080L38534,4143.805L38459,4229L38486,4255L38416,4336L38282,4424L38097,4487L38032,4493L37975,4492L37918,4481L37865,4464L37756,4398L37687,4332L37603,4266L37534,4219L37502,4208L37461,4193L37462,4153L37388,4131L37282,4119L37232,4117L37147,4126L37074,4143.805L37010,4171L36938,4210L36866,4275L36833,4327L36780,4431L36746,4531L36721,4640L36706,4711L36736,4714L36724,4790L36530,4788L36489,4830L36368,4854L36186,4824L36184,4719L36021,4720L36016,4672L36010,4631L35999,4579L35984,4532L35956,4470L35914,4408L35822,4316L35766,4276L35696,4241L35612,4216L35533,4204L35441,4210L35365,4222L35277,4255L35215,4293L35133,4361L35086,4418L35059,4456L35034,4502L35004,4592L34993,4643L34989,4694L34989,4720L34819,4719L34820,4827L34637,4856L34428,4806L34410,4787L34399,4780L34384,4774L34368,4772L34160,4772L34159,4732L34148,4691L34142,4673L34131,4638L34121,4618L34125,4615L34095,4560L34074,4535L34036,4493L33994,4460L33959,4436L33891,4406L33842,4391L33794,4384L33757,4382L33697,4386L33642,4398L33602,4410L33559,4429L33516,4455L33484,4481L33431,4534L33398,4583L33377,4620L33360,4663L33347,4710L33339,4753L33338,4790L33337,4824L33340,4855L33345,4881L33352,4912L33361,4934L33390,5000L33422,5049L33456,5087L33466,5081L33496,5108L33521,5127L33556,5148L33563,5167Z" style={{fill:'none',stroke:'rgb(253,191,104)',strokeWidth:'50px'}}/>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,17032.281051,64.983183)">
                    <text x="282.957" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Yoga</text>
                    <text x="257.795" y="1083.06" fontSize="40" fill="rgb(77,77,77)">Pavilion</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,18667.937007,760.460234)">
                    <text x="253.621" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Relaxation</text>
                    <text x="310.663" y="1083.06" fontSize="40" fill="rgb(77,77,77)">Area</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,18638.437417,2502.983183)">
                    <text x="260.041" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Treatment</text>
                    <text x="295.803" y="1083.06" fontSize="40" fill="rgb(77,77,77)">Rooms</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,20523.465071,64.983183)">
                    <text x="260.375" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Thermal</text>
                    <text x="293.755" y="1083.06" fontSize="40" fill="rgb(77,77,77)">Suite</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,21918.357001,223.983183)">
                    <text x="256.577" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Reception</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,22094.648081,734.478796)">
                    <text x="263.829" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Shop</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,22094.648081,1754.478796)">
                    <text x="272.869" y="1039.06" fontSize="40" fill="rgb(77,77,77)">BOH</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,23989.939161,1361.478796)">
                    <text x="251.708" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Arrival</text>
                  </g>
                  <g transform="matrix(4.166667,0,0,4.166667,25025.939161,395.460234)">
                    <text x="267.269" y="1039.06" fontSize="40" fill="rgb(77,77,77)">Gym</text>
                  </g>
                </g>
              </svg>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-wide lowercase font-light italic mb-2" style={{ color: '#fdbf69' }}>Materiality</p>
              <p className="text-xs leading-relaxed text-stone/60 text-justify mb-4">The material palette celebrates the natural beauty of the site, incorporating locally sourced elements such as rockwork and the golden, swaying Alang Alang grass, creating a harmonious connection between the architecture and its surroundings.</p>
              <div className="grid grid-cols-9 gap-1 sm:gap-3">
                {[
                  { name: 'Internal Rockwork', img: 'swatch-2.webp' },
                  { name: 'Alang Alang',        img: 'swatch-1.webp' },
                  { name: 'White Marble',        img: 'swatch-3.webp' },
                  { name: 'Iroko / Teak',        img: 'swatch-4.webp' },
                  { name: 'Granite',             img: 'swatch-5.webp' },
                  { name: 'Rough Plaster',       img: 'swatch-6.webp' },
                  { name: 'External Rockwork',   img: 'swatch-7.webp' },
                  { name: 'Ergon Oros',          img: 'swatch-8.webp' },
                  { name: 'Green Marble',        img: 'swatch-9.webp' },
                ].map(({ name, img }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <img src={`/projects/tropical-spa/swatches/${img}`} alt={name} className="w-full aspect-square object-cover rounded-sm" />
                    <p className="text-[6px] sm:text-[8px] text-center text-stone/60 leading-tight italic">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">01</span>Spa Arrival
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Shop</p>
              <Img src="/projects/tropical-spa/shop-1.webp" alt="Spa shop" className="w-full h-auto rounded-sm mb-2" gallery={SHOP_GALLERY} galleryIndex={0} />
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[2, 3].map((n, i) => (
                  <Img key={n} src={`/projects/tropical-spa/shop-${n}.webp`} alt={`Spa shop view ${n}`} className="w-full h-auto rounded-sm" gallery={SHOP_GALLERY} galleryIndex={i + 1} />
                ))}
              </div>
              <a
                href="/projects/tropical-spa/shop-display-counter.pdf"
                download
                className="inline-flex items-center gap-1 text-[8px] tracking-widest lowercase text-sage border border-sage/30 px-2 py-1 rounded-sm hover:bg-sage/5 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                download technical drawing
              </a>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">02</span>Treatment Room
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Double treatment room</p>
              <Img src="/projects/tropical-spa/treatment-1.webp" alt="Double treatment room" className="w-full h-auto rounded-sm mb-2" gallery={TREATMENT_GALLERY} galleryIndex={0} />
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[2, 3, 4, 5].map((n, i) => (
                  <Img key={n} src={`/projects/tropical-spa/treatment-${n}.webp`} alt={`Double treatment room view ${n}`} className="w-full h-auto rounded-sm" gallery={TREATMENT_GALLERY} galleryIndex={i + 1} />
                ))}
              </div>
              <a
                href="/projects/tropical-spa/double-treatment-room.pdf"
                download
                className="inline-flex items-center gap-1 text-[8px] tracking-widest lowercase text-sage border border-sage/30 px-2 py-1 rounded-sm hover:bg-sage/5 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                download technical drawing
              </a>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">03</span>Relaxation Area
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Changeroom 01</p>
              <Img src="/projects/tropical-spa/relaxation-2.webp" alt="Relaxation area view 1" className="w-full h-auto rounded-sm mb-2" gallery={RELAXATION_GALLERY} galleryIndex={0} />
              <Img src="/projects/tropical-spa/relaxation-3.webp" alt="Relaxation area view 2" className="w-full h-auto rounded-sm mb-4" gallery={RELAXATION_GALLERY} galleryIndex={1} />
              <a
                href="/projects/tropical-spa/relaxation-changeroom-01.pdf"
                download
                className="inline-flex items-center gap-1 text-[8px] tracking-widest lowercase text-sage border border-sage/30 px-2 py-1 rounded-sm hover:bg-sage/5 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                download technical drawing
              </a>
            </div>
          )}

          {project.id === 1 && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-stone/25 mr-1">04</span>Gym
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Changeroom 02</p>
              <Img src="/projects/tropical-spa/gym-1.webp" alt="Gym changeroom 02" className="w-full h-auto rounded-sm mb-2" gallery={GYM_GALLERY} galleryIndex={0} />
              <Img src="/projects/tropical-spa/gym-2.webp" alt="Gym changeroom 02 view 2" className="w-full h-auto rounded-sm mb-4" gallery={GYM_GALLERY} galleryIndex={1} />
              <a
                href="/projects/tropical-spa/gym-changeroom-02.pdf"
                download
                className="inline-flex items-center gap-1 text-[8px] tracking-widest lowercase text-sage border border-sage/30 px-2 py-1 rounded-sm hover:bg-sage/5 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                download technical drawing
              </a>
            </div>
          )}

          {project.id === 8 && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Pavilion Floor Plan
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Brainstorming</p>
              <Img src="/projects/pavilion-counter/brainstorming.webp" alt="Brainstorming sketch on pavilion floor plan" className="w-full h-auto rounded-sm mb-4" />
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Rendered Floor Plan</p>
              <Img src="/projects/pavilion-counter/floor-plan.webp" alt="Rendered pavilion floor plan" className="w-full h-auto rounded-sm mb-4" />
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Pavilion
              </p>
              <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Counter</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Img src="/projects/pavilion-counter.webp" alt="Pavilion counter and BBQ" className="w-full h-auto rounded-sm" gallery={PAVILION_GALLERY} galleryIndex={0} />
                <Img src="/projects/pavilion-counter/pavilion-1.webp" alt="Pavilion dining area" className="w-full h-auto rounded-sm" gallery={PAVILION_GALLERY} galleryIndex={1} />
              </div>
              <a
                href="/projects/pavilion-counter/pavilion-bbq-counter-detail.pdf"
                download
                className="inline-flex items-center gap-1 text-[8px] tracking-widest lowercase text-sage border border-sage/30 px-2 py-1 rounded-sm hover:bg-sage/5 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                download technical drawing
              </a>
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-1 mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
                Site Photos
              </p>
              <div className="mt-4 overflow-hidden">
                <div className="flex gap-2 w-max animate-marquee hover:[animation-play-state:paused]">
                  {[...SITE_GALLERY, ...SITE_GALLERY].map((src, i) => (
                    <Img
                      key={i}
                      src={src}
                      alt={`Pavilion site photo ${(i % SITE_GALLERY.length) + 1}`}
                      className="h-40 w-auto rounded-sm shrink-0"
                      gallery={SITE_GALLERY}
                      galleryIndex={i % SITE_GALLERY.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {project.myRole && (
            <div className="mb-8">
              <p className="text-xs tracking-widests uppercase text-stone/40 mb-3">My Role</p>
              {project.id === 1 ? (
                <>
                  <p className="text-xs leading-relaxed text-stone/80 text-justify mb-4">I was responsible for the interior design of the Spa (budget of $10 million), working alongside my interior designer colleague. My scope included the <PH>schematic design, custom design and detailing of the joinery and FF&E, furniture selection and layout, reflected ceiling plans, and coordination of plumbing and electrical layouts.</PH> I also prepared room, door, and window schedules (with custom door details), vanity basin matrix, tender documentation, and 3D renderings and visualisations.</p>
                  <p className="text-xs leading-relaxed text-stone/80 text-justify">In addition, I developed client presentations, responded to RFIs, and maintained communication with contractors and the wider project team to ensure the seamless delivery of the Spa interiors.</p>
                </>
              ) : (
                project.myRole.split('\n\n').map((para, i) => (
                  <p key={i} className="text-xs leading-relaxed text-stone/80 text-justify mb-4 last:mb-0">{para}</p>
                ))
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[8px] tracking-wide lowercase text-sage border border-sage/30 px-1.5 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.id === 3 && (
            <div className="mt-4">
              <a
                href="/projects/closed-loop-incubator.pdf"
                download
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View Project
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}

          {project.id === 4 && (
            <div className="mt-4">
              <a
                href="/projects/motion-picture-museum.pdf"
                download
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View Project
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}

          {project.id === 5 && (
            <div className="mt-4">
              <a
                href="/projects/hatfield-wayste.pdf"
                download
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View Project
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}

          {project.id === 6 && (
            <div className="mt-4">
              <a
                href="/projects/creative-incubator.pdf"
                download
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View Project
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}

          {project.id === 1 && (
            <div className="mt-4">
              <a
                href="/projects/tropical-spa.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View More
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}


          {project.id === 2 && (
            <div className="mt-4">
              <a
                href="/projects/jungle-resort.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 text-xs tracking-wide lowercase italic text-stone/70 hover:text-stone/90 transition-colors duration-150 bg-[#fdbf69]/20 hover:bg-[#fdbf69]/35 px-3 py-1.5 rounded-sm"
              >
                View More
                <MdTouchApp size={16} style={{ color: '#fdbf69' }} />
              </a>
            </div>
          )}

        </div>
      </motion.div>

      <AnimatePresence>
        {enlargedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setEnlargedImg(null)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 50) navigateEnlarged(diff > 0 ? 1 : -1)
              touchStartX.current = null
            }}
          >
            <motion.img
              key={enlargedImg.src}
              src={enlargedImg.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-full max-h-full object-contain rounded-sm cursor-default ${project.id === 7 ? 'bg-white' : ''}`}
              onClick={e => e.stopPropagation()}
            />

            {/* Prev arrow */}
            {hasPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateEnlarged(-1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-150 p-2"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next arrow */}
            {hasNext && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateEnlarged(1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-150 p-2"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Dot indicators */}
            {enlargedImg.gallery && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {enlargedImg.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setEnlargedImg({ ...enlargedImg, src: enlargedImg.gallery[i], index: i }) }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${i === enlargedImg.index ? 'bg-white' : 'bg-white/30'}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setEnlargedImg(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-150 text-xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
