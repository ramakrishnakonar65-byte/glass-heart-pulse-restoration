"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import { Linkedin, Mail, MapPin, Sparkles, Globe } from "lucide-react"
import { useState } from "react"

const teamMembers = [
  {
    name: "Dr. Rajendra Bhosale",
    role: "Chairman",
    bio: "Visionary academic leader driving innovation across Maharashtra's educational ecosystem.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=RB&backgroundColor=22c55e&textColor=ffffff",
    location: "Navi Mumbai, MH",
    skills: ["Academic Leadership", "Policy", "Research"],
    gradient: "from-green-500/10 via-green-500/5 to-transparent",
    social: { linkedin: "#", email: "contact@rciif.org", website: "https://rciif.org" },
  },
  {
    name: "Mr. Prashant Patil",
    role: "Director",
    bio: "Startup ecosystem builder with deep expertise in incubation strategy and entrepreneurship development.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=PP&backgroundColor=22c55e&textColor=ffffff",
    location: "Navi Mumbai, MH",
    skills: ["Incubation", "Startups", "Strategy"],
    gradient: "from-green-500/12 via-green-500/5 to-transparent",
    social: { linkedin: "#", email: "contact@rciif.org", website: "https://rciif.org" },
  },
  {
    name: "Ms. Snehal Desai",
    role: "Program Manager",
    bio: "Bridging academia and industry through structured mentorship, events, and cohort-driven programs.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=SD&backgroundColor=22c55e&textColor=ffffff",
    location: "Navi Mumbai, MH",
    skills: ["Program Design", "Mentorship", "Operations"],
    gradient: "from-green-500/12 via-green-500/5 to-transparent",
    social: { linkedin: "#", email: "contact@rciif.org", website: "https://rciif.org" },
  },
  {
    name: "Mr. Aditya Sharma",
    role: "Innovation Lead",
    bio: "Connecting founders with capital and strategic partners across RCIIF's growing investor network.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AS&backgroundColor=22c55e&textColor=ffffff",
    location: "Navi Mumbai, MH",
    skills: ["VC Networks", "Deal Flow", "Innovation"],
    gradient: "from-green-500/12 via-green-500/5 to-transparent",
    social: { linkedin: "#", email: "contact@rciif.org", website: "https://rciif.org" },
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] } },
}

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0); mouseY.set(0); setIsHovered(false)
  }

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <Card className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-[#0a0a0a] backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl hover:shadow-green-500/10">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${member.gradient}`}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.6 }}
            className="absolute right-4 top-4 z-10"
          >
            <Sparkles className="h-5 w-5 text-green-400" />
          </motion.div>

          <div className="relative z-10 p-6">
            <div className="mb-4 flex justify-center">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-green-500/30 bg-[#0a0a0a] p-1">
                  <img src={member.image} alt={member.name} className="h-full w-full rounded-full object-cover" />
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.h3
                className="mb-1 text-xl font-bold text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>
              <Badge className="mb-2 bg-green-500/15 text-xs uppercase tracking-widest text-green-400 border border-green-500/20">
                {member.role}
              </Badge>

              <div className="mb-3 flex items-center justify-center gap-1 text-xs text-white/50" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <MapPin className="h-3 w-3" />
                <span>{member.location}</span>
              </div>

              <p className="mb-4 text-sm text-white/60 leading-relaxed" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{member.bio}</p>

              <motion.div
                className="mb-4 flex flex-wrap justify-center gap-1.5"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                {member.skills.map((skill, idx) => (
                  <motion.div key={skill} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * idx, type: "spring" }}>
                    <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-xs text-green-400/80" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center gap-2">
                {[
                  { icon: Linkedin, href: member.social.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${member.social.email}`, label: "Email" },
                  { icon: Globe, href: member.social.website, label: "Website" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    animate={{ scale: isHovered ? 1 : 0.85 }}
                    transition={{ delay: isHovered ? 0.1 * idx : 0, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button size="icon" variant="ghost" asChild
                      className="h-8 w-8 rounded-full border border-green-500/20 bg-green-500/5 text-white/50 hover:text-green-400 hover:border-green-500/40 transition-colors">
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        <s.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function RCIIFTeamSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-10 bg-[#0a0a0a]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: shouldReduceMotion ? 1 : [1, 1.18, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green-500/20 blur-[180px]"
        />
        <motion.div
          animate={{ scale: shouldReduceMotion ? 1 : [1.1, 1, 1.1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/15 blur-[180px]"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} className="mb-16 text-center"
        >
          <Badge className="mb-6 gap-2 bg-green-500/10 text-green-400 border border-green-500/20">
            <Sparkles className="h-3 w-3" /> Our People
          </Badge>
          <h2 className="mb-4 text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The People Behind<br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">The Mission</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            A dedicated team of academics, entrepreneurs, and innovation leaders committed to building the next generation of Indian startups.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member, i) => <TeamMemberCard key={i} member={member} />)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }} className="mt-16 text-center"
        >
          <Card className="inline-flex flex-col items-center gap-6 rounded-3xl border border-green-500/20 bg-[#0f0f0f] px-10 py-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>Join Our Mission</h3>
            <p className="max-w-xl text-sm text-white/60" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              We're looking for passionate individuals who want to build India's innovation ecosystem.
            </p>
            <Button size="lg" className="rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 px-10 py-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Get In Touch →
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
