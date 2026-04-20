import { useEffect, useRef, useState } from 'react';

const TEAM = [
  { name: 'Dinesh Israni', role: 'CEO & Founder', initials: 'DI' },
  { name: 'Deovrut Jadhav', role: 'Chief Operating Officer', initials: 'DJ' },
  { name: 'Prasad Pawar', role: 'Digital Marketing Head', initials: 'PP' },
  { name: 'Vidya Tandel', role: 'Accountant', initials: 'VT' },
  { name: 'Roshani Shinde', role: 'Community Manager', initials: 'RS' },
];

const COUNCIL = [
  { name: 'Dr. K. V. Kale', role: 'Chairman', initials: 'KK' },
  { name: 'Smt. Sunita Patil', role: 'Vice Chairperson', initials: 'SP' },
  { name: 'Shri. R. B. Shinde', role: 'Director', initials: 'RS' },
  { name: 'Dr. Nayak', role: 'Council Member', initials: 'DN' },
  { name: 'Thakur', role: 'Council Member', initials: 'TH' },
  { name: 'Pasalkar', role: 'Council Member', initials: 'AP' },
  { name: 'Parekh', role: 'Board Member', initials: 'PP' },
  { name: 'Shri. V. K. More', role: 'Head of Operations', initials: 'VM' },
];

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="team" ref={ref} className="py-20 md:py-24 relative">
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
            LEADERSHIP
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
            Meet Our <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Team</em>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>
            Guided by visionary leaders with decades of experience in education, business, and social impact.
          </p>
        </div>

        {/* Core Team */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-16">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`group text-center transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80 + 150}ms` }}
            >
              {/* TODO: Replace with real team photos when available */}
              <div
                className="monogram-avatar w-20 h-20 mx-auto mb-3"
                style={{ fontSize: '1.2rem' }}
              >
                {m.initials}
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)' }}>
                {m.name}
              </h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>
                {m.role}
              </p>
            </div>
          ))}
        </div>

        {/* Governing Council */}
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
            Governing Council
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COUNCIL.map((m, i) => (
              <div
                key={m.name}
                className="flex items-center gap-3 p-3 rounded-lg border"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="monogram-avatar w-10 h-10 flex-shrink-0" style={{ fontSize: '0.8rem' }}>
                  {m.initials}
                </div>
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '13px', color: 'var(--ink)' }}>{m.name}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--ink-5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
