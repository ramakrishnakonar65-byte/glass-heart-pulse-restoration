"use client"
import { useState, useEffect, useRef } from "react"
import { Rocket, TrendingUp, Building2, Users, BookOpen, Zap } from "lucide-react"

const activities = [
  {
    id: 1, title: "Incubation", date: "Core Program", icon: Rocket,
    content: "We provide structured incubation support through Maverick Pont — our flagship cohort program offering workspace, mentorship, legal support, and go-to-market strategy for early-stage startups.",
    category: "Programs", relatedIds: [2, 3], status: "completed" as const, energy: 95,
    detail: "6-month cohorts, 2× per year, 12+ incubatees per batch",
  },
  {
    id: 2, title: "Mentorship", date: "Ongoing", icon: Users,
    content: "Our curated mentor network connects founders with seasoned entrepreneurs, domain experts, VCs, and industry leaders for 1:1 guidance across product, funding, and growth.",
    category: "Support", relatedIds: [1, 4], status: "in-progress" as const, energy: 88,
    detail: "50+ active mentors across sectors",
  },
  {
    id: 3, title: "Research", date: "Academic", icon: BookOpen,
    content: "Grounded in Rayat Shikshan Sanstha's academic depth, we conduct applied research in innovation ecosystems, startup success factors, and technology commercialisation.",
    category: "Research", relatedIds: [1, 5], status: "in-progress" as const, energy: 80,
    detail: "Research publications, whitepapers & case studies",
  },
  {
    id: 4, title: "Funding", date: "Capital", icon: TrendingUp,
    content: "We connect our portfolio companies with angels, VCs, government grants (DPIIT, SIDBI, BIRAC), and strategic investors through curated demo days and investor meets.",
    category: "Finance", relatedIds: [2, 5], status: "pending" as const, energy: 75,
    detail: "Access to ₹5Cr+ in funding opportunities",
  },
  {
    id: 5, title: "Ecosystem", date: "Network", icon: Building2,
    content: "We build the broader innovation ecosystem — hosting events, training programs, hackathons, and institution partnerships that strengthen the startup culture in Navi Mumbai and beyond.",
    category: "Community", relatedIds: [3, 4], status: "pending" as const, energy: 85,
    detail: "30+ events, partnerships with 10+ institutions",
  },
]

const statusStyles = {
  "completed": "text-white bg-green-600 border-green-500",
  "in-progress": "text-black bg-green-300 border-green-400",
  "pending": "text-white bg-green-900/50 border-green-700/50",
}

const statusLabels = {
  "completed": "ACTIVE",
  "in-progress": "GROWING",
  "pending": "EXPANDING",
}

