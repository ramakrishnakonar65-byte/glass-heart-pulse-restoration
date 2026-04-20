import { useEffect, useRef, useState } from 'react';

// TODO: Replace with verified real numbers from RCIIF team
const STATS = [
  { num: '47+', label: 'Startups Supported' },
  { num: '₹12Cr+', label: 'Funding Facilitated' },
  { num: '200+', label: 'Events & Workshops' },
  { num: '8', label: 'States Reached' },
];

export default function ImpactStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="dark-section py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              data-delay={`${i * 150}`}
              className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  marginBottom: '8px',
                  fontVariantNumeric: 'oldstyle-nums',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(240,235,224,0.5)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
