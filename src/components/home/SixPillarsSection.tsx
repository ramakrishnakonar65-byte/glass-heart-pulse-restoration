import { motion } from "framer-motion";
import {
  Sprout,
  DollarSign,
  Briefcase,
  Building2,
  GraduationCap,
  Globe,
} from "lucide-react";

const PILLARS = [
  {
    icon: <Sprout className="w-7 h-7" />,
    title: "Incubation Support",
    description:
      "From idea validation and registration to first revenue — full-stack incubation under one roof.",
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: "Funding Access",
    description:
      "Curated angel and VC introductions, government grant support and dealflow connections.",
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: "Business Services",
    description:
      "Legal, finance, operations, branding and market access — the unglamorous things that compound.",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: "Infrastructure",
    description:
      "Workspaces, labs and digital platforms in Kharghar — designed for builders, not tenants.",
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Training & Workshops",
    description:
      "Bootcamps, mentor circles and founder upskilling delivered by operators who have shipped.",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Innovation Network",
    description:
      "A pan-India network bridging academia, industry and investors around real-world problems.",
  },
];

export default function SixPillarsSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center px-4 md:px-8">
          <span className="text-green-600 font-[Instrument_Sans] text-sm tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mt-2 mb-4">
            Six Pillars of Impact
          </h2>
          <p className="text-[#0a0a0a]/60 font-[Instrument_Sans] max-w-2xl mx-auto text-sm md:text-base">
            Everything a startup needs — from the first whiteboard sketch to the
            first cheque, the first hire and the first market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 text-green-600"
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ duration: 0.3 }}
              >
                {p.icon}
              </motion.div>
              <h3 className="text-xl md:text-2xl font-[Instrument_Serif] font-bold text-[#0a0a0a] mb-3">
                {p.title}
              </h3>
              <p className="text-[#0a0a0a]/70 font-[Instrument_Sans] text-sm leading-relaxed">
                {p.description}
              </p>
              <motion.div
                className="h-0.5 bg-green-500 mt-6"
                initial={{ width: 24 }}
                whileHover={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
