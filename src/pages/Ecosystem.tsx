import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, FileText, Flag, Receipt, BarChart2, Palette, Share2,
  TrendingUp, PenTool, Layout, Landmark, Scale, Calculator,
  GraduationCap, BookOpen, Zap, Handshake, Users,
  BarChart, LineChart, PieChart, Cloud, CheckSquare,
} from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/ui/animated-shader-hero';

/* ── Animated counter ── */
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return { val, ref };
}

const STATS = [
  { value: 22, suffix: '+', label: 'Services Offered' },
  { value: 3, suffix: '', label: 'Verticals' },
  { value: 12, prefix: '₹', suffix: 'Cr+', label: 'Funding Facilitated' },
  { value: 100, suffix: '%', label: 'Free for Cohort' },
];

function StatCell({ s, i }: { s: typeof STATS[number]; i: number }) {
  const { val, ref } = useCountUp(s.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6"
    >
      <span
        ref={ref}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          color: 'var(--gold)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {s.prefix ?? ''}{val}{s.suffix}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(240,235,224,0.55)',
          marginTop: '14px',
        }}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

/* ── Service definitions ── */
const STARTUP_SERVICES = [
  { Icon: FileText,   title: 'Company Registration',     desc: 'End-to-end incorporation support.' },
  { Icon: Flag,       title: 'Startup India Registration', desc: 'DPIIT recognition assistance.' },
  { Icon: Receipt,    title: 'GST Registration',         desc: 'Tax compliance setup and filing.' },
  { Icon: BarChart2,  title: 'Pitch Deck Design',        desc: 'Investor-ready pitch materials.' },
  { Icon: Palette,    title: 'Logo & Branding',          desc: 'Visual identity design.' },
  { Icon: Share2,     title: 'Social Media',             desc: 'Platform strategy and content.' },
  { Icon: TrendingUp, title: 'Digital Marketing',        desc: 'Growth marketing campaigns.' },
  { Icon: PenTool,    title: 'Content Creation',         desc: 'Blog, video, and collateral.' },
  { Icon: Layout,     title: 'Graphic Design',           desc: 'Marketing and product design.' },
  { Icon: Landmark,   title: 'Government Grants',        desc: 'Navigate grant applications.' },
  { Icon: Scale,      title: 'Legal Support',            desc: 'Contracts, IP, compliance.' },
  { Icon: Calculator, title: 'Financial Modelling',      desc: 'Revenue projections and planning.' },
];

const INSTITUTION_SERVICES = [
  { Icon: GraduationCap, title: 'Skill Development',        desc: 'Structured curriculum for students.' },
  { Icon: BookOpen,      title: 'Training Workshops',       desc: 'Industry-relevant workshops.' },
  { Icon: Zap,           title: 'Innovation Challenges',    desc: 'Hackathons and competitions.' },
  { Icon: Handshake,     title: 'Industry-Academia',        desc: 'Bridge the gap.' },
  { Icon: Users,         title: 'Internship & Placement',   desc: 'Connect students to startups.' },
];

const INVESTOR_SERVICES = [
  { Icon: BarChart,    title: 'Valuation',                 desc: 'Independent startup valuation by registered valuer.' },
  { Icon: LineChart,   title: 'Financial Projection',      desc: 'Revenue and growth models.' },
  { Icon: PieChart,    title: 'Mutual Funds & Unlisted',   desc: 'Investment instruments.' },
  { Icon: Cloud,       title: 'AWS Credits',               desc: 'Cloud infrastructure benefits.' },
  { Icon: CheckSquare, title: 'Investment Readiness',      desc: 'Startup diligence check.' },
];

/* ── Persona section ── */
interface PersonaProps {
  variant: 'parchment' | 'dark';
  align: 'left' | 'right';
  eyebrow: string;
  eyebrowColor: 'gold' | 'forest';
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  services: { Icon: any; title: string; desc: string }[];
}

