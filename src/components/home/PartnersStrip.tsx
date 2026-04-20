import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ASSOCIATES = [
  "RSS",
  "DPIIT",
  "NIT",
  "MSME",
  "NASSCOM",
  "MahaIT",
  "SID",
  "IIT",
];

export default function PartnersStrip() {
  return (
    <section className="w-full py-20 md:py-24 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center px-4 md:px-8 mb-12">
          <span className="text-green-600 font-[Instrument_Sans] text-sm tracking-widest uppercase">
            Backed By
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mt-2 mb-4">
            Our Associates
          </h2>
          <p className="text-[#0a0a0a]/60 font-[Instrument_Sans] max-w-xl mx-auto text-sm md:text-base">
            Institutions, regulators and industry bodies that anchor the work we do.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ASSOCIATES.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="aspect-[3/2] rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <span className="font-[Instrument_Serif] text-2xl md:text-3xl font-bold text-[#0a0a0a]/70 tracking-wide">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="/contact/partner"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white font-semibold font-[Instrument_Sans] px-7 py-3.5 rounded-full text-base transition-colors"
          >
            Become a Partner
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
