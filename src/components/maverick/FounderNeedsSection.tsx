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
    <motion.div
      data-reveal
      data-delay={revealDelay}
      className="relative flex flex-col group rounded-2xl border border-white/10 hover:border-green-500/40 bg-white/[0.03] hover:bg-green-500/[0.04] p-6 transition-colors duration-300 overflow-hidden"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="text-green-400 bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 relative transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        >
          {icon}{secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-[Instrument_Serif] text-white group-hover:text-green-400 transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-sm text-white/60 leading-relaxed font-[Instrument_Sans]">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
              {/* Halo */}
              <motion.div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] z-[-2]"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 0%, rgba(34,197,94,0.35), transparent 70%), radial-gradient(60% 50% at 50% 100%, rgba(16,185,129,0.25), transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="rciif-center-card relative rounded-2xl overflow-hidden border border-white/15"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(34,197,94,0.08) 100%)",
                  backdropFilter: "blur(22px) saturate(160%)",
                  WebkitBackdropFilter: "blur(22px) saturate(160%)",
                  boxShadow:
                    "0 30px 80px -30px rgba(34,197,94,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.18) inset",
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                {/* Sheen */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, transparent 35%, rgba(255,255,255,0.10) 50%, transparent 65%, transparent 100%)",
                  }}
                />
                {/* Corner glows */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(74,222,128,0.35), transparent 70%)" }}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.22), transparent 70%)" }}
                />

                <div className="w-full aspect-[3/4] flex flex-col p-7 relative z-10">
                  {/* Identity */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <span
                      className="text-green-400 uppercase mb-3"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.28em",
                      }}
                    >
                      ◆ Maverick Pont
                    </span>
                    <h3
                      className="text-white leading-[1.05]"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)",
                        textShadow: "0 1px 24px rgba(34,197,94,0.25)",
                      }}
                    >
                      Where
                      <br />
                      <em className="italic text-green-400">Founders</em>
                      <br />
                      Thrive
                    </h3>
                    <div className="w-10 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent mt-4" />
                  </div>

                  {/* Tag pills */}
                  <div className="flex-1 flex flex-col gap-2.5 my-2">
                    {["Mentors", "Capital", "Network", "Growth"].map((tag, i) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                        <span
                          className="text-white/90"
                          style={{
                            fontFamily: "'Instrument Sans', sans-serif",
                            fontSize: "13px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 mt-2 border-t border-white/[0.08] text-center">
                    <span
                      className="text-white/50 uppercase"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.22em",
                      }}
                    >
                      RCIIF · Kharghar, MH · Est. 2022
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 border border-green-500/25 rounded-2xl -m-3 z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
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
