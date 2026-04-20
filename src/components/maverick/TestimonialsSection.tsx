import * as React from "react"
import { motion, PanInfo } from "framer-motion"

interface Testimonial {
  id: number | string
  name: string
  role: string
  company: string
  avatar: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rezonanz Communications",
    role: "Healthcare Comms",
    company: "Cohort 2",
    avatar: "/images/logos/rezonanz.jpg",
    quote: "Maverick Pont gave us the structure we were missing. We closed our seed round 3 months after demo day."
  },
  {
    id: 2,
    name: "EatPure",
    role: "FMCG",
    company: "Cohort 3",
    avatar: "/images/logos/eatpure.jpg",
    quote: "The mentor network is unreal. One intro from the program led to our first enterprise client worth ₹40L."
  },
  {
    id: 3,
    name: "Kridinify Tech",
    role: "AI / Enterprise",
    company: "Cohort 4",
    avatar: "/images/logos/kridinify.jpg",
    quote: "I walked in with an idea. I walked out with a product, a team, and investors on my cap table."
  },
  {
    id: 4,
    name: "Kampuram",
    role: "EdTech",
    company: "Cohort 5",
    avatar: "/images/logos/kampuram.jpg",
    quote: "The cohort community is something else. We still collaborate weekly even after graduating the program."
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [exitX, setExitX] = React.useState(0)

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80) {
      setExitX(info.offset.x > 0 ? 300 : -300)
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length)
        setExitX(0)
      }, 250)
    }
  }

  return (
    <section className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div data-reveal data-delay="0" className="flex flex-col items-center mb-16">
          <span className="text-green-400 font-[Instrument_Sans] text-sm tracking-widest uppercase mb-3">Founder Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-center mb-4">They Built Here.<br />So Can You.</h2>
          <div className="w-20 h-0.5 bg-green-500 mt-2" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Card Stack */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[380px] h-72 flex-shrink-0 mx-auto">
            {testimonials.map((t, index) => {
              const offset = (index - currentIndex + testimonials.length) % testimonials.length
              if (offset > 2) return null
              const isCurrent = offset === 0
              return (
                <motion.div
                  key={t.id}
                  data-reveal="scale"
                  data-delay={`${Math.min(index * 100, 600)}`}
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing"
                  style={{ zIndex: 3 - offset }}
                  drag={isCurrent ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={isCurrent ? handleDragEnd : undefined}
                  animate={{
                    scale: 1 - offset * 0.04,
                    y: offset * 12,
                    opacity: 1 - offset * 0.25,
                    x: isCurrent ? exitX : 0,
                    rotate: isCurrent ? exitX / 25 : -offset * 2,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <p className="text-white/80 text-sm leading-relaxed font-[Instrument_Sans] italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-lg object-cover bg-white border border-green-500/30 p-0.5" />
                    <div>
                      <div className="text-white font-semibold text-sm font-[Instrument_Serif]">{t.name}</div>
                      <div className="text-green-400 text-xs font-[Instrument_Sans]">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Active testimonial detail */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl font-[Instrument_Serif] text-white leading-snug"
            >
              "{testimonials[currentIndex].quote}"
            </motion.blockquote>
            <motion.div key={`meta-${currentIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-white font-semibold font-[Instrument_Serif] text-lg">{testimonials[currentIndex].name}</div>
              <div className="text-green-400 font-[Instrument_Sans] text-sm">{testimonials[currentIndex].role} · {testimonials[currentIndex].company}</div>
            </motion.div>
            <div className="flex gap-2 mt-4 justify-center md:justify-start">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-green-400 w-12" : "bg-white/20 w-8"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
