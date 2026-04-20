"use client"
import React, { useState, useEffect, useMemo, useRef } from "react"
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion"
import Lottie from "lottie-react"
import dataVizAnimation from "@/assets/Data_Visualization.json"

const INCUBATEES = [
  { name: "Rezonanz", sector: "Healthcare Comms", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Rezonanz&backgroundColor=22c55e&textColor=ffffff" },
  { name: "Quaestio LLP", sector: "Research", logo: "https://api.dicebear.com/7.x/initials/svg?seed=QL&backgroundColor=059669&textColor=ffffff" },
  { name: "Omegas", sector: "FinTech", logo: "https://api.dicebear.com/7.x/initials/svg?seed=OI&backgroundColor=10b981&textColor=ffffff" },
  { name: "EatPure", sector: "FMCG", logo: "https://api.dicebear.com/7.x/initials/svg?seed=EP&backgroundColor=34d399&textColor=000000" },
  { name: "Kampuram", sector: "Digital Mktg", logo: "https://api.dicebear.com/7.x/initials/svg?seed=KP&backgroundColor=22c55e&textColor=ffffff" },
  { name: "Dear Society", sector: "Legal", logo: "https://api.dicebear.com/7.x/initials/svg?seed=DS&backgroundColor=16a34a&textColor=ffffff" },
  { name: "Nest Craft", sector: "Digital Mktg", logo: "https://api.dicebear.com/7.x/initials/svg?seed=NC&backgroundColor=15803d&textColor=ffffff" },
  { name: "Kridinify", sector: "AI Tech", logo: "https://api.dicebear.com/7.x/initials/svg?seed=KT&backgroundColor=4ade80&textColor=000000" },
  { name: "Taiyo HR", sector: "HR Tech", logo: "https://api.dicebear.com/7.x/initials/svg?seed=TH&backgroundColor=22c55e&textColor=ffffff" },
  { name: "Omni Global", sector: "FinTech", logo: "https://api.dicebear.com/7.x/initials/svg?seed=OG&backgroundColor=059669&textColor=ffffff" },
  { name: "My Event", sector: "Events", logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME&backgroundColor=10b981&textColor=ffffff" },
  { name: "Tiden Tech", sector: "IT Services", logo: "https://api.dicebear.com/7.x/initials/svg?seed=TT&backgroundColor=34d399&textColor=000000" },
]

const TOTAL = 12
const IMG_SIZE = 70
type Phase = "scatter" | "line" | "circle"

function IncubateeCard({ src, name, sector, index, target }: {
  src: string; name: string; sector: string; index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number }
}) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{ position: "absolute", width: IMG_SIZE, height: IMG_SIZE + 28 }}
      className="cursor-pointer group"
    >
      <motion.div className="relative h-full w-full flex flex-col items-center"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        <div className="w-[70px] h-[70px] rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-lg shadow-green-500/10 bg-[#0a0a0a] group-hover:border-green-500/60 transition-all duration-300">
          <img src={src} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="text-white text-[9px] font-bold whitespace-nowrap" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{name}</div>
          <div className="text-green-400 text-[8px] whitespace-nowrap" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{sector}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

