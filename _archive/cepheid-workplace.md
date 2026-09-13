# Cepheid Workplace — archived project

Removed from the live site on 2026-09-13. Not imported anywhere, so it has zero effect
on the build. Paste the two blocks below back into place to restore it.

## 1. Entry for `src/data/projects.js`

Insert this object into the array (it referenced `id: 10`, which is free again since
removal — reuse it, or pick a new id if another project has since taken it):

```js
{
    id: 10,
    name: 'Cepheid Workplace',
    subtitle: 'Design Partnership',
    category: 'Work',
    location: 'Johannesburg, South Africa',
    year: '2020',
    role: 'Interior Design Intern',
    image: '/projects/cepheid-culross.jpg',
    imageFit: 'contain',
    imageBg: '#FFFFFF',
    imagePadding: '6% 2% 2% 6%',
    imagePaddingMobile: '2% 2% 6% 6%',
    description:
      'A concept-stage workplace design located in Johannesburg, developed in response to the evolving role of the workplace in a post-COVID context. The project translates Cepheid’s brand philosophy into a warm, wellness-driven environment inspired by the character of hospitality. With hybrid working reshaping how people interact with the office, the design focuses on creating a workplace that encourages connection, collaboration and wellbeing, while providing spaces for focus, flexibility and moments of retreat.\n\nRooted in Cepheid’s philosophy of Kaizen (continuous, incremental improvement through empathy and care), the concept is expressed through the idea of “a better business, a better way, a better place.” This philosophy is embodied in the recurring metaphor of an oasis: a place to grow, connect and find moments of calm.\n\nThe design language is shaped by human-centred planning, biophilia, warm and tactile materiality, simplicity and flexibility. Together, these principles create an adaptable workplace that responds to the changing needs of a post-pandemic workforce while reimagining the office as a place people actively want to return to.',
    tags: ['Workplace Design', 'Biophilia', 'Post-Covid Workplace', 'Material Exploration', 'Brand Identity'],
    software: ['AutoCAD', 'Adobe Photoshop', 'Affinity Designer'],
},
```

## 2. Detail block for `src/components/ProjectModal.jsx`

Insert this `project.id === 10 && (...)` block back among the other per-project
detail blocks (it sat right before the `project.id === 9` block):

```jsx
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
    <Img src="/projects/cepheid-culross/insights.jpg" alt="Four workplace insights: evolving office roles, culture and collaboration, accelerating pre-pandemic trends, and hybrid workforce flexibility" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
      Design Principles
    </p>
    <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Kaizen</p>
    <p className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify mb-4">Kaizen is a Japanese business philosophy of continuous, incremental improvement, rooted in simplicity, mindfulness and the belief that small positive changes can create meaningful progress over time.</p>
    <Img src="/projects/cepheid-culross/design-principles.jpg" alt="Five Kaizen design principles: asymmetry, simplicity, naturalness, subtlety, and stillness" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs italic mb-4" style={{ color: '#fdbf69' }}>Workplace Implementation</p>
    <Img src="/projects/cepheid-culross/implementation.jpg" alt="Five Kaizen design principles applied in the workplace: asymmetry, simplicity, naturalness, subtlety, and stillness" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
      Colour & Materiality
    </p>
    <p className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify mb-4">A warm, natural palette with soft pastel colours creates a calm, light-filled and open environment for human wellbeing and productivity.</p>
    <Img src="/projects/cepheid-culross/materiality.jpg" alt="Materiality moodboard: porcelain floor tiles, ceramic wall tiles, frosted glass, timber slats, plywood, cork, OSB, herringbone flooring, window treatment, acoustic absorbers, and colour palette" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs tracking-widest uppercase text-stone/40 mb-1 flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
      Layouts
    </p>
    <div className="flex items-start gap-2 mb-8">
      <div className="w-1/2">
        <p className="text-xs italic mb-1" style={{ color: '#fdbf69' }}>Ground Floor</p>
        <Img src="/projects/cepheid-culross/zoning-legend.jpg" alt="Zoning close-up showing cafe, meeting spaces, outdoor spaces, training space, and reception & foyer" className="w-full h-auto rounded-sm" />
      </div>
      <div className="w-1/2">
        <p className="text-xs italic mb-1" style={{ color: '#fdbf69' }}>First Floor</p>
        <Img src="/projects/cepheid-culross/zoning-legend-first-floor.jpg" alt="Zoning close-up showing meeting spaces, dedicated offices, open plan, wellness cafe & kitchenette, and breakout spaces" className="w-full h-auto rounded-sm" />
      </div>
    </div>
    <p className="text-xs tracking-widest uppercase text-stone/40 mb-4 flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-gold shrink-0" />
      Look & Feel
    </p>
    <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>Ground Floor</p>
    <Img src="/projects/cepheid-culross/ground-floor.jpg" alt="Ground floor layout with programme zones: cafe, meeting spaces, training space, and reception & foyer" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs italic mb-4 ml-4" style={{ color: '#fdbf69' }}>First Floor</p>
    <Img src="/projects/cepheid-culross/first-floor.jpg" alt="First floor layout with programme zones: meeting spaces, dedicated offices, open plan, wellness cafe & kitchenette, and breakout spaces" className="w-full h-auto rounded-sm mb-8" />
    <p className="text-xs tracking-widests uppercase text-stone/40 mb-3">My Role</p>
    <p className="text-[10px] md:text-xs leading-relaxed text-stone/80 text-justify mb-8">I supported the development of the Cepheid workplace concept, helping translate the principles of Kaizen into the spatial design. My role included contributing to the overall design approach, spatial planning, layouts and zoning, as well as researching Cepheid's brand, values and visual identity. I assisted in developing the workplace's look and feel, including the selection of materials, finishes and colour palettes, with a focus on creating a warm, welcoming and wellness-driven environment. I also contributed to the design of key spaces including the reception, wellness café, meeting areas and training spaces, ensuring each responded to its intended function while maintaining a cohesive overall design language.</p>
  </>
)}
```

Note: the source images under `public/projects/cepheid-culross*` were left in place and were not deleted.
