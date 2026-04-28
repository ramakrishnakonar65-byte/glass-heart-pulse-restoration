import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const TEAM = [
  { name: "Dinesh Israni",   role: "Founder & Director",     initials: "DI", color: "#22c55e", bg: "from-green-900/40 to-green-950/20" },
  { name: "Deovrut Jadhav",  role: "Co-Founder & Director",  initials: "DJ", color: "#4ade80", bg: "from-emerald-900/40 to-emerald-950/20" },
  { name: "Roshani Shinde",  role: "Operations Lead",        initials: "RS", color: "#86efac", bg: "from-green-800/30 to-green-900/20" },
  { name: "Prasad Pawar",    role: "Program Manager",        initials: "PP", color: "#22c55e", bg: "from-green-900/40 to-green-950/20" },
  { name: "Vidya Tandel",    role: "Administration Head",    initials: "VT", color: "#4ade80", bg: "from-emerald-900/40 to-emerald-950/20" },
];

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 35 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 35 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
          mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(false); }}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative group cursor-default"
      >
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/10 group-hover:border-green-500/40 transition-colors duration-500 bg-gradient-to-br ${member.bg}`}
          style={{ minHeight: 280 }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: `radial-gradient(circle at 50% 40%, ${member.color}18, transparent 70%)` }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
            animate={{ opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />

          <div className="relative z-10 p-7 flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative mb-5"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${member.color}25, ${member.color}08)`,
                  border: `2px solid ${member.color}50`,
                  boxShadow: hovered ? `0 0 32px ${member.color}30` : 'none',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 700,
                  fontSize: '2rem',
                  color: member.color,
                  letterSpacing: '0.04em',
                }}>
                  {member.initials}
                </span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: hovered ? [1, 1.3, 1.3] : 1, opacity: hovered ? [0.4, 0, 0] : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ border: `1px solid ${member.color}` }}
              />
            </motion.div>

            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 8,
            }}>
              {member.name}
            </h3>

            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: member.color,
              display: 'block',
              marginBottom: 16,
              opacity: 0.85,
            }}>
              {member.role}
            </span>

            <motion.div
              className="rounded-full"
              animate={{ width: hovered ? 56 : 28 }}
              transition={{ duration: 0.35 }}
              style={{ height: 2, background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
            />
          </div>

          <div
            className="absolute bottom-3 right-5 select-none pointer-events-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '5rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.025)',
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MeetOurTeam() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#4ade80',
            display: 'block',
            marginBottom: 14,
          }}>
            Our People
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'white',
            lineHeight: 1.05,
            marginBottom: 16,
          }}>
            The Team Behind<br />
            <em style={{ color: '#4ade80', fontStyle: 'italic' }}>Every Founder's Journey</em>
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #22c55e, transparent)' }} />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {TEAM.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
