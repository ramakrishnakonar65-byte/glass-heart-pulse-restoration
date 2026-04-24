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
    value: 96,
    label: "Founder Satisfaction",
    suffix: "%",
    isAnimatedSatisfaction: true,
    tooltip: "Based on post-cohort feedback: 11.5 of 12 founders rated program as 'Highly Satisfied'. Weighted score: 96.2% satisfaction across mentorship, resources, and network quality.",
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
        const target = 96.2
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
              <motion.div
                className="rciif-center-card rounded-xl overflow-hidden shadow-2xl shadow-green-500/10 border border-green-500/20"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }} whileHover={{ scale: 1.03 }}
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-green-900/40 via-[#0a0a0a] to-emerald-900/20 flex flex-col items-center justify-center gap-6 p-8">
                  <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg text-center leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>RCIIF</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>Research Centre for</div>
                    <div className="rciif-accent text-green-400 text-sm mt-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Innovation & Incubation</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {["Est. 2022", "12+ Incubatees", "Kharghar, MH", "DPIIT Backed"].map(tag => (
                      <div key={tag} className="rciif-tag bg-white/5 border border-green-500/20 rounded-lg px-3 py-2 text-center text-xs text-white/70" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{tag}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div className="absolute inset-0 border-2 border-green-500/20 rounded-xl -m-3 z-[-1]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
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
      </motion.div>
    </section>
  )
}
