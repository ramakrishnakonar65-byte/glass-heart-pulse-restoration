import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scale, Users, TrendingUp, ArrowRight, Sparkles, Linkedin, Mail, Globe, MapPin } from 'lucide-react';
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BOARD = [
  { name: 'Dr. Anil D. Patil',     role: 'Chairman',      initials: 'AP', skills: ['Governance', 'Policy', 'Academia'] },
  { name: 'Prof. Suresh Jadhav',   role: 'Vice Chairman', initials: 'SJ', skills: ['Strategy', 'Education', 'Leadership'] },
  { name: 'Dr. Meera Kulkarni',    role: 'Director',      initials: 'MK', skills: ['Research', 'Innovation', 'Management'] },
  { name: 'Mr. Rajesh Deshmukh',   role: 'Board Member',  initials: 'RD', skills: ['Finance', 'Operations', 'Industry'] },
  { name: 'Dr. Sandeep Gokhale',   role: 'Board Member',  initials: 'SG', skills: ['Technology', 'Startups', 'Mentorship'] },
  { name: 'Ms. Vandana Shah',      role: 'Board Member',  initials: 'VS', skills: ['Legal', 'Compliance', 'Governance'] },
  { name: 'Mr. Prakash Joshi',     role: 'Advisor',       initials: 'PJ', skills: ['Investments', 'VC', 'Deal Flow'] },
  { name: 'Dr. Nilesh Karanjekar', role: 'Advisor',       initials: 'NK', skills: ['Academic', 'Research', 'Policy'] },
];

const VALUES = [
  { Icon: Scale,       title: 'Accountability', desc: 'Every decision at RCIIF is governed by transparency, integrity, and institutional accountability.' },
  { Icon: Users,       title: 'Inclusivity',    desc: "Rooted in Rayat Shikshan Sanstha's 100-year philosophy — education and opportunity for all." },
  { Icon: TrendingUp,  title: 'Impact-First',   desc: 'Our board steers RCIIF toward measurable outcomes for startups, students, and communities.' },
];

function BoardCard({ member, index }: { member: typeof BOARD[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(false); }}
        className="group relative"
      >
        <Card className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-[#0a0a0a] backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl hover:shadow-green-500/15">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-500/[0.03] to-transparent"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
            className="absolute right-4 top-4 z-10"
          >
            <Sparkles className="h-5 w-5 text-green-400" />
          </motion.div>

          <div className="relative z-10 p-6">
            <div className="mb-4 flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-green-500/30 bg-green-500/10 flex items-center justify-center">
                  <span
                    className="font-[Instrument_Serif] font-bold text-green-400"
                    style={{ fontSize: '1.6rem', letterSpacing: '0.02em' }}
                  >
                    {member.initials}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.h3
                className="mb-1 text-lg font-bold text-white font-[Instrument_Serif]"
                animate={{ scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>
              <Badge className="mb-3 bg-green-500/15 text-[10px] uppercase tracking-widest text-green-400 border border-green-500/20 font-[Instrument_Sans]">
                {member.role}
              </Badge>

              <div className="mb-3 flex items-center justify-center gap-1 text-xs text-white/45 font-[Instrument_Sans]">
                <MapPin className="h-3 w-3" />
                <span>Navi Mumbai, MH</span>
              </div>

              <motion.div
                className="mb-4 flex flex-wrap justify-center gap-1.5"
                animate={{ opacity: hovered ? 1 : 0.7 }}
              >
                {member.skills.map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, type: 'spring' }}
                  >
                    <Badge
                      variant="outline"
                      className="border-green-500/20 bg-green-500/5 text-[10px] text-green-400/80 font-[Instrument_Sans]"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center gap-2">
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:info@rciif.org', label: 'Email' },
                  { icon: Globe, href: 'https://rciif.org', label: 'Website' },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    animate={{ scale: hovered ? 1 : 0.85 }}
                    transition={{ delay: hovered ? 0.1 * idx : 0, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      asChild
                      className="h-8 w-8 rounded-full border border-green-500/20 bg-green-500/5 text-white/50 hover:text-green-400 hover:border-green-500/40 transition-colors"
                    >
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
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
  );
}

/* ── Hero — dark editorial with green accents ── */
function BoardHero() {
  const headline1 = 'The People Behind';
  const headline2 = 'RCIIF';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Floating green orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 480, height: 480, background: 'rgb(34,197,94)', opacity: 0.06, top: '15%', left: '8%' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 520, height: 520, background: 'rgb(34,197,94)', opacity: 0.04, bottom: '10%', right: '5%' }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-green-400 font-[Instrument_Sans] uppercase mb-10 inline-flex items-center gap-3"
          style={{ fontSize: '11px', letterSpacing: '0.28em' }}
        >
          Governance & Leadership
          <span className="inline-block h-px w-12 bg-gradient-to-r from-green-400 to-transparent" />
        </motion.span>

        {/* Headline line 1 — staggered chars */}
        <h1
          className="text-white font-[Instrument_Serif] font-bold"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {headline1.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', whiteSpace: c === ' ' ? 'pre' : 'normal' }}
            >
              {c}
            </motion.span>
          ))}
        </h1>

        {/* Headline line 2 — green italic giant wordmark */}
        <h2
          className="font-[Instrument_Serif] italic bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginTop: '12px',
            marginBottom: '32px',
          }}
        >
          {headline2.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}
            >
              {c}
            </motion.span>
          ))}
        </h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 font-[Instrument_Sans] mx-auto"
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            maxWidth: '52ch',
          }}
        >
          Veteran educators, entrepreneurs, and institutional leaders steering RCIIF's mission with decades of combined experience.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: '40px' }}
        >
          <span className="block w-px h-10 bg-green-500/40 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Board Grid — dark with 3D tilt cards ── */
