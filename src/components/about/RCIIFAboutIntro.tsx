import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const BADGES = ["DPIIT Recognised", "80G / 12A", "Est. 2022", "Kharghar, MH"];

const STATS = [
  { value: "12+", label: "Incubatees" },
  { value: "₹12Cr+", label: "Funding Facilitated" },
  { value: "6", label: "Sectors" },
  { value: "96.2%", label: "Founder Satisfaction" },
];

export default function RCIIFAboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-32 px-4 overflow-hidden bg-white"
    >
      {/* Background orbs */}
      <motion.div
        aria-hidden
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background: "rgb(34,197,94)",
          opacity: 0.06,
          top: "5%",
          right: "-10%",
          y,
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: "rgb(184,136,44)",
          opacity: 0.05,
          bottom: "-5%",
          left: "-8%",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-green-600 font-[Instrument_Sans] uppercase inline-block mb-6"
              style={{ fontSize: "11px", letterSpacing: "0.22em" }}
            >
              About RCIIF
            </span>

            <h1
              className="font-[Instrument_Serif] font-bold text-[#0a0a0a] mb-8 leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
            >
              Building India's Next
              <br />
              <em className="italic text-green-600">Generation of Founders</em>
            </h1>

            <p
              className="font-[Instrument_Sans] text-[#0a0a0a]/70 mb-5"
              style={{ fontSize: "16px", lineHeight: 1.75 }}
            >
              RCIIF — Research Centre for Innovation & Incubation Foundation — is a
              DPIIT-recognised incubator under Rayat Shikshan Sanstha, one of Maharashtra's
              most iconic educational institutions with over 100 years of transforming lives.
              We exist to find, fund, and mentor the next generation of Indian entrepreneurs.
            </p>

            <p
              className="font-[Instrument_Sans] text-[#0a0a0a]/70 mb-8"
              style={{ fontSize: "16px", lineHeight: 1.75 }}
            >
              Based at The Worksmith in Kharghar, Navi Mumbai, we offer a full-stack
              incubation ecosystem — from company registration to investor introductions —
              under one roof through our flagship programme, Maverick Pont.
            </p>

            {/* Badge pills */}
            <div className="flex flex-wrap gap-2.5">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border bg-green-500/[0.04] border-green-500/20 text-green-700 font-[Instrument_Sans]"
                  style={{ fontSize: "12px", letterSpacing: "0.02em" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <div
              className="relative rounded-3xl border border-black/5 bg-white p-8 md:p-10 overflow-hidden"
              style={{
                boxShadow: "0 24px 60px -24px rgba(34,197,94,0.18), 0 8px 24px -12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Decorative accent */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "linear-gradient(90deg, transparent, #22c55e, transparent)" }}
              />

              <span
                className="text-[#0a0a0a]/50 font-[Instrument_Sans] uppercase inline-block mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                In Numbers
              </span>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {STATS.map((s, i) => {
                  const isGreen = i % 2 === 0;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                      className="pt-5"
                      style={{
                        borderTop: `2px solid ${isGreen ? "#22c55e" : "#0a0a0a"}`,
                        padding: "20px 4px 4px",
                      }}
                    >
                      <div
                        className="font-[Instrument_Serif] font-bold text-[#0a0a0a] leading-none mb-2"
                        style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-[#0a0a0a]/55 font-[Instrument_Sans]"
                        style={{ fontSize: "12px", letterSpacing: "0.02em" }}
                      >
                        {s.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA strip */}
              <div className="mt-10 pt-6 border-t border-black/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[#0a0a0a]/60 font-[Instrument_Sans]" style={{ fontSize: "12px" }}>
                  <MapPin size={14} className="text-green-600" />
                  Kharghar, Navi Mumbai
                </span>
                <a
                  href="/maverick"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#16a34a",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 500,
                  }}
                >
                  Maverick Pont →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
