import { motion } from 'framer-motion';
import { Scale, Users, TrendingUp } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import MonogramAvatar from '@/components/MonogramAvatar';
import SpotlightCard from '@/components/SpotlightCard';

const board = [
  { name: 'Dr. Anil D. Patil',     role: 'Chairman',      initials: 'AP', color: 'gold' as const   },
  { name: 'Prof. Suresh Jadhav',   role: 'Vice Chairman', initials: 'SJ', color: 'forest' as const },
  { name: 'Dr. Meera Kulkarni',    role: 'Director',      initials: 'MK', color: 'gold' as const   },
  { name: 'Mr. Rajesh Deshmukh',   role: 'Board Member',  initials: 'RD', color: 'forest' as const },
  { name: 'Dr. Sandeep Gokhale',   role: 'Board Member',  initials: 'SG', color: 'gold' as const   },
  { name: 'Ms. Vandana Shah',      role: 'Board Member',  initials: 'VS', color: 'forest' as const },
  { name: 'Mr. Prakash Joshi',     role: 'Advisor',       initials: 'PJ', color: 'gold' as const   },
  { name: 'Dr. Nilesh Karanjekar', role: 'Advisor',       initials: 'NK', color: 'forest' as const },
];

const VALUES = [
  { Icon: Scale,       title: 'Accountability', desc: 'Every decision at RCIIF is governed by transparency, integrity, and institutional accountability.' },
  { Icon: Users,       title: 'Inclusivity',    desc: "Rooted in Rayat Shikshan Sanstha's 100-year philosophy — education and opportunity for all." },
  { Icon: TrendingUp,  title: 'Impact-First',   desc: 'Our board steers RCIIF toward measurable outcomes for startups, students, and communities.' },
];

/* ── Hero ── */
function BoardHero() {
  const headline1 = 'The People Behind';
  const headline2 = 'RCIIF';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0C0B09' }}>
      {/* Floating orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 480, height: 480, background: 'rgba(184,136,44,1)', opacity: 0.04, top: '15%', left: '8%' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 520, height: 520, background: 'rgba(95,183,117,1)', opacity: 0.04, bottom: '10%', right: '5%' }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            display: 'inline-flex', alignItems: 'center', gap: '14px',
            marginBottom: '40px',
          }}
        >
          Governance & Leadership
          <span style={{ display: 'inline-block', height: '1px', width: '48px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </motion.span>

        {/* Headline line 1 — staggered chars */}
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#F0EBE0',
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

        {/* Headline line 2 — gold italic giant wordmark */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            color: 'var(--gold)',
            lineHeight: 1,
            letterSpacing: '0.04em',
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
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'rgba(253,251,247,0.5)',
            maxWidth: '52ch',
            margin: '0 auto',
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
          <span className="hero-scroll-line block" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Board Grid ── */
function BoardGrid() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Board of Directors"
          title={<>Leadership</>}
          description="Distinguished individuals guiding RCIIF's strategic direction and institutional governance."
        />

        <div data-stagger-parent data-reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {board.map((m) => (
            <div
              key={m.name}
              className="group relative p-6 rounded-2xl text-center transition-all duration-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 50px -20px rgba(184,136,44,0.18)';
                e.currentTarget.style.borderColor = 'var(--gold-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div className="flex justify-center mb-5">
                <MonogramAvatar initials={m.initials} size="lg" />
              </div>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: m.color === 'gold' ? 'var(--gold)' : 'var(--forest)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {m.role}
              </span>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: '17px',
                  color: 'var(--ink)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                }}
              >
                {m.name}
              </h3>

              {/* Gold hover bottom border */}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500"
                style={{
                  width: '0%',
                  background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                }}
                ref={(el) => { if (el) (el as any)._reset = true; }}
                onMouseEnter={undefined}
              />
              <span className="board-card-rule absolute bottom-3 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-[60%] transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Advisory marquee ── */
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
    <section className="w-full py-24 md:py-28 px-4 bg-[#0C0B09]">
      <div className="max-w-[1100px] mx-auto text-center mb-12">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          Advisory Council
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            color: '#F0EBE0',
            marginTop: '16px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Advisory Council
        </h2>
      </div>

      <div className="overflow-hidden border-y" style={{ borderColor: 'rgba(184,136,44,0.15)' }}>
        <div className="animate-scroll-left flex whitespace-nowrap py-6">
          {doubled.map((a, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: 'rgba(240,235,224,0.75)',
              }}
            >
              {a}
              <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Governance values ── */
function GovernanceValues() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          eyebrow="Our Principles"
          title={<>Governance <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Values</em></>}
          description="The principles our board holds itself accountable to."
        />

        <div data-stagger-parent data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map((v) => {
            const Icon = v.Icon;
            return (
              <SpotlightCard
                key={v.title}
                className="p-7 rounded-2xl"
                spotlightColor="rgba(184,136,44,0.18)"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'var(--gold-bg2)',
                    border: '1px solid var(--gold-border)',
                  }}
                >
                  <Icon size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: '22px',
                    color: 'var(--ink)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: '13.5px',
                    lineHeight: 1.75,
                    color: 'var(--ink-3)',
                  }}
                >
                  {v.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      <style>{`
        [data-stagger-parent] { background: transparent; }
      `}</style>
    </section>
  );
}

/* ── Join CTA ── */
function JoinCTA() {
  return (
    <section className="w-full py-24 md:py-28 px-4 bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto text-center">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          Join the Council
        </span>
        <h2
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--ink)',
            margin: '16px 0 16px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Interested in Joining Our Advisory Council?
        </h2>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--ink-3)',
            maxWidth: '52ch',
            margin: '0 auto 32px',
          }}
        >
          We welcome experienced entrepreneurs, investors, and academics who share our mission.
        </p>
        <a href="mailto:info@rciif.org" className="btn-primary" style={{ padding: '14px 36px' }}>
          Get in Touch
        </a>
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
      <BoardGrid />
      <AdvisoryMarquee />
      <GovernanceValues />
      <JoinCTA />
    </PageLayout>
  );
}
