import { useState } from "react"
import { Rocket, TrendingUp, Building2 } from "lucide-react"
import { motion } from "framer-motion"

const people = [
  {
    id: "startups",
    icon: <Rocket className="w-8 h-8" />,
    title: "Startups",
    description: "Early-stage founders building the next big thing. Whether you're pre-revenue or post-MVP, Maverick Pont gives you the structure, mentors, and capital connections to accelerate your growth.",
  },
  {
    id: "investors",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Investors",
    description: "Angels, VCs, and family offices looking for curated dealflow. Get early access to vetted, DPIIT-recognised startups from Maverick Pont cohorts before they hit the broader market.",
  },
  {
    id: "institutions",
    icon: <Building2 className="w-8 h-8" />,
    title: "Institutions",
    description: "Colleges, universities, and research bodies that want to plug into the startup ecosystem. Partner with RCIIF to offer students real incubation pathways and innovation infrastructure.",
  },
]

export default function BuiltForSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="w-full py-20 md:py-24 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center px-4 md:px-8">
          <span className="text-green-600 font-[Instrument_Sans] text-sm tracking-widest uppercase">
            Who It's For
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mt-2 mb-4">
            Built for Three Kinds of People
          </h2>
          <p className="text-[#0a0a0a]/60 font-[Instrument_Sans] max-w-xl mx-auto text-sm md:text-base">
            Maverick Pont is the bridge between those who build, those who back, and those who enable the next generation of innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4 md:px-0">
          {people.map((p, i) => (
            <motion.div
              key={p.id}
              data-reveal
              data-delay={`${(i + 1) * 100}`}
              className="relative p-8 rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-default group transition-shadow duration-300 hover:shadow-xl"
              onHoverStart={() => setHovered(p.id)}
              onHoverEnd={() => setHovered(null)}
            >
              {/* Hover highlight overlay */}
              <motion.div
                className="absolute inset-0 bg-green-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === p.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6 text-green-600"
                  animate={{ scale: hovered === p.id ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {p.icon}
                </motion.div>

                <h3 className="text-2xl font-[Instrument_Serif] font-bold text-[#0a0a0a] mb-3">{p.title}</h3>

                {/* ALWAYS VISIBLE */}
                <p className="text-[#0a0a0a]/70 font-[Instrument_Sans] text-sm leading-relaxed">
                  {p.description}
                </p>

                {/* Green accent line that animates on hover */}
                <motion.div
                  className="w-8 h-0.5 bg-green-500 mt-4"
                  animate={{ width: hovered === p.id ? 48 : 32 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