export function RCIIFWhatWeDo() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const angleRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const speedRef = useRef(0.35)

  useEffect(() => {
    const tick = () => {
      angleRef.current = (angleRef.current + speedRef.current) % 360
      setRotationAngle(angleRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const getPosition = (index: number) => {
    const baseAngles = [90, 162, 234, 306, 18]
    const angle = (baseAngles[index] + rotationAngle) % 360
    const radius = 210
    const rad = (angle * Math.PI) / 180
    const x = radius * Math.cos(rad)
    const y = radius * Math.sin(rad)
    const zIndex = Math.round(100 + 50 * Math.cos(rad))
    const opacity = Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(rad)) / 2)))
    return { x, y, zIndex, opacity }
  }

  const handleClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedId === id) {
      setExpandedId(null); setActiveId(null)
      speedRef.current = 0.35
    } else {
      setExpandedId(id); setActiveId(id)
      speedRef.current = 0
    }
  }

  return (
    <section
      className="w-full py-24 px-4 bg-[#050505] text-white relative isolate overflow-hidden"
      onMouseEnter={() => { if (!expandedId) speedRef.current = 0.08 }}
      onMouseLeave={() => { if (!expandedId) speedRef.current = 0.35 }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-green-400 text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <Zap className="w-4 h-4" /> Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>What We Do</h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto mb-4" />
          <p className="text-white/50 max-w-xl mx-auto text-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Click any node to explore what we do. RCIIF operates across five key pillars.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative flex items-center justify-center"
          style={{ height: '560px' }}
          onClick={(e) => {
            if (e.target === containerRef.current) {
              setExpandedId(null); setActiveId(null)
              speedRef.current = 0.35
            }
          }}
        >
          <div className="absolute w-96 h-96 rounded-full border border-white/5" />
          <div className="absolute w-80 h-80 rounded-full border border-white/5" />

          <div className="absolute z-20 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-xl shadow-green-500/30">
              <div className="absolute w-24 h-24 rounded-full border border-green-400/30 animate-ping opacity-50" />
              <div className="absolute w-28 h-28 rounded-full border border-green-400/20 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
              <div className="text-center">
                <div className="text-white font-bold text-xs leading-tight" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>RCIIF</div>
                <div className="text-green-200 text-[9px]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>FOUNDATION</div>
              </div>
            </div>
          </div>

          {activities.map((item, index) => {
            const pos = getPosition(index)
            const isExpanded = expandedId === item.id
            const isActive = activeId === item.id
            const Icon = item.icon

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 30 : Math.min(pos.zIndex, 25),
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => { if (!expandedId) setActiveId(null) }}
                onClick={(e) => handleClick(item.id, e)}
              >
                <div
                  className={`absolute rounded-full transition-all duration-300 ${isActive || isExpanded ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    width: `${item.energy * 0.4 + 50}px`,
                    height: `${item.energy * 0.4 + 50}px`,
                    left: `-${(item.energy * 0.4 + 50 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 50 - 40) / 2}px`,
                    background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0) 70%)',
                  }}
                />

                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isExpanded ? 'bg-green-500 text-black border-green-400 scale-150 shadow-lg shadow-green-500/40'
                    : isActive ? 'bg-green-500/20 text-green-400 border-green-400/60 scale-110'
                    : 'bg-black text-white/80 border-white/20'}`}
                >
                  <Icon size={20} />
                </div>

                <div className={`absolute top-16 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${isExpanded ? 'text-green-400 scale-110' : 'text-white/60'}`}
                  style={{ left: '50%', transform: isExpanded ? 'translateX(-50%) scale(1.1)' : 'translateX(-50%)', fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {item.title}
                </div>

                {isActive && !isExpanded && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-xs px-3 py-1.5 rounded-full shadow-lg z-40 pointer-events-none" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {item.category}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                  </div>
                )}

                {isExpanded && (
                  <div className="absolute z-40 w-72 bg-[#0f0f0f] border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/10 p-5"
                    style={{ top: '80px', left: '50%', transform: 'translateX(-50%)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-green-500" />

                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-2 py-0.5 rounded-full text-xs font-bold border ${statusStyles[item.status]}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                        {statusLabels[item.status]}
                      </div>
                      <span className="text-xs text-white/40" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{item.date}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 border border-green-500/20">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>{item.title}</h4>
                        <p className="text-xs text-green-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{item.detail}</p>
                      </div>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed mb-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{item.content}</p>

                    <div className="pt-3 border-t border-white/5">
                      <div className="flex justify-between text-xs text-white/40 mb-1.5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                        <span className="flex items-center gap-1"><Zap size={9} /> Program Maturity</span>
                        <span className="text-green-400 font-semibold">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000"
                          style={{ width: `${item.energy}%` }} />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Connected Pillars</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map(rid => {
                            const related = activities.find(a => a.id === rid)
                            return related ? (
                              <button key={rid}
                                className="text-xs px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 hover:bg-green-500/15 transition-colors"
                                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                                onClick={e => { e.stopPropagation(); setExpandedId(rid); setActiveId(rid) }}
                              >
                                {related.title} →
                              </button>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
