import { useEffect, useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { getLenis } from "@/lib/lenis"

const steps = [
  {
    number: "01",
    step: "Apply",
    heading: "Tell Us Your Story",
    description: "Submit your application with your idea, team, and vision. Our team reviews every application personally — no automated filters, just real humans looking for real ambition.",
    accent: "Applications reviewed on a rolling basis",
  },
  {
    number: "02",
    step: "Onboard",
    heading: "Join Your Cohort",
    description: "Once selected, you're matched with mentors, introduced to your cohort, and given access to our full resource stack. Orientation week sets the foundation for everything ahead.",
    accent: "Cohorts start every 6 months",
  },
  {
    number: "03",
    step: "Build",
    heading: "Ship What Matters",
    description: "Intensive program weeks focused on product-market fit, customer discovery, and rapid iteration. Weekly mentor sessions and peer accountability keep you moving fast.",
    accent: "6 months of structured growth",
  },
  {
    number: "04",
    step: "Scale",
    heading: "Grow Without Limits",
    description: "Demo Day connects you with investors and press. Post-program, you stay part of the Maverick alumni network — with ongoing access to capital, mentors, and opportunities.",
    accent: "Lifelong access to the Maverick network",
  },
]

function SectionHeader() {
  return (
    <div className="px-4 md:px-8 mb-10 flex-shrink-0">
      <span className="text-green-400 font-[Instrument_Sans] text-sm tracking-widest uppercase">
        The Process
      </span>
      <h2 className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-white mt-2">
        Your 4-Step<br />Success Journey
      </h2>
    </div>
  )
}

function StepCard({ step: s }: { step: typeof steps[0] }) {
  return (
    <div className="relative group">
      <div className="absolute -right-4 -top-4 text-[120px] font-bold font-[Instrument_Serif] text-white/5 leading-none select-none pointer-events-none group-hover:text-green-500/10 transition-colors duration-500">
        {s.number}
      </div>
      <div className="relative z-10">
        <span className="text-green-400 font-[Instrument_Sans] text-xs tracking-[0.2em] uppercase">
          Step {s.number}
        </span>
        <h3 className="text-4xl font-bold font-[Instrument_Serif] text-white mt-3 mb-1">
          {s.step}
        </h3>
        <h4 className="text-xl font-[Instrument_Serif] text-white/70 mb-4">
          {s.heading}
        </h4>
        <p className="text-white/50 font-[Instrument_Sans] text-sm leading-relaxed mb-6">
          {s.description}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-green-400/80 font-[Instrument_Sans] text-xs">
            {s.accent}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function JourneySection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"])

  // Keep framer-motion's useScroll in sync with Lenis-driven scrolling.
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    const onScroll = () => {
      // Lenis already updates window.scrollY; framer reads from it.
    }
    lenis.on("scroll", onScroll)
    return () => {
      lenis.off("scroll", onScroll)
    }
  }, [])

  return (
    <>
      {/* Desktop: scroll-driven horizontal pan */}
      <section
        ref={targetRef}
        className="relative h-[400vh] bg-[#0a0a0a] hidden md:block"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <SectionHeader />
          <div className="overflow-hidden px-8">
            <motion.div style={{ x }} className="flex gap-6 w-max">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className="w-[32vw] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 relative overflow-hidden group hover:border-green-500/40 transition-colors duration-500"
                >
                  <StepCard step={s} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile: touch-scrollable horizontal strip */}
      <section className="bg-[#0a0a0a] py-16 md:hidden">
        <div className="px-4 mb-8">
          <SectionHeader />
        </div>
        <div
          className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {steps.map((s) => (
            <div
              key={s.number}
              className="w-[80vw] flex-shrink-0 snap-start rounded-2xl border border-white/10 bg-white/5 p-6 relative overflow-hidden"
            >
              <StepCard step={s} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((s) => (
            <div key={s.number} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </section>
    </>
  )
}
