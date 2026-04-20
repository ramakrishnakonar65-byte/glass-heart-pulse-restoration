"use client"
import { motion } from "framer-motion"

const associates = [
  { name: "NamanAngels", logo: "/images/partners/naman.jpg" },
  { name: "IndusInd Bank", logo: "/images/partners/indusind.jpg" },
  { name: "EduGlobe", logo: "/images/partners/eduglobe.jpg" },
  { name: "London College Mumbai", logo: "/images/partners/london-college.jpg" },
  { name: "LiveTech India", logo: "/images/partners/livetech.jpg" },
  { name: "Starfeliks", logo: "/images/partners/starfeliks.jpg" },
  { name: "Ideabaaz", logo: "/images/partners/ideabaaz.jpg" },
  { name: "TheKamy", logo: "/images/partners/thekamy.jpg" },
  { name: "Handshake", logo: "/images/partners/handshake.jpg" },
  { name: "AIIPL", logo: "/images/logos/aiipl.jpg" },
  { name: "Career Insurance", logo: "/images/logos/career-insurance.jpg" },
  { name: "Wishcare", logo: "/images/logos/wishcare.jpg" },
]

export function RCIIFAssociates() {
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
            Trusted Network
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Our Associates
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto mb-4" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            We collaborate with industry leaders, financial institutions, and academic partners
            to give every founder the strongest possible launchpad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {associates.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group bg-white/[0.03] border border-white/10 hover:border-green-500/40 rounded-xl p-4 aspect-[4/3] flex flex-col items-center justify-center transition-colors"
            >
              <div className="w-full h-16 flex items-center justify-center overflow-hidden">
                <img
                  src={a.logo}
                  alt={a.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-[11px] text-white/50 group-hover:text-green-300 text-center" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {a.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
