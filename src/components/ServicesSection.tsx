import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  { icon: '💡', title: 'Idea Validation', desc: 'Market fit analysis, customer discovery, and prototype testing.' },
  { icon: '🌱', title: 'Incubation Support', desc: 'Full-stack incubation from registration to first revenue.' },
  { icon: '💰', title: 'Funding', desc: 'Angel network introductions, VC connections, and government grant access.' },
  { icon: '📋', title: 'Business Services', desc: 'Legal, financial, operations, and market access support.' },
  { icon: '🌐', title: 'Widespread Network', desc: 'Pan India network for partnerships, customers, and talent.' },
  { icon: '🎓', title: 'Support & Mentoring', desc: 'Industry mentors connected to your specific domain and stage.' },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-20 md:py-24 relative">
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
            ECOSYSTEM
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
            Everything a Startup Needs <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Under One Roof</em>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>
            From ideation to successful exit, we provide comprehensive support at every stage of your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              data-delay={`${Math.min(i * 100, 600)}`}
              className={`card-spotlight group relative p-6 rounded-xl border cursor-default overflow-hidden transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${i * 80 + 150}ms`,
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <span className="text-2xl mb-3 block">{s.icon}</span>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '6px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
