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
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => {
        const chars = line.split('');
        return (
          <span key={lineIndex} className="block">
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

      {/* Navbar */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>

          <div className="hidden md:flex items-center gap-8">
            {['Story', 'Investing', 'Building', 'Advisory'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/70 hover:text-gray-300 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Start a Chat
          </button>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          {/* Left Column */}
          <div>
            <AnimatedHeading text={"Shaping tomorrow\nwith vision and action."} />

            {/* Animated gold rule under headline */}
            <FadeIn delay={1000} duration={900}>
              <div
                className="mb-5"
                style={{
                  width: '80px',
                  height: '1px',
                  background: 'linear-gradient(90deg, #B8882C, rgba(184,136,44,0.2))',
                  transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </FadeIn>

            <FadeIn delay={800} duration={1000}>
              <p data-reveal data-delay="300" className="text-base md:text-lg text-gray-300 mb-5">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div data-reveal data-delay="400" className="flex flex-wrap gap-4">
                <MagneticButton>
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Start a Chat
                  </button>
                </MagneticButton>
                <MagneticButton>
                  <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                    Explore Now
                  </button>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
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
