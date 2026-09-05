import profileImg from '../assets/jules-profile.jpg'

export default function About() {
  return (
    <section id="about" className="px-6 md:px-16 pt-0 pb-20 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-sage font-semibold pt-1">About Me</p>
          <img src={profileImg} alt="Jules" className="w-full object-cover rounded" />
        </div>
        <div className="space-y-4">
          <p className="text-sm md:text-base font-light leading-relaxed text-stone/80">
            My name is Jules, a South African trained Interior Architect passionate about crafting
            spaces through the lens of human wellbeing and sustainability. After gaining three years
            of professional practice, earning my LEED Green Associate credential, and graduating
            Cum Laude with my Honours in Interior Architecture, I have developed a strong commitment
            to designing interiors that exceed client expectations.
          </p>
          <p className="text-sm md:text-base font-light leading-relaxed text-stone/80">
            My work spans luxury hospitality and residential projects across the world, where I have
            had the creative freedom to explore bespoke design solutions and refine my ability to
            craft detail-driven spaces that engage and inspire those who experience them. My design
            approach blends aesthetics, comfort, and brand identity to create meaningful,
            human-centered environments. I am committed to delivering spaces that positively impact
            both their users and the environment, and I plan to continue advancing my sustainability
            and wellbeing expertise through LEED AP ID+C and WELL AP credentials.
          </p>
        </div>
      </div>
    </section>
  )
}