export function RCIIFIncubatees() {
  const [phase, setPhase] = useState<Phase>("scatter")
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)
  const MAX_SCROLL = 2400

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(entries => {
      setContainerSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height })
    })
    obs.observe(containerRef.current)
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const next = scrollRef.current + e.deltaY
      // Allow page to scroll past when at boundaries
      if (next <= 0 && e.deltaY < 0) {
        scrollRef.current = 0
        virtualScroll.set(0)
        return
      }
      if (next >= MAX_SCROLL && e.deltaY > 0) {
        scrollRef.current = MAX_SCROLL
        virtualScroll.set(MAX_SCROLL)
        return
      }
      e.preventDefault()
      scrollRef.current = Math.min(Math.max(next, 0), MAX_SCROLL)
      virtualScroll.set(scrollRef.current)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [virtualScroll])

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 })
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360])
  const smoothRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 })

  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 80)
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [mouseX])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 400)
    const t2 = setTimeout(() => setPhase("circle"), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const scatterPositions = useMemo(() => INCUBATEES.map(() => ({
    x: (Math.random() - 0.5) * 1200, y: (Math.random() - 0.5) * 800,
    rotation: (Math.random() - 0.5) * 120, scale: 0.5, opacity: 0,
  })), [])

  const [morphVal, setMorphVal] = useState(0)
  const [rotateVal, setRotateVal] = useState(0)
  const [parallax, setParallax] = useState(0)
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1])
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0])

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphVal)
    const u2 = smoothRotate.on("change", setRotateVal)
    const u3 = smoothMouseX.on("change", setParallax)
    return () => { u1(); u2(); u3() }
  }, [smoothMorph, smoothRotate, smoothMouseX])

  return (
    <section className="w-full py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 mb-12 text-center">
        <span className="text-green-400 text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Portfolio</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Our Incubatees</h2>
        <div className="w-20 h-0.5 bg-green-500 mx-auto mb-4" />
        <p className="text-white/50 text-sm max-w-md mx-auto" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Scroll inside the canvas to explore our portfolio. Hover any logo to see details.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full bg-[#050505] overflow-hidden" style={{ height: '520px', cursor: 'crosshair' }}>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={phase === "circle" && morphVal < 0.5 ? { opacity: 1 - morphVal * 2, y: 0 } : { opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-xl text-white/60"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              12 Companies. One Mission.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase === "circle" && morphVal < 0.5 ? { opacity: 0.4 - morphVal } : { opacity: 0 }}
              className="mt-3 text-xs tracking-widest text-green-400 uppercase"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Scroll to explore ↓
            </motion.p>
          </div>

          <motion.div style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[8%] z-10 text-center pointer-events-none px-4"
          >
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>Our Growing Portfolio</h3>
            <p className="text-sm text-white/50" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Across 8+ sectors · Navi Mumbai & beyond</p>
          </motion.div>

          <div className="relative flex items-center justify-center w-full h-full">
            {INCUBATEES.map((inc, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 }

              if (phase === "scatter") {
                target = scatterPositions[i]
              } else if (phase === "line") {
                const spacing = 85
                const total = TOTAL * spacing
                target = { x: i * spacing - total / 2, y: 0, rotation: 0, scale: 1, opacity: 1 }
              } else {
                const w = containerSize.width; const h = containerSize.height
                const isMobile = w < 768
                const minD = Math.min(w, h)
                const circleR = Math.min(minD * 0.32, 280)
                const circleAngle = (i / TOTAL) * 360
                const circleRad = (circleAngle * Math.PI) / 180
                const circlePos = {
                  x: Math.cos(circleRad) * circleR,
                  y: Math.sin(circleRad) * circleR,
                  rotation: circleAngle + 90,
                }

                const baseR = Math.min(w, h * 1.5)
                const arcR = baseR * (isMobile ? 1.3 : 1.05)
                const apexY = h * 0.22
                const arcCenterY = apexY + arcR
                const spread = isMobile ? 95 : 120
                const startAngle = -90 - spread / 2
                const step = spread / (TOTAL - 1)
                const scrollProgress = Math.min(Math.max(rotateVal / 360, 0), 1)
                const maxRot = spread * 0.8
                const bounded = -scrollProgress * maxRot
                const arcAngle = startAngle + i * step + bounded
                const arcRad = (arcAngle * Math.PI) / 180

                const arcPos = {
                  x: Math.cos(arcRad) * arcR + parallax,
                  y: Math.sin(arcRad) * arcR + arcCenterY,
                  rotation: arcAngle + 90,
                  scale: isMobile ? 1.3 : 1.6,
                }

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphVal),
                  y: lerp(circlePos.y, arcPos.y, morphVal),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
                  scale: lerp(1, arcPos.scale, morphVal),
                  opacity: 1,
                }
              }

              return (
                <IncubateeCard
                  key={i} src={inc.logo} name={inc.name} sector={inc.sector} index={i} target={target}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl mt-16 px-4">
        <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/30 to-[#0a0a0a] p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 z-10">
            <span className="text-green-400 text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Applications Open</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Ready to Join<br />Our Portfolio?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Apply to Maverick Pont — RCIIF's flagship incubation program. Limited seats per cohort. Rolling applications reviewed by our team personally.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScf9cywkF4ygMmKM6u3A42fqhrvv9lKsVgGomo_HV-ssvZ9HQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 text-base"
              style={{ fontFamily: "'Instrument Sans', sans-serif", boxShadow: "0 0 24px rgba(34,197,94,0.3)" }}
            >
              Apply to Maverick Pont →
            </a>
          </div>

          <div className="flex-shrink-0 w-48 md:w-72 opacity-90">
            <Lottie
              animationData={dataVizAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-900/15 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
