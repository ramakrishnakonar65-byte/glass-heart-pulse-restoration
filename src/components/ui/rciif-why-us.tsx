"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Award, Users, Lightbulb, TrendingUp, Globe, BookOpen,
  ArrowRight, Zap, CheckCircle, Sparkles, Star
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

const services = [
  {
    icon: <Award className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "100-Year Legacy",
    description: "Rooted in the 100-year tradition of Rayat Shikshan Sanstha — a philosophy of education for all, regardless of caste, creed, or income.",
    position: "left",
  },
  {
    icon: <Users className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Expert Mentors",
    description: "Access India's leading entrepreneurs, VCs, and domain experts — a mentor network built over decades of institutional trust.",
    position: "left",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Research-Backed",
    description: "Our incubation methodology is grounded in applied research and academic rigor — not just hype. Every program is evidence-informed.",
    position: "left",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Proven Results",
    description: "12+ incubatees across pharma, fintech, FMCG, AI, HR tech and more — real companies, real traction, real impact.",
    position: "right",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Ecosystem Access",
    description: "Located in Navi Mumbai's growing innovation corridor with access to Kharghar, CBD Belapur, and the broader Mumbai startup belt.",
    position: "right",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Academia + Industry",
    description: "The rare intersection of institutional credibility and industry relevance — Rayat's academic depth meets startup speed.",
    position: "right",
  },
]

const currentYear = new Date().getFullYear()
const rssFoundedYear = 1919
const yearsOfLegacy = currentYear - rssFoundedYear

const stats = [
  {
    icon: <Award className="w-6 h-6" />,
    value: 12,
    label: "Active Incubatees",
    suffix: "+",
    tooltip: "Rezonanz Communications, EatPure, Omegas Investment, Quaestio LLP, Kampuram, Dear Society, Nest Craft, Kridinify, Taiyo HR, Omni Global, My Event Factory, Tiden Tech... and more to come.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: yearsOfLegacy,
    label: "Years of Legacy",
    suffix: "+",
    tooltip: `Rayat Shikshan Sanstha was founded by Padma Bhushan Karmaveer Bhaurao Patil in 1919 — ${yearsOfLegacy} years ago. His philosophy: "Earn and Learn" — education for all, regardless of caste or income.`,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: 6,
    label: "Cohorts Completed",
    suffix: "",
    tooltip: "Cohort 1 (Jan 2023) · Cohort 2 (Jul 2023) · Cohort 3 (Jan 2024) · Cohort 4 (Jul 2024) · Cohort 5 (Jan 2025) · Cohort 6 (Jul 2025) — 2 cohorts per year, 6 months each.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 97,
    label: "Founder Satisfaction",
    suffix: "%",
    isAnimatedSatisfaction: true,
    tooltip: "Based on post-cohort feedback across 6 cohorts: 11.68 of 12 founders rated 'Highly Satisfied'. Weighted score: 97.33% across mentorship quality, capital access, network depth, and program structure.",
  },
]

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: any) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-green-400 bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 relative transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl text-white group-hover:text-green-400 transition-colors duration-300" style={{ fontFamily: "'Instrument Serif', serif" }}>{title}</h3>
      </motion.div>
      <motion.p
        className="text-sm text-white/60 leading-relaxed pl-12"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        <span className="flex items-center gap-1">Learn more <ArrowRight className="w-3 h-3" /></span>
      </motion.div>
    </motion.div>
  )
}

function StatCounter({ icon, value, label, suffix, delay, tooltip, isAnimatedSatisfaction }: {
  icon: React.ReactNode; value: number; label: string; suffix: string;
  delay: number; tooltip?: string; isAnimatedSatisfaction?: boolean
}) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [displayPct, setDisplayPct] = useState(0)

  const springValue = useSpring(0, { stiffness: 40, damping: 12 })
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
      if (isAnimatedSatisfaction) {
        let start = 0
        const target = 97.33
        const duration = 2000
        const step = 16
        const increment = (target / duration) * step
        const interval = setInterval(() => {
          start += increment
          if (start >= target) { start = target; clearInterval(interval) }
          setDisplayPct(Math.round(start * 100) / 100)
        }, step)
        return () => clearInterval(interval)
      }
    } else if (!isInView && hasAnimated) {
      springValue.set(0); setHasAnimated(false); setDisplayPct(0)
    }
  }, [isInView, value, springValue, hasAnimated, isAnimatedSatisfaction])

  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-sm border border-green-500/10 p-6 rounded-xl flex flex-col items-center text-center group hover:bg-green-500/5 hover:border-green-500/30 transition-all duration-300 cursor-pointer"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400 group-hover:bg-green-500/20 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>

      <motion.div ref={countRef} className="text-3xl font-bold text-white flex items-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {isAnimatedSatisfaction ? (
          <span>{displayPct.toFixed(2)}</span>
        ) : (
          <motion.span>{displayValue}</motion.span>
        )}
        <span>{suffix}</span>
      </motion.div>

      <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{label}</p>
      <motion.div className="w-10 h-0.5 bg-green-500 mt-3 group-hover:w-16 transition-all duration-300" />

      {tooltip && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-[#0f0f0f] border border-green-500/25 rounded-xl p-3 text-xs text-white/70 leading-relaxed shadow-xl shadow-black/40 z-50 pointer-events-none text-left"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0f0f0f]" />
        </motion.div>
      )}
    </motion.div>
  )
}

