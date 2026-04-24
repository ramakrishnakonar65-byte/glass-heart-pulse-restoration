import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TEAM = [
  { name: "Dinesh Israni",   role: "Leadership",     initials: "DI", color: "#22c55e" },
  { name: "Deovrut Jadhav",  role: "Leadership",     initials: "DJ", color: "#059669" },
  { name: "Roshani Shinde",  role: "Operations",     initials: "RS", color: "#10b981" },
  { name: "Prasad Pawar",    role: "Programs",       initials: "PP", color: "#22c55e" },
  { name: "Vidya Tandel",    role: "Administration", initials: "VT", color: "#059669" },
];

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const [, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(false); }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative"
      >
        <Card className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-white p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(34,197,94,0.25)]">
          <div className="flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative mb-5"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center border-2"
                style={{
                  background: `${member.color}15`,
                  borderColor: `${member.color}40`,
                }}
              >
                <span
                  className="font-[Instrument_Serif] font-bold text-2xl"
                  style={{ color: member.color }}
                >
                  {member.initials}
                </span>
              </div>
            </motion.div>
            <h3 className="font-[Instrument_Serif] font-bold text-[#0a0a0a] text-lg leading-tight mb-2">
              {member.name}
            </h3>
            <Badge className="bg-green-500/10 text-green-700 border border-green-500/20 text-[10px] uppercase tracking-widest font-[Instrument_Sans]">
              {member.role}
            </Badge>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ background: `linear-gradient(90deg, ${member.color}, transparent)` }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function MeetOurTeam() {
  return (
    <section className="w-full py-24 md:py-28 px-4 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-green-600 font-[Instrument_Sans] uppercase block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.22em' }}
          >
            Our People
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] mb-4 leading-[1.05]">
            Meet Our Team
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {TEAM.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
