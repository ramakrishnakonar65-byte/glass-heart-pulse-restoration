"use client"
import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion"

const milestones = [
  {
    number: "01",
    year: "1919",
    title: "Rayat Shikshan Sanstha Founded",
    description: "Founded by Padma Bhushan Karmaveer Bhaurao Patil. Philosophy: 'Earn and Learn' — education for all, regardless of caste or income. A movement that transformed Maharashtra's rural communities.",
    side: "right" as const,
  },
  {
    number: "02",
    year: "2010s",
    title: "Innovation Vision Emerges",
    description: "Recognising that education alone wasn't enough, Rayat leadership envisioned an ecosystem bridging academic knowledge with entrepreneurship and technology innovation for the 21st century.",
    side: "left" as const,
  },
  {
    number: "03",
    year: "2022",
    title: "RCIIF Established",
    description: "The Research Centre for Innovation & Incubation Foundation is formally established at Kharghar, Navi Mumbai. Mission: To find, fund, and mentor great young companies.",
    side: "right" as const,
  },
  {
    number: "04",
    year: "2023",
    title: "Maverick Pont Launched",
    description: "RCIIF's flagship incubation program launches — a structured cohort-driven program offering mentorship, capital access, co-working space, and a curated startup community.",
    side: "left" as const,
  },
  {
    number: "05",
    year: "2024–25",
    title: "12+ Incubatees, Growing Ecosystem",
    description: "RCIIF's portfolio grows to 12+ active incubatees across pharma, fintech, AI, FMCG, HR tech, legal consulting, and event management — a truly diverse innovation ecosystem.",
    side: "right" as const,
  },
]

function MilestoneCard({ milestone }: { milestone: typeof milestones[0] }) {
  return (
    <motion.div
      className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 overflow-hidden group"
      whileHover={{
        borderColor: "rgba(34,197,94,0.35)",
        backgroundColor: "rgba(34,197,94,0.04)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="absolute -top-3 -right-2 text-[72px] font-bold leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-green-500/[0.07] transition-colors duration-500" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {milestone.number}
      </div>

      <div className="relative z-10 pl-3">
        <div className="inline-flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 rounded-full px-3 py-1 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-green-400 text-xs font-bold tracking-wider" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{milestone.year}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>{milestone.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{milestone.description}</p>
      </div>
    </motion.div>
  )
}

/* Geometry shared between zigzag line + dot positions */
const ROW_H = 240
const TOP = 60
const CX_LEFT = 24
const CX_RIGHT = 40

function dotPositions(count: number) {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < count; i++) {
    // alternate left/right of the center column to create the zigzag
    const x = i % 2 === 0 ? CX_LEFT : CX_RIGHT
    pts.push({ x, y: TOP + i * ROW_H })
  }
  return pts
}

function ZigzagLine({ count, progress }: { count: number; progress: any }) {
  const pts = dotPositions(count)
  const totalH = TOP + (count - 1) * ROW_H + TOP
  // Build a smooth zigzag using quadratic curves between alternating sides
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const cur = pts[i]
    const midY = (prev.y + cur.y) / 2
    d += ` C ${prev.x},${midY} ${cur.x},${midY} ${cur.x},${cur.y}`
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ height: totalH, width: 64 }}>
      <svg width="64" height={totalH} className="overflow-visible">
        <path d={d} stroke="rgba(34,197,94,0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <motion.path
          d={d}
          stroke="rgba(34,197,94,0.25)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: progress, filter: "blur(4px)" }}
        />
        <motion.path
          d={d}
          stroke="#22c55e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  )
}

function TimelineDot({ milestone, index, progress, count }: {
  milestone: typeof milestones[0]; index: number; progress: any; count: number
}) {
  // Dot activates exactly when line reaches it
  const threshold = count > 1 ? index / (count - 1) : 0
  const fill = useTransform(progress, (v: number) => v >= threshold ? 1 : 0)
  const bg = useTransform(fill, [0, 1], ["#0a0a0a", "#22c55e"])
  const textColor = useTransform(fill, [0, 1], ["#22c55e", "#0a0a0a"])
  const pts = dotPositions(count)
  const offsetX = pts[index].x - 32

  return (
    <motion.div
      style={{
        backgroundColor: bg,
        transform: `translateX(${offsetX}px)`,
      }}
      className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center z-10 relative shadow-lg shadow-green-500/25 transition-colors"
    >
      <motion.span
        style={{ color: textColor, fontFamily: "'Instrument Serif', serif" }}
        className="font-bold text-xs"
      >
        {milestone.number}
      </motion.span>
    </motion.div>
  )
}

function TimelineRow({ milestone, index, progress, count }: {
  milestone: typeof milestones[0]; index: number; progress: any; count: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: "0px 0px -120px 0px" })
  const isLeft = milestone.side === "left"

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_64px_1fr] items-start gap-0 mb-0">
      <div className={`py-10 pr-8 ${isLeft ? "flex justify-end" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
            className="w-full max-w-sm"
          >
            <MilestoneCard milestone={milestone} />
          </motion.div>
        )}
      </div>

      <div className="flex flex-col items-center pt-10">
        <TimelineDot milestone={milestone} index={index} progress={progress} count={count} />
      </div>

      <div className={`py-10 pl-8 ${!isLeft ? "flex justify-start" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
            className="w-full max-w-sm"
          >
            <MilestoneCard milestone={milestone} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function RCIIFStoryTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // End offset pulled in so the line completes when the LAST card (point 5) is in view
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.75", "end 0.85"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 })

  return (
    <section className="w-full py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-green-400 text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Our Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Built on a<br />100-Year Legacy
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto" />
        </motion.div>

        <div ref={wrapperRef} className="relative">
          <ZigzagLine count={milestones.length} progress={progress} />
          {milestones.map((m, i) => (
            <TimelineRow key={i} milestone={m} index={i} progress={progress} count={milestones.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
