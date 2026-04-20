import { useEffect, useRef, useState } from 'react';

const INCUBATEES = [
  { name: 'Rezonanz', sector: 'HealthTech', initials: 'RZ' },
  { name: 'EatPure', sector: 'FMCG', initials: 'EP' },
  { name: 'Kridinify Tech', sector: 'AI / Enterprise', initials: 'KT' },
  { name: 'Quaestio LLP', sector: 'Legal / FinTech', initials: 'QL' },
  { name: 'Dear Society', sector: 'Community', initials: 'DS' },
  { name: 'Taiyo HR', sector: 'HRTech', initials: 'TH' },
  { name: 'Nestcraft Design', sector: 'Design', initials: 'NC' },
  { name: 'OmniGlobal Tech', sector: 'Enterprise', initials: 'OG' },
  { name: 'Tiden Technologies', sector: 'Tech', initials: 'TT' },
  { name: 'MyEvent Factory', sector: 'Events / SaaS', initials: 'ME' },
  { name: 'Kampuram', sector: 'EdTech', initials: 'KP' },
  { name: 'Omegas Investment', sector: 'FinTech', initials: 'OI' },
];

const PARTNERS = [
  'NamanAngels', 'IndusInd Bank', 'EduGlobe', 'KIFA', 'AIIPLTECH',
  'StarFelix', 'LiveTech India', 'London College Mumbai',
];

export default function IncubateesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="incubatees" ref={ref} className="py-20 md:py-24 relative overflow-hidden">
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-20">
        <div className={`max-w-2xl mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            PORTFOLIO
            <span style={{ width: '48px', height: '1px', background: 'var(--gold-border)' }} />
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
              letterSpacing: '-0.018em',
              lineHeight: 1.15,
              marginBottom: '12px',
              color: 'var(--ink)',
            }}
          >
            Our <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Incubatees</em>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>
            12 startups building the future across healthcare, fintech, AI, and consumer sectors.
          </p>
        </div>

        {/* Incubatee Spotlight Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {INCUBATEES.map((inc, i) => (
            <div
              key={inc.name}
              className={`card-spotlight group p-5 rounded-xl border transition-all duration-500 cursor-default ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${i * 60 + 100}ms`,
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              {/* TODO: Replace with real logos when available */}
              <div
                className="monogram-avatar w-12 h-12 mb-3"
                style={{ fontSize: '0.9rem', borderRadius: '8px' }}
              >
                {inc.initials}
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>
                {inc.name}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  background: 'var(--gold-bg)',
                  border: '1px solid var(--gold-border)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                }}
              >
                {inc.sector}
              </span>
            </div>
          ))}
        </div>

        {/* Associates */}
        <div className={`transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}
          >
            Associate Partners
          </h3>
          <div className="flex flex-wrap gap-3">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="px-5 py-3 rounded-lg border transition-colors"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-3)',
                }}
              >
                {/* TODO: Replace with real logo PNGs when available */}
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