function BoardGrid() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-green-400 font-[Instrument_Sans] uppercase block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.22em' }}
          >
            Board of Directors
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-white mb-4 leading-[1.05]">
            Leadership
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto mb-4" />
          <p className="text-white/60 max-w-2xl mx-auto font-[Instrument_Sans] text-sm md:text-base">
            Distinguished individuals guiding RCIIF's strategic direction and institutional governance.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {BOARD.map((m, i) => (
            <BoardCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Advisory marquee — dark ── */
function AdvisoryMarquee() {
  const advisors = [
    'Dr. Nilesh Karanjekar',
    'Mr. Prakash Joshi',
    'External Advisors Welcome',
    'Dr. Anil D. Patil',
    'Prof. Suresh Jadhav',
    'Industry Mentors',
    'Investor Network',
  ];
  const doubled = [...advisors, ...advisors];

  return (
    <section className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-[1100px] mx-auto text-center mb-12">
        <span className="text-green-400 font-[Instrument_Sans] uppercase block mb-4"
          style={{ fontSize: '11px', letterSpacing: '0.22em' }}>
          Advisory Council
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-white leading-[1.05]">
          Advisory Council
        </h2>
        <div className="w-16 h-0.5 bg-green-500 mx-auto mt-4" />
      </div>

      <div className="overflow-hidden border-y border-green-500/15">
        <div className="animate-scroll-left flex whitespace-nowrap py-6">
          {doubled.map((a, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8 text-white/75 font-[Instrument_Serif] italic"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
            >
              {a}
              <span className="text-green-500 text-base">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Governance values — white ── */
function GovernanceValues() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-green-600 font-[Instrument_Sans] uppercase block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.22em' }}>
            Our Principles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-[Instrument_Serif] text-[#0a0a0a] leading-[1.05]">
            Governance <em className="italic text-green-600">Values</em>
          </h2>
          <div className="w-20 h-0.5 bg-green-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => {
            const Icon = v.Icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-7 rounded-2xl bg-white border border-black/5 hover:border-green-500/40 transition-all hover:shadow-[0_16px_40px_-16px_rgba(34,197,94,0.18)]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-green-500/10 border border-green-500/20">
                  <Icon size={20} className="text-green-600" />
                </div>
                <h3 className="font-[Instrument_Serif] font-bold text-[#0a0a0a] mb-2"
                  style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
                  {v.title}
                </h3>
                <p className="font-[Instrument_Sans] text-[#0a0a0a]/60"
                  style={{ fontSize: '14px', lineHeight: 1.75 }}>
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Join CTA — dark green like ApplyCTASection ── */
function JoinCTA() {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/40 to-black p-10 md:p-14 text-center">
          <span className="text-green-400 text-xs font-[Instrument_Sans] uppercase tracking-[0.22em]">
            Join the Council
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Instrument_Serif] text-white mt-4 mb-4 leading-[1.05]">
            Interested in Joining Our<br />Advisory Council?
          </h2>
          <p className="text-white/60 font-[Instrument_Sans] mb-8 max-w-xl mx-auto text-sm md:text-base">
            We welcome experienced entrepreneurs, investors, and academics who share our mission.
          </p>
          <motion.a
            href="mailto:info@rciif.org"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] px-8 py-4 rounded-xl text-base md:text-lg transition-colors group"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-900/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default function Board() {
  return (
    <PageLayout
      title="Board Members"
      description="Meet the RCIIF board — veteran educators, entrepreneurs, and institutional leaders guiding our governance."
    >
      <BoardHero />
      <div className="bg-white force-light-bg [&_section]:!bg-white">
        <div className="[&_section]:!bg-[#0a0a0a]">
          <BoardGrid />
        </div>
        <GovernanceValues />
        <div className="[&_section]:!bg-[#0a0a0a]">
          <JoinCTA />
        </div>
      </div>
    </PageLayout>
  );
}
