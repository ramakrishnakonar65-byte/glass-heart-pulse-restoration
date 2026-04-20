const STATS = [
  { value: 'Every 6 Months', label: 'Per Cohort' },
  { value: '2× a Year', label: 'Cohorts Per Year' },
  { value: '12+', label: 'Incubatees' },
]

export default function StatsMarquee() {
  const items = [...STATS, ...STATS, ...STATS, ...STATS]

  return (
    <section className="w-full py-6 bg-[#0a0a0a] border-y border-white/10 overflow-hidden">
      <div className="marquee-track-mav">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-8 px-8 flex-shrink-0">
            <div className="flex flex-col items-center min-w-[120px] md:min-w-[140px]">
              <span className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-white">{s.value}</span>
              <span className="text-xs md:text-sm font-[Instrument_Sans] text-white/50 uppercase tracking-widest mt-1">{s.label}</span>
            </div>
            <span className="text-green-500 text-lg">•</span>
          </div>
        ))}
      </div>
    </section>
  )
}
