import { useEffect, useRef, useState } from 'react';

const VALUES = [
  { icon: '🎓', title: 'Mentorship Network', desc: 'Access 50+ industry mentors across sectors — from fintech to healthtech.' },
  { icon: '💰', title: 'Capital Access', desc: 'Angel networks, VC introductions, and government grant navigation.' },
  { icon: '⚖️', title: 'Legal & Financial Support', desc: 'Company registration, GST, compliance — handled end to end.' },
  { icon: '🤝', title: 'Industry Connections', desc: 'Pan India network connecting you to customers, partners, and talent.' },
  { icon: '🏢', title: 'Co-Working Space', desc: 'The Worksmith — industrial-chic workspace in Kharghar, Navi Mumbai.' },
  { icon: '📚', title: 'Skill Development', desc: 'Workshops, bootcamps, and training programs for founders and teams.' },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="about" ref={ref} className="relative py-20 md:py-24 overflow-hidden">
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-20">
        {/* Header */}
        <div
          data-reveal="left"
          className={`max-w-2xl mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
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
            ABOUT RCIIF
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
            Research-Driven Innovation for <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Impactful Change</em>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', maxWidth: '580px', lineHeight: 1.85 }}>
            RCIIF is a DPIIT-recognised nonprofit startup incubator backed by <b style={{ color: 'var(--ink-2)', fontWeight: 500 }}>Rayat Shikshan Sanstha</b> — one of India's oldest educational trusts. We find, fund &amp; mentor great young companies, from pitch to successful exit.
          </p>
        </div>

        {/* Value Pillars — 6 tiles (Magic Bento style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              data-reveal
              data-delay={`${Math.min(i * 100, 600)}`}
              className={`card-spotlight group p-6 rounded-xl border transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${i * 80 + 150}ms`,
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <span className="text-2xl mb-3 block">{v.icon}</span>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: '15px',
                  color: 'var(--ink)',
                  marginBottom: '6px',
                }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
