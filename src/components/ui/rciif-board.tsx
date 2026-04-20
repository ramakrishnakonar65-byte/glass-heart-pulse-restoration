"use client"
import { motion } from "framer-motion"

const board = [
  { name: "Dr. Anil D. Patil", role: "Chairman", image: "/images/team/leader-1.jpg" },
  { name: "Prof. Suresh Jadhav", role: "Vice Chairman", image: "/images/team/leader-2.jpg" },
  { name: "Dr. Meera Kulkarni", role: "Director", image: "/images/team/leader-3.jpg" },
  { name: "Mr. Rajesh Deshmukh", role: "Board Member", image: "/images/team/leader-4.jpg" },
  { name: "Dr. Sandeep Gokhale", role: "Board Member", image: "/images/team/leader-5.jpg" },
  { name: "Ms. Vandana Shah", role: "Board Member", image: "/images/team/leader-6.jpg" },
  { name: "Mr. Prakash Joshi", role: "Advisor", image: "/images/team/leader-7.jpg" },
  { name: "Dr. Nilesh Karanjekar", role: "Advisor", image: "/images/team/leader-8.jpg" },
]

export function RCIIFBoard() {
  return (
    <section className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a] text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-green-400 text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Governance
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Board Members
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto mb-4" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Veteran educators, entrepreneurs, and institutional leaders steering RCIIF's
            mission with decades of combined experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {board.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white/[0.03] border border-white/10 hover:border-green-500/40 rounded-2xl overflow-hidden transition-colors"
            >
              <div className="aspect-square overflow-hidden bg-[#0f0f0f]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-white text-sm md:text-base font-bold leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {m.name}
                </h3>
                <p className="text-green-400 text-xs mt-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {m.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
