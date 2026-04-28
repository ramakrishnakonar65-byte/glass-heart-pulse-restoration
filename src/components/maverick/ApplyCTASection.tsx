import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import InteractiveApplyIllustration from "./InteractiveApplyIllustration"

export default function ApplyCTASection() {

  return (
    <section className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/40 to-black p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left: Text */}
            <div className="flex-1 z-10 w-full md:w-1/2">
              <span className="text-green-400 text-sm font-[Instrument_Sans] uppercase tracking-widest">Applications Open</span>
              <h2 data-reveal data-delay="0" className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Instrument_Serif] text-white mt-3 mb-4">Apply for<br />Maverick Pont</h2>
              <p className="text-white/60 font-[Instrument_Sans] mb-8 max-w-md text-sm md:text-base">Join the next cohort of ambitious founders. Limited seats. Unlimited potential. Applications reviewed on a rolling basis.</p>

              <motion.a
                href="/maverick/apply"
                data-reveal
                data-delay="200"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] px-8 py-4 rounded-xl text-base md:text-lg transition-colors duration-200 group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0px #22c55e", "0 0 24px #22c55e55", "0 0 0px #22c55e"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Right: Lottie Animation */}
            <div className="w-full md:w-1/2 max-w-xs mx-auto flex-shrink-0 opacity-90">
              {animationData ? (
                <Lottie animationData={animationData} loop autoplay className="w-full h-auto drop-shadow-2xl" />
              ) : (
                <div className="w-full aspect-square bg-green-500/10 rounded-2xl animate-pulse" />
              )}
            </div>
          </div>

          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-900/20 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
