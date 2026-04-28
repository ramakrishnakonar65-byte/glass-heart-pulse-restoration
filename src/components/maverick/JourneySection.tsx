import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
];

export default function JourneySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });
  const [activeStep, setActiveStep] = useState(0);

  const goTo = useCallback((i: number) => {
    const next = Math.min(Math.max(i, 0), steps.length - 1);
    setActiveStep(next);
    if (!scrollRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    const cardW = (isDesktop ? 380 : window.innerWidth * 0.82) + 24;
    scrollRef.current.scrollTo({ left: next * cardW, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    const cardW = (isDesktop ? 380 : window.innerWidth * 0.82) + 24;
    const idx = Math.round(scrollRef.current.scrollLeft / cardW);
    setActiveStep(Math.min(Math.max(idx, 0), steps.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="px-4 md:px-12 mb-12 max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-green-400 font-[Instrument_Sans] text-sm tracking-widest uppercase block"
        >
          The Process
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-white mt-2 leading-[1.05]"
        >
          Your 4-Step
          <br />
          Success Journey
        </motion.h2>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 md:px-12 pb-6 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex-shrink-0 snap-start w-[82vw] lg:w-[360px] rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-8 transition-colors duration-500 group ${
              activeStep === i ? "border-green-500/50" : "border-white/10 hover:border-green-500/30"
            }`}
          >
            {/* Big watermark number */}
            <div
              className="absolute -right-4 -top-4 text-[120px] font-bold leading-none select-none pointer-events-none text-white/[0.05] group-hover:text-green-500/[0.1] transition-colors duration-500"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {s.number}
            </div>

            className={`relative flex-shrink-0 snap-start w-[82vw] lg:w-[380px] rounded-3xl border p-8 md:p-10 transition-all duration-500 group ${
              activeStep === i
                ? 'border-green-500/60 bg-green-950/20 shadow-[0_0_40px_-12px_rgba(34,197,94,0.35)]'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-green-500/25 hover:bg-white/[0.04]'
            }`}
          >
            {/* Big watermark number */}
            <div
              className="absolute -right-4 -top-4 text-[120px] font-bold leading-none select-none pointer-events-none text-white/[0.05] group-hover:text-green-500/[0.1] transition-colors duration-500"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {s.number}
            </div>

            <div className="relative z-10">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4ade80' }}>
                Step {s.number}
              </span>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 700, fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: 'white', lineHeight: 1.0, marginTop: 12, marginBottom: 4 }}>
                {s.step}
              </h3>
              <h4 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 16, lineHeight: 1.3 }}>
                {s.heading}
              </h4>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: '36ch', marginBottom: 24 }}>
                {s.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-green-400/80 font-[Instrument_Sans] text-xs">
                  {s.accent}
                </span>
              </div>
            </div>

            {/* Active step left border */}
            {activeStep === i && (
              <motion.div
                layoutId="active-step-bar"
                className="absolute left-0 top-6 bottom-6 w-[3px] bg-green-500 rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Navigation arrows + step dots */}
      <div className="flex items-center justify-between px-4 md:px-12 mt-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: activeStep === i ? 32 : 8,
                background: activeStep === i ? "#22c55e" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(activeStep - 1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-green-500/50 hover:text-green-400 transition-colors duration-200"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo(activeStep + 1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-green-500/50 hover:text-green-400 transition-colors duration-200"
            aria-label="Next step"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
