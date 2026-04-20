"use client"
import { useRef, useState } from "react"

const missionPoints = [
  { id: 1, label: "Find", description: "Discover high-potential founders from Tier 2 cities, colleges, and underserved communities who deserve a shot at building world-class companies." },
  { id: 2, label: "Fund", description: "Connect startups with grant funding, angel investors, VCs, and government schemes including DPIIT, SIDBI, and BIRAC programs." },
  { id: 3, label: "Mentor", description: "Pair founders with seasoned entrepreneurs and domain experts who provide ongoing guidance through every stage of company building." },
  { id: 4, label: "Incubate", description: "Provide co-working space, legal support, accounting, technology resources, and structured programming inside our Kharghar facility." },
  { id: 5, label: "Scale", description: "Help portfolio companies expand beyond Maharashtra into national and global markets through our growing partner network." },
]

const orbitItems = [
  { angle: 0, label: "Find" },
  { angle: 72, label: "Fund" },
  { angle: 144, label: "Mentor" },
  { angle: 216, label: "Incubate" },
  { angle: 288, label: "Scale" },
]

export function RCIIFMissionSection() {
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [orbitSpeed, setOrbitSpeed] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOrbitHover = (enter: boolean) => {
    setOrbitSpeed(enter ? 0.2 : 1)
  }

  const handlePointClick = (id: number) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <section className="w-full py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 min-h-[480px] rounded-3xl border border-green-500/15 bg-gradient-to-br from-green-950/20 to-[#0a0a0a] p-10 overflow-hidden">

          <div className="flex-1 z-10 max-w-md">
            <span className="text-green-400 text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Our Purpose</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Our Mission
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              RCIIF exists to find, fund, and mentor great young companies — making entrepreneurship accessible to every ambitious founder regardless of background.
            </p>

            <div className="space-y-3">
              {missionPoints.map(m => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-300
                    ${clickedId === m.id
                      ? 'bg-green-500/15 border-green-500/40'
                      : 'bg-white/[0.02] border-transparent hover:bg-green-500/5 hover:border-green-500/20'}`}
                  onClick={() => handlePointClick(m.id)}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-colors duration-300
                    ${clickedId === m.id ? 'bg-green-500 border-green-500 text-black' : 'border-green-500/40 text-green-400'}`}>
                    {m.id}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Instrument Serif', serif" }}>{m.label}</div>
                    {clickedId === m.id && (
                      <p className="text-white/60 text-xs mt-1 leading-relaxed" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{m.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-shrink-0 flex items-center justify-center"
            style={{ width: '380px', height: '380px' }}
            onMouseEnter={() => handleOrbitHover(true)}
            onMouseLeave={() => { handleOrbitHover(false); setClickedId(null) }}
          >
            <div className="absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-xl shadow-green-500/30">
              <span className="text-white font-bold text-xs text-center" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>RCIIF</span>
            </div>

            <div className="absolute rounded-full border border-dotted border-green-500/20"
              style={{
                width: '200px', height: '200px',
                animation: `spin ${20 / orbitSpeed}s linear infinite`,
              }}
            >
              {[0, 2, 4].map((itemIdx) => {
                const item = orbitItems[itemIdx]
                const mission = missionPoints[itemIdx]
                const angle = (itemIdx / 3) * 360
                const rad = (angle * Math.PI) / 180
                const x = 50 + 50 * Math.cos(rad)
                const y = 50 + 50 * Math.sin(rad)
                return (
                  <div key={itemIdx}
                    className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer border transition-colors duration-300
                      ${clickedId === mission.id ? 'bg-green-500 border-green-400 text-black' : 'bg-[#0a0a0a] border-green-500/40 text-green-400 hover:bg-green-500/20'}`}
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `spinReverse ${20 / orbitSpeed}s linear infinite`,
                      fontFamily: "'Instrument Sans', sans-serif",
                    }}
                    onClick={(e) => { e.stopPropagation(); handlePointClick(mission.id) }}
                  >
                    {mission.id}
                    <span className="absolute -bottom-5 whitespace-nowrap text-[10px] text-white/50">{item.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="absolute rounded-full border border-dotted border-green-500/15"
              style={{
                width: '320px', height: '320px',
                animation: `spinReverse ${28 / orbitSpeed}s linear infinite`,
              }}
            >
              {[1, 3].map((itemIdx) => {
                const mission = missionPoints[itemIdx]
                const angle = (itemIdx / 2) * 360
                const rad = (angle * Math.PI) / 180
                const x = 50 + 50 * Math.cos(rad)
                const y = 50 + 50 * Math.sin(rad)
                return (
                  <div key={itemIdx}
                    className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer border transition-colors duration-300
                      ${clickedId === mission.id ? 'bg-green-500 border-green-400 text-black' : 'bg-[#0a0a0a] border-green-500/30 text-green-400 hover:bg-green-500/20'}`}
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `spin ${28 / orbitSpeed}s linear infinite`,
                      fontFamily: "'Instrument Sans', sans-serif",
                    }}
                    onClick={(e) => { e.stopPropagation(); handlePointClick(mission.id) }}
                  >
                    {mission.id}
                    <span className="absolute -bottom-5 whitespace-nowrap text-[10px] text-white/50">{missionPoints[itemIdx].label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-900/10 pointer-events-none rounded-3xl" />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </section>
  )
}
