import { useEffect, useRef, useState } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}

export function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function SectionHeader({ eyebrow, title, description, className = '' }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`max-w-2xl mb-14 ${className} ${inView ? 'is-revealed' : ''}`}
      style={{ willChange: 'opacity, transform' }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {eyebrow}
        <span className="gold-rule-animated" />
      </span>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '12px',
          color: 'var(--ink)',
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>
          {description}
        </p>
      )}
    </div>
  );
}
