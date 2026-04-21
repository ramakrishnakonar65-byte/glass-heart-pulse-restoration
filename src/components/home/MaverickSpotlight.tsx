import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

export default function MaverickSpotlight() {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="relative">
            {/* Floating dots */}
            <motion.span
              aria-hidden
              className="absolute -top-6 -left-4 rounded-full pointer-events-none"
              style={{ width: 80, height: 80, background: 'var(--gold)', opacity: 0.06 }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden
              className="absolute top-32 -left-12 rounded-full pointer-events-none"
              style={{ width: 120, height: 120, background: 'var(--gold)', opacity: 0.05 }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-20 rounded-full pointer-events-none"
              style={{ width: 60, height: 60, background: 'var(--gold)', opacity: 0.07 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <span data-reveal data-delay="0" className="text-green-400 font-[Instrument_Sans] text-sm tracking-widest uppercase block">
              Our Flagship Programme
            </span>
            <h2 data-reveal data-delay="100" className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Instrument_Serif] text-white mt-3 mb-6 leading-[1.05]">
              Maverick Pont
            </h2>
            <p data-reveal data-delay="200" className="text-white/65 font-[Instrument_Sans] text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              A curated incubation ecosystem for early-stage founders. Two
              cohorts a year, twelve companies per cohort, and a full operating
              system around each one — mentors, capital, infrastructure and a
              path to market.
            </p>

            <div data-reveal data-delay="350" className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/maverick/apply"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] px-7 py-3.5 rounded-full text-base transition-colors"
              >
                Apply as Startup
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="/maverick/alumni"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold font-[Instrument_Sans] px-7 py-3.5 rounded-full text-base transition-colors backdrop-blur-sm"
              >
                Meet the Alumni
              </motion.a>
            </div>
          </div>

          {/* Right */}
          <motion.div
            data-reveal="right"
            data-delay="200"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-950/40 to-black p-8 md:p-10 green-card-pulse">
              <div className="grid grid-cols-3 gap-6 pb-8 mb-8 border-b border-white/10">
                {[
                  { v: "12", l: "Companies" },
                  { v: "₹12Cr+", l: "Facilitated" },
                  { v: "6", l: "Sectors" },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  >
                    <div className="text-2xl md:text-3xl font-bold font-[Instrument_Serif] text-white">
                      {s.v}
                    </div>
                    <div className="text-[10px] md:text-xs font-[Instrument_Sans] text-white/45 uppercase tracking-widest mt-1">
                      {s.l}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Quote className="w-8 h-8 text-green-400/60 mb-3" />
              <p className="text-white/85 font-[Instrument_Serif] italic text-lg md:text-xl leading-relaxed">
                "RCIIF didn't just give us space — they gave us a runway,
                mentors who answered the phone, and the first cheque that
                made the rest possible."
              </p>
              <div className="mt-5 text-white/55 font-[Instrument_Sans] text-sm">
                — Founder, Maverick Pont · Cohort 01
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-transparent to-green-900/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