function PersonaSection({ variant, align, eyebrow, eyebrowColor, title, description, ctaText, ctaHref, services }: PersonaProps) {
  const isDark = variant === 'dark';
  const isLeftText = align === 'left';
  const xOffset = isLeftText ? -40 : 40;

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center"
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: eyebrowColor === 'gold' ? 'var(--gold)' : '#5fb775',
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '20px',
        }}
      >
        {eyebrow}
        <span style={{
          display: 'inline-block', height: '1px', width: '48px',
          background: eyebrowColor === 'gold'
            ? 'linear-gradient(90deg, var(--gold), transparent)'
            : 'linear-gradient(90deg, #5fb775, transparent)',
        }} />
      </span>
      <h2
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: isDark ? '#F0EBE0' : 'var(--ink)',
          marginBottom: '20px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: '15px',
          lineHeight: 1.75,
          color: isDark ? 'rgba(240,235,224,0.6)' : 'var(--ink-3)',
          marginBottom: '28px',
          maxWidth: '480px',
        }}
      >
        {description}
      </p>
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 group"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: eyebrowColor === 'gold' ? 'var(--gold)' : '#5fb775',
          textDecoration: 'none',
          width: 'fit-content',
        }}
      >
        {ctaText}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );

  const cardsCol = (
    <div data-stagger-parent data-reveal className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {services.map((s) => {
        const Icon = s.Icon;
        return (
          <div
            key={s.title}
            className="card-spotlight p-5 rounded-xl transition-all duration-300"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : 'var(--bg)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border)',
              boxShadow: isDark
                ? '0 1px 0 rgba(255,255,255,0.03) inset'
                : '0 1px 2px rgba(12,11,9,0.04), 0 8px 24px -12px rgba(12,11,9,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(95,183,117,0.3)' : 'var(--gold-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'var(--border)';
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{
                background: isDark ? 'rgba(95,183,117,0.1)' : 'var(--gold-bg2)',
                border: isDark ? '1px solid rgba(95,183,117,0.2)' : '1px solid var(--gold-border)',
              }}
            >
              <Icon size={18} style={{ color: isDark ? '#5fb775' : 'var(--gold)' }} />
            </div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                color: isDark ? '#F0EBE0' : 'var(--ink)',
                marginBottom: '4px',
                lineHeight: 1.3,
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '12px',
                color: isDark ? 'rgba(240,235,224,0.5)' : 'var(--ink-3)',
                lineHeight: 1.6,
              }}
            >
              {s.desc}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className="w-full py-24 md:py-32 px-4"
      style={{ background: isDark ? '#0C0B09' : 'var(--bg)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          className="h-px mb-20 mx-auto"
          style={{
            width: '120px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(95,183,117,0.4), transparent)'
              : 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {isLeftText ? (
            <>{textCol}{cardsCol}</>
          ) : (
            <>
              <div className="lg:order-1 order-2">{cardsCol}</div>
              <div className="lg:order-2 order-1">{textCol}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Bottom CTA ── */
function EcosystemCTA() {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/40 to-black p-10 md:p-16 text-center">
          <span className="text-green-400 text-xs font-[Instrument_Sans] uppercase tracking-[0.22em]">
            Join the Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-[Instrument_Serif] text-white mt-4 mb-5 leading-[1.05]">
            Ready to Join the Ecosystem?
          </h2>
          <p className="text-white/60 font-[Instrument_Sans] mb-8 max-w-xl mx-auto text-sm md:text-base">
            Whether you're building a startup, running an institution, or deploying capital — RCIIF is the front door to India's most curated innovation network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLScf9cywkF4ygMmKM6u3A42fqhrvv9lKsVgGomo_HV-ssvZ9HQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] px-8 py-4 rounded-xl text-base transition-colors"
            >
              Apply as Startup
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="/contact/partner"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-green-400/40 text-white font-semibold font-[Instrument_Sans] px-8 py-4 rounded-xl text-base transition-all backdrop-blur-sm"
            >
              Partner with RCIIF
            </motion.a>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-900/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default function Ecosystem() {
  return (
    <PageLayout
      title="Ecosystem"
      description="RCIIF's full-stack startup ecosystem — services for startups, institutions, and investors."
    >
      {/* 1 — Animated shader hero */}
      <Hero
        trustBadge={{ icon: '✦', text: 'Full-Stack Startup Ecosystem · Kharghar, Navi Mumbai' }}
        headline={{ line1: 'Everything Under', line2: 'One Roof' }}
        subtitle="From ideation to exit — RCIIF provides end-to-end support for startups, institutions, and investors. 22+ services, 3 verticals, one curated platform."
        buttons={{
          primary: {
            text: 'Apply as Startup',
            onClick: () => window.open('https://docs.google.com/forms/d/e/1FAIpQLScf9cywkF4ygMmKM6u3A42fqhrvv9lKsVgGomo_HV-ssvZ9HQ/viewform', '_blank'),
          },
          secondary: {
            text: 'Become a Partner',
            onClick: () => { window.location.href = '/contact/partner'; },
          },
        }}
      />

      {/* 2 — Stats strip */}
      <section className="w-full py-20 md:py-24 px-4 bg-[#0C0B09]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
          {STATS.map((s, i) => (
            <div key={s.label} className="relative">
              <StatCell s={s} i={i} />
              {i < STATS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2"
                  style={{
                    width: '1px',
                    height: '60%',
                    background: 'linear-gradient(180deg, transparent, rgba(184,136,44,0.25), transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3a — For Startups */}
      <PersonaSection
        variant="parchment"
        align="left"
        eyebrow="For Startups"
        eyebrowColor="gold"
        title={<>Everything You Need <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>to Build</em></>}
        description="From day-one incorporation to series-A readiness — every service a founder needs, under one roof, free for cohort startups."
        ctaText="Apply to Maverick Pont →"
        ctaHref="/maverick/apply"
        services={STARTUP_SERVICES}
      />

      {/* 3b — For Institutions (dark, reversed) */}
      <PersonaSection
        variant="dark"
        align="right"
        eyebrow="For Institutions"
        eyebrowColor="forest"
        title={<>Bridge <em style={{ color: '#5fb775', fontStyle: 'italic' }}>Academia</em> & Industry</>}
        description="We partner with universities, schools, and training institutes to build innovation curricula, host hackathons, and connect students to live startup challenges."
        ctaText="Partner with Us →"
        ctaHref="/contact/partner"
        services={INSTITUTION_SERVICES}
      />

      {/* 3c — For Investors */}
      <PersonaSection
        variant="parchment"
        align="left"
        eyebrow="For Investors"
        eyebrowColor="gold"
        title={<>Curated Dealflow, <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>De-risked</em></>}
        description="Access vetted startups, registered-valuer reports, and structured investment instruments — backed by a 100-year institutional legacy."
        ctaText="Become an Investment Partner →"
        ctaHref="/contact/partner"
        services={INVESTOR_SERVICES}
      />

      {/* 4 — CTA */}
      <EcosystemCTA />
    </PageLayout>
  );
}
