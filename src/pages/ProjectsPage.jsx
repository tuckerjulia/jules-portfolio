import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProjectModal from '../components/ProjectModal'
import ImageBanner from '../components/ImageBanner'
import projects from '../data/projects'

const filters = ['All', 'Work', 'University', 'Explorations']

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function ProjectCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false)
  return (
    <motion.button variants={cardVariants} onClick={onClick} className="group text-left">
      <div
        className="w-full aspect-[3/2] overflow-hidden rounded-sm mb-4 bg-stone/5 box-border"
        style={{
          backgroundColor: project.imageBg || undefined,
          padding: project.imagePadding || undefined,
        }}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-stone/25">Image</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.name}
            onError={() => setImgError(true)}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          />
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-xl md:text-2xl font-light group-hover:text-terra transition-colors duration-200 leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.name}
          </h3>
          {project.subtitle && (
            <p className="text-sm font-light text-stone/50 mb-1">{project.subtitle}</p>
          )}
          <p className="text-xs tracking-wide text-stone/40">{project.location}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs tracking-widest uppercase text-stone/35">{project.category}</p>
          <p className="text-xs text-stone/30 mt-0.5">{project.year}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <PageTransition>
      <ImageBanner />
      <section className="pt-8 pb-24 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-sage font-semibold mb-2">Selected Work</p>
            <h1
              className="text-4xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: '#2d2e8c', fontStyle: 'italic' }}
            >
              Projects
            </h1>
          </div>

          <div className="flex gap-6 border-b border-stone/10 pb-0">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`pb-3 text-xs tracking-widest uppercase transition-colors duration-200 border-b-[1.5px] -mb-px ${
                  activeFilter === f
                    ? 'border-gold text-stone'
                    : 'border-transparent text-stone/35 hover:text-stone/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12"
          >
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </motion.div>
        </AnimatePresence>

      </section>


      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