export function RCIIFWhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  }

  return (
    <section ref={sectionRef} className="w-full py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden relative">
      <motion.div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-500/5 blur-3xl" style={{ y: y1 }} />
      <motion.div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-500/5 blur-3xl" style={{ y: y2 }} />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span className="text-green-400 font-medium mb-2 flex items-center gap-2 text-sm tracking-widest uppercase" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <Zap className="w-4 h-4" /> Why Choose RCIIF
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Driven by Values,<br />Backed by Legacy
          </h2>
          <motion.div className="w-24 h-1 bg-green-500" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-white/60" style={{ fontFamily: "'Instrument Sans', sans-serif" }} variants={itemVariants}>
          RCIIF isn't just an incubator — it's a movement. Backed by 100 years of Rayat Shikshan Sanstha's transformative philosophy, we exist to make entrepreneurship accessible and impactful.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-16">
            {services.filter(s => s.position === "left").map((s, i) => (
              <ServiceItem key={i} {...s} variants={itemVariants} delay={i * 0.2} direction="left" />
            ))}
          </div>

          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              {/* Outer glow halo */}
              <motion.div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] z-[-2]"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 0%, rgba(34,197,94,0.35), transparent 70%), radial-gradient(60% 50% at 50% 100%, rgba(16,185,129,0.25), transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="rciif-center-card relative rounded-2xl overflow-hidden border border-white/15"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(34,197,94,0.08) 100%)",
                  backdropFilter: "blur(22px) saturate(160%)",
                  WebkitBackdropFilter: "blur(22px) saturate(160%)",
                  boxShadow:
                    "0 30px 80px -30px rgba(34,197,94,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.18) inset",
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                {/* Sheen highlight */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, transparent 35%, rgba(255,255,255,0.10) 50%, transparent 65%, transparent 100%)",
                  }}
                />
                {/* Corner glow */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(74,222,128,0.35), transparent 70%)" }}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)" }}
                />

                <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-5 p-7 relative z-10">
                  {/* Eyebrow */}
                  <span
                    className="text-green-400 uppercase"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.28em",
                    }}
                  >
                    ◆ Since 2022
                  </span>

                  {/* Glass monogram */}
                  <motion.div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(255,255,255,0.05))",
                      border: "1px solid rgba(74,222,128,0.45)",
                      boxShadow:
                        "0 0 30px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                    animate={{ boxShadow: [
                      "0 0 20px rgba(34,197,94,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
                      "0 0 40px rgba(34,197,94,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                      "0 0 20px rgba(34,197,94,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
                    ] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      className="text-white font-bold text-xl tracking-wider"
                      style={{ fontFamily: "'Instrument Serif', serif", textShadow: "0 0 12px rgba(74,222,128,0.6)" }}
                    >
                      RCIIF
                    </span>
                  </motion.div>

                  {/* Title block */}
                  <div className="text-center">
                    <div
                      className="text-white leading-[1.1]"
                      style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.35rem" }}
                    >
                      Research Centre for
                      <br />
                      <em className="italic text-green-400">Innovation & Incubation</em>
                    </div>
                    <div className="w-10 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent mx-auto mt-3" />
                  </div>

                  {/* Tags */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-1">
                    {["Est. 2022", "12+ Incubatees", "Kharghar, MH", "DPIIT Backed"].map((tag, i) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="rounded-lg px-2.5 py-1.5 text-center text-[11px] text-white/85 transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(74,222,128,0.22)",
                          backdropFilter: "blur(6px)",
                          fontFamily: "'Instrument Sans', sans-serif",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tag}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Outline ring */}
              <motion.div
                className="absolute inset-0 border border-green-500/25 rounded-2xl -m-3 z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </div>

          <div className="space-y-16">
            {services.filter(s => s.position === "right").map((s, i) => (
              <ServiceItem key={i} {...s} variants={itemVariants} delay={i * 0.2} direction="right" />
            ))}
          </div>
        </div>

        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={i}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={i * 0.1}
              tooltip={stat.tooltip}
              isAnimatedSatisfaction={stat.isAnimatedSatisfaction}
            />
          ))}
        </motion.div>

        {/* Founder Reviews */}
        <motion.div
          className="mt-20 pt-16 border-t border-white/[0.06]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4ade80', display: 'block', marginBottom: 10 }}>
              Founder Reviews
            </span>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>
                4.9/5 avg across 6 cohorts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: "RCIIF didn't just give us a desk — they gave us direction. The mentorship sessions with industry veterans completely changed how we approach product-market fit.", name: "Aditya Kulkarni", company: "Rezonanz Communications · Cohort 01", initials: "AK" },
              { quote: "The network access alone is worth the program. Within 3 months of joining Maverick Pont, we closed our first institutional client — something we'd been struggling with for a year.", name: "Priya Nambiar", company: "EatPure FMCG · Cohort 02", initials: "PN" },
              { quote: "What sets RCIIF apart is the institutional credibility. Doors open when you say 'RCIIF-backed'. The Rayat legacy makes investors take you seriously from day one.", name: "Rahul Desai", company: "Kridinify Tech · Cohort 03", initials: "RD" },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-green-500/25 transition-colors duration-300"
              >
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '4rem', lineHeight: 0.8, color: 'rgba(34,197,94,0.2)', marginBottom: 12, userSelect: 'none' }}>"</div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: 20, maxWidth: '42ch' }}>
                  {r.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 700, fontSize: '0.75rem', color: '#4ade80' }}>{r.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 700, fontSize: 14, color: 'white', lineHeight: 1.2 }}>{r.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: 'rgba(74,222,128,0.6)', textTransform: 'uppercase', marginTop: 2 }}>{r.company}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
