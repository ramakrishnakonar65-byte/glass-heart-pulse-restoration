import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Shield } from "lucide-react";

const STATS = [
  { end: 12, suffix: "+", label: "Startups Incubated" },
  { end: 12, prefix: "₹", suffix: "Cr+", label: "Funding Facilitated" },
  { end: 6, suffix: "", label: "Sectors Covered" },
  { end: 3, suffix: "", label: "States Active" },
];

function useCounter(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function StatCounter({
  end,
  prefix = "",
  suffix = "",
  label,
  active,
  delay,
  index,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  active: boolean;
  delay: number;
  index: number;
}) {
  const value = useCounter(end, active);
  const accent = index % 2 === 0 ? "#22c55e" : "#0a0a0a";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="text-left rounded-xl bg-white/60"
      style={{ borderTop: `2px solid ${accent}`, padding: "24px 20px" }}
    >
      <div className="relative inline-block">
        {active && (
          <span
            aria-hidden
            className="counter-pulse absolute inset-0"
            style={{ animationDelay: `${delay}s` }}
          />
        )}
        <div className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] relative">
          {prefix}
          {value}
          {suffix}
        </div>
      </div>
      <div className="text-xs md:text-sm font-[Instrument_Sans] text-[#0a0a0a]/55 uppercase tracking-widest mt-2">
        {label}
      </div>
    </motion.div>
  );
}

export default function IdentitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full py-20 md:py-28 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <span data-reveal data-delay="0" className="text-green-600 font-[Instrument_Sans] text-sm tracking-widest uppercase block">
              Our Identity
            </span>
            <h2 data-reveal data-delay="100" className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mt-2 mb-6 leading-[1.05]">
              From Kharghar
              <br />
              to the World
            </h2>
            <p data-reveal data-delay="200" className="text-[#0a0a0a]/65 font-[Instrument_Sans] text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              RCIIF is a DPIIT-recognised incubator under Rayat Shikshan Sanstha —
              a 100+ year legacy of education, applied to the work of building
              the next generation of Indian companies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                data-reveal="left"
                data-delay="300"
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(184,136,44,0.08)' }}
                className="p-5 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-[Instrument_Serif] font-bold text-[#0a0a0a] text-lg mb-1">
                  Legacy
                </h4>
                <p className="text-[#0a0a0a]/65 font-[Instrument_Sans] text-sm leading-relaxed">
                  100+ years of Rayat Shikshan Sanstha — institutional depth, not a sprint.
                </p>
              </motion.div>
              <motion.div
                data-reveal="left"
                data-delay="400"
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(184,136,44,0.08)' }}
                className="p-5 rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-white"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-[Instrument_Serif] font-bold text-[#0a0a0a] text-lg mb-1">
                  Trust
                </h4>
                <p className="text-[#0a0a0a]/65 font-[Instrument_Sans] text-sm leading-relaxed">
                  DPIIT recognised. 80G &amp; 12A registered. Audited governance.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — stats card */}
          <motion.div
            data-reveal="right"
            data-delay="200"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-green-50/50 via-white to-white p-8 md:p-10 shadow-sm">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-[#0a0a0a] text-white text-xs font-[Instrument_Sans] tracking-widest uppercase">
                In Numbers
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {STATS.map((s, i) => (
                  <StatCounter key={s.label} {...s} active={inView} delay={i * 0.15} index={i} />
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-gray-100 text-[#0a0a0a]/55 font-[Instrument_Sans] text-xs tracking-widest uppercase">
                Cohort 01 — Live · Cohort 02 — Open
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
