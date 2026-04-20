import { useRef } from "react"
import {
  Rocket, Users, Lightbulb, TrendingUp, Globe, Award,
  Zap, CheckCircle, Sparkles, Star
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const services = [
  {
    icon: <Rocket className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Mentorship",
    description: "Get paired with industry veterans and serial entrepreneurs who guide you through every critical decision from product to fundraising.",
    position: "left",
  },
  {
    icon: <Users className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Community",
    description: "Join a tight-knit cohort of ambitious founders. Collaborate, co-build, and grow with peers who understand the startup grind.",
    position: "left",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Resources",
    description: "Access legal templates, financial models, cloud credits, design tools, and everything you need to build without barriers.",
    position: "left",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Funding",
    description: "Connect directly with our investor network. Pitch to angels, VCs, and strategic partners actively looking to back the next big thing.",
    position: "right",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Network",
    description: "Unlock doors to global ecosystems, industry events, and a forever-warm alumni network across 30+ cities worldwide.",
    position: "right",
  },
  {
    icon: <Award className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-green-400" />,
    title: "Recognition",
    description: "Get featured in press, pitch competitions, and demo days that put your startup in front of the people who matter most.",
    position: "right",
  },
]

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, revealDelay }: any) {
  return (
    <motion.div data-reveal data-delay={revealDelay} className="flex flex-col group" variants={variants} transition={{ delay }} whileHover={{ y: -5 }}>
      <div className="flex items-center gap-3 mb-3">
        <motion.div className="text-green-400 bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 relative transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}>
          {icon}{secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-[Instrument_Serif] text-white group-hover:text-green-400 transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-sm text-white/60 leading-relaxed pl-12 font-[Instrument_Sans]">{description}</p>
    </motion.div>
  )
}

export default function FounderNeedsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden relative">
      <motion.div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-500/5 blur-3xl" style={{ y: y1 }} />
      <motion.div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-500/5 blur-3xl" style={{ y: y2 }} />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span className="text-green-400 font-medium mb-2 flex items-center gap-2 font-[Instrument_Sans]">
            <Zap className="w-4 h-4" />
            BUILT FOR BUILDERS
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center font-[Instrument_Serif]">Everything a Founder Needs</h2>
          <motion.div className="w-24 h-1 bg-green-500" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-white/70 font-[Instrument_Sans] text-sm md:text-base" variants={itemVariants}>
          Maverick Pont gives you the unfair advantage — mentors, capital, community, and infrastructure — all in one cohort-driven program.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-8 md:space-y-16">
            {services.filter(s => s.position === "left").map((s, i) => (
              <ServiceItem key={i} {...s} variants={itemVariants} delay={i * 0.2} revealDelay={`${(i + 1) * 100}`} direction="left" />
            ))}
          </div>

          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div className="rciif-center-card rounded-xl overflow-hidden shadow-2xl shadow-green-500/10 border border-white/10"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-green-900/40 via-black to-green-900/20 flex flex-col items-center justify-center gap-6 p-8">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-green-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white font-[Instrument_Serif]">Maverick Pont</div>
                    <div className="rciif-accent text-green-400 text-sm mt-1 font-[Instrument_Sans]">Where Founders Thrive</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {["Mentors", "Capital", "Network", "Growth"].map(tag => (
                      <div key={tag} className="rciif-tag bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-xs text-white/80 font-[Instrument_Sans]">{tag}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div className="absolute inset-0 border-2 border-green-500/20 rounded-xl -m-3 z-[-1]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
            </motion.div>
          </div>

          <div className="space-y-8 md:space-y-16">
            {services.filter(s => s.position === "right").map((s, i) => (
              <ServiceItem key={i} {...s} variants={itemVariants} delay={i * 0.2} revealDelay={`${(i + 1) * 100}`} direction="right" />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
