import { motion } from "framer-motion";

export default function LegacyBanner() {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-gradient-to-br from-amber-50 via-white to-green-50 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center shadow-sm overflow-hidden"
        >
          {/* decorative orbs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="text-green-600 font-[Instrument_Sans] text-sm tracking-widest uppercase">
              Built on a Century of Education
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mt-3 mb-5 leading-[1.05]">
              Transforming Ideas
              <br />
              <span className="italic text-green-700">Into Reality</span>
            </h2>
            <p className="text-[#0a0a0a]/65 font-[Instrument_Sans] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              From a 100-year-old institution in rural Maharashtra to a modern
              incubator in Navi Mumbai — RCIIF carries the same conviction: that
              opportunity, when paired with infrastructure, becomes inevitable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
