"use client"
import { motion } from "framer-motion"

const INCUBATEES = [
  { name: "Rezonanz",     sector: "Healthcare Comms", initials: "RZ" },
  { name: "Quaestio LLP", sector: "Research",         initials: "QL" },
  { name: "Omegas",       sector: "FinTech",          initials: "OM" },
  { name: "EatPure",      sector: "FMCG",             initials: "EP" },
  { name: "Kampuram",     sector: "Digital Mktg",     initials: "KP" },
  { name: "Dear Society", sector: "Legal",            initials: "DS" },
  { name: "Nest Craft",   sector: "Digital Mktg",     initials: "NC" },
  { name: "Kridinify",    sector: "AI Tech",          initials: "KR" },
  { name: "Taiyo HR",     sector: "HR Tech",          initials: "TH" },
  { name: "Omni Global",  sector: "FinTech",          initials: "OG" },
  { name: "My Event",     sector: "Events",           initials: "ME" },
  { name: "Tiden Tech",   sector: "IT Services",      initials: "TT" },
]

export function RCIIFIncubatees() {
  return (
    <section className="w-full py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="text-green-400 text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Portfolio
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Incubatees
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {INCUBATEES.map((inc, i) => (
            <motion.div
              key={inc.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative bg-white/[0.03] border border-white/10 hover:border-green-500/40 rounded-2xl p-6 transition-colors duration-300 overflow-hidden"
            >
              {/* Logo monogram */}
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-4 group-hover:bg-green-500/15 transition-colors">
                <span
                  className="font-bold text-green-400"
                  style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.05rem' }}
                >
                  {inc.initials}
                </span>
              </div>

              <h3
                className="text-white font-bold text-lg leading-tight mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {inc.name}
              </h3>

              <span
                className="inline-block text-[10px] uppercase tracking-widest text-green-400/80 bg-green-500/10 border border-green-500/15 rounded-full px-2.5 py-1"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {inc.sector}
              </span>

              {/* Hover green accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
