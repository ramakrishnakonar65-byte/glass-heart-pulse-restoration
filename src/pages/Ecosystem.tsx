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
        className="text-white font-[Instrument_Serif] font-bold leading-none"
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}
      >
        {s.prefix ?? ''}{val}{s.suffix}
      </span>
      <span className="text-green-400 mt-4 font-[Instrument_Sans] uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.22em' }}>
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

/* ── Persona section (white bg / dark bg variants — both with green accents) ── */
interface PersonaProps {
  variant: 'light' | 'dark';
  align: 'left' | 'right';
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  services: { Icon: any; title: string; desc: string }[];
}

function PersonaSection({ variant, align, eyebrow, title, description, ctaText, ctaHref, services }: PersonaProps) {
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
      <span className="text-green-500 font-[Instrument_Sans] uppercase mb-5 inline-flex items-center gap-3"
        style={{ fontSize: '11px', letterSpacing: '0.22em' }}>
        {eyebrow}
        <span className="inline-block h-px w-12 bg-gradient-to-r from-green-500 to-transparent" />
      </span>
      <h2
        className={`font-[Instrument_Serif] font-bold mb-5 ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>
      <p className={`font-[Instrument_Sans] mb-7 max-w-md ${isDark ? 'text-white/60' : 'text-[#0a0a0a]/60'}`}
        style={{ fontSize: '15px', lineHeight: 1.75 }}>
        {description}
      </p>
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 group text-green-500 hover:text-green-400 font-[Instrument_Sans] font-semibold transition-colors"
        style={{ fontSize: '14px', textDecoration: 'none', width: 'fit-content' }}
      >
        {ctaText}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
            className={`p-5 rounded-2xl transition-all duration-300 ${
              isDark
                ? 'bg-white/[0.04] border border-white/10 hover:border-green-500/40 hover:bg-white/[0.06]'
                : 'bg-white border border-black/5 hover:border-green-500/40 hover:shadow-[0_12px_32px_-12px_rgba(34,197,94,0.18)]'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              isDark ? 'bg-green-500/10 border border-green-500/25' : 'bg-green-500/10 border border-green-500/20'
            }`}>
              <Icon size={18} className={isDark ? 'text-green-400' : 'text-green-600'} />
            </div>
            <h3 className={`font-[Instrument_Sans] font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}
              style={{ fontSize: '14px', lineHeight: 1.3 }}>
              {s.title}
            </h3>
            <p className={`font-[Instrument_Sans] ${isDark ? 'text-white/55' : 'text-[#0a0a0a]/55'}`}
              style={{ fontSize: '12.5px', lineHeight: 1.6 }}>
              {s.desc}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className={`w-full py-24 md:py-32 px-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          className="h-px mb-20 mx-auto"
          style={{
            width: '120px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)',
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
          <h2 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-white mt-4 mb-5 leading-[1.05]">
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
      {/* 1 — Animated shader hero (dark, green accents) */}
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

      <div className="bg-white force-light-bg [&_section]:!bg-white">
        {/* 2 — Stats strip (force dark) */}
        <div className="[&_section]:!bg-[#0a0a0a]">
          <section className="w-full py-20 md:py-24 px-4 bg-[#0a0a0a] border-y border-white/10">
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
                        background: 'linear-gradient(180deg, transparent, rgba(34,197,94,0.3), transparent)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 3a — For Startups (white) */}
        <PersonaSection
          variant="light"
          align="left"
          eyebrow="For Startups"
          title={<>Everything You Need <em className="italic text-green-600">to Build</em></>}
          description="From day-one incorporation to series-A readiness — every service a founder needs, under one roof, free for cohort startups."
          ctaText="Apply to Maverick Pont →"
          ctaHref="/maverick/apply"
          services={STARTUP_SERVICES}
        />

        {/* 3b — For Institutions (dark, reversed) */}
        <div className="[&_section]:!bg-[#0a0a0a]">
          <PersonaSection
            variant="dark"
            align="right"
            eyebrow="For Institutions"
            title={<>Bridge <em className="italic text-green-400">Academia</em> & Industry</>}
            description="We partner with universities, schools, and training institutes to build innovation curricula, host hackathons, and connect students to live startup challenges."
            ctaText="Partner with Us →"
            ctaHref="/contact/partner"
            services={INSTITUTION_SERVICES}
          />
        </div>

        {/* 3c — For Investors (white) */}
        <PersonaSection
          variant="light"
          align="left"
          eyebrow="For Investors"
          title={<>Curated Dealflow, <em className="italic text-green-600">De-risked</em></>}
          description="Access vetted startups, registered-valuer reports, and structured investment instruments — backed by a 100-year institutional legacy."
          ctaText="Become an Investment Partner →"
          ctaHref="/contact/partner"
          services={INVESTOR_SERVICES}
        />

        {/* 4 — CTA (dark) */}
        <div className="[&_section]:!bg-[#0a0a0a]">
          <EcosystemCTA />
        </div>
      </div>
    </PageLayout>
  );
}
