import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveApplyIllustration() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-square max-w-sm mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.25), transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.6 }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(34,197,94,0.15)]"
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Rotating dashed ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="rgba(34,197,94,0.35)"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Inner ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="rgba(34,197,94,0.2)"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Center core */}
        <motion.circle
          cx="200"
          cy="200"
          r="70"
          fill="url(#g1)"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <circle cx="200" cy="200" r="70" fill="url(#g2)" />

        {/* Upward arrow inside core */}
        <motion.path
          d="M200 230 L200 175 M180 195 L200 175 L220 195"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Orbiting dots */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 155;
          const y = 200 + Math.sin(rad) * 155;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="#22c55e"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
