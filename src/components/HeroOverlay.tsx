import { useState, useEffect, useRef } from 'react';
import { getLenis } from '@/lib/lenis';

/* ── FadeIn wrapper ── */
function FadeIn({
  children,
  delay = 0,
  duration = 1000,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="transition-opacity"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── AnimatedHeading ── */
function AnimatedHeading({ text, initialDelay = 200, charDelay = 30 }: { text: string; initialDelay?: number; charDelay?: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1
      className="font-normal mb-6 text-white"
      style={{
        fontFamily: "'Instrument Serif', serif",
        fontWeight: 700,
        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
      }}
    >
      {lines.map((line, lineIndex) => {
        const chars = line.split('');
        return (
          <span key={lineIndex} className="block" style={lineIndex === 1 ? { color: '#B8882C', fontStyle: 'italic' } : {}}>
            {chars.map((char, charIndex) => {
              const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
              return (
                <span
                  key={charIndex}
                  className="inline-block"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateX(0)' : 'translateX(-18px)',
                    transition: 'opacity 500ms, transform 500ms',
                    transitionDelay: `${delay}ms`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/* ── Magnetic button wrapper ── */
function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn-magnetic inline-block ${className}`}
    >
      {children}
    </div>
  );
}

export default function HeroOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax via Lenis (fallback to scroll listener)
  useEffect(() => {
    const apply = (scroll: number) => {
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${scroll * 0.3}px) scale(1.05)`;
      }
    };
    const lenis = getLenis();
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => apply(scroll);
      lenis.on('scroll', handler);
      return () => {
        lenis.off('scroll', handler);
      };
    }
    const onScroll = () => apply(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col text-white bg-black overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-24 lg:pb-32">
        <div className="max-w-3xl">
          <FadeIn delay={0} duration={900}>
            <AnimatedHeading text={"Where Ideas Find\nInfrastructure."} />
          </FadeIn>

          <FadeIn delay={400} duration={900}>
            <p
              className="text-white/85 mb-8 max-w-xl"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.65,
                letterSpacing: '-0.005em',
              }}
            >
              DPIIT-recognised incubator empowering early-stage startups from Kharghar, Navi Mumbai.
            </p>
          </FadeIn>

          <FadeIn delay={700} duration={900}>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <a
                  href="/maverick/apply"
                  className="inline-flex items-center gap-2 no-underline"
                  style={{
                    background: '#B8882C',
                    color: '#0C0B09',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 8px 24px -8px rgba(184,136,44,0.5)',
                  }}
                >
                  Apply as Startup
                  <span aria-hidden>→</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 no-underline"
                  style={{
                    background: 'rgba(253,251,247,0.08)',
                    color: '#FDFBF7',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    textDecoration: 'none',
                    border: '1px solid rgba(253,251,247,0.25)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  Explore Ecosystem
                  <span aria-hidden>→</span>
                </a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1800} duration={900}>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
            <div
              className="scroll-pulse"
              style={{
                width: '1px',
                height: '32px',
                background: 'linear-gradient(180deg, transparent, #B8882C)',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(184,136,44,0.7)',
              }}
            >
              Scroll
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
