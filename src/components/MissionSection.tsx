import { useEffect, useRef, useState } from 'react';

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="dark-section py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-20 text-center">
        <blockquote
          data-reveal
          className={`max-w-2xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p
            data-reveal
            data-delay="200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: '#F0EBE0',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            "Innovation is not a privilege — it is a right we are building infrastructure for."
          </p>
          <cite
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              fontStyle: 'normal',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            — Dinesh Israni, CEO & Founder, RCIIF
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
