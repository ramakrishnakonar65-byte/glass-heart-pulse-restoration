import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getLenis } from '@/lib/lenis';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Maverick Pont', href: '/maverick' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Board', href: '/board' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => setScrolled(scroll > 40);
      lenis.on('scroll', handler);
      return () => {
        lenis.off('scroll', handler);
      };
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On homepage, wait for hero reveal event before showing nav
  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }
    const handler = () => setRevealed(true);
    window.addEventListener('hero-reveal-done', handler);
    // Fallback: show after 3s in case event never fires
    const fallback = setTimeout(() => setRevealed(true), 3000);
    return () => {
      window.removeEventListener('hero-reveal-done', handler);
      clearTimeout(fallback);
    };
  }, [isHome]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const showTransparent = isHome && !scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        ...(!showTransparent ? {
          background: 'rgba(253,251,247,0.96)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid var(--border)',
        } : undefined),
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.5s ease',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group py-3 no-underline">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--gold-bg2), var(--gold-bg))',
              borderColor: 'var(--gold-border)',
              boxShadow: '0 4px 12px -4px rgba(184,136,44,0.25)',
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'var(--gold)', fontWeight: 500 }}>R</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: showTransparent ? '#FDFBF7' : 'var(--ink)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              RCIIF
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '7px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: showTransparent ? 'rgba(253,251,247,0.55)' : 'var(--ink-4)',
                marginTop: '3px',
              }}
            >
              Est. 2022
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative px-4 py-5 group transition-colors no-underline"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                color: isActive(link.href)
                  ? 'var(--gold)'
                  : (showTransparent ? 'rgba(253,251,247,0.7)' : 'var(--ink-3)'),
              }}
            >
              {link.label}
              {/* Hover underline */}
              <span
                className="absolute left-1/2 -translate-x-1/2 h-px transition-all duration-300 ease-out group-hover:w-[60%]"
                style={{
                  bottom: '12px',
                  width: '0%',
                  background: 'var(--gold)',
                  opacity: 0.5,
                }}
              />
              {/* Active dot */}
              {isActive(link.href) && (
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    bottom: '8px',
                    width: '4px',
                    height: '4px',
                    background: 'var(--gold)',
                    boxShadow: '0 0 8px rgba(184,136,44,0.6)',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/maverick/apply"
          className="hidden lg:inline-flex items-center gap-2 no-underline group"
          style={{
            background: 'var(--gold)',
            color: 'var(--bg)',
            padding: '11px 22px',
            borderRadius: '999px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 6px 18px -6px rgba(184,136,44,0.5)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          Apply
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: showTransparent ? '#FDFBF7' : 'var(--ink)' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 px-4 py-4 border-b"
          style={{
            background: 'rgba(12,11,9,0.97)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            borderColor: 'rgba(184,136,44,0.18)',
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block w-full px-4 py-3 rounded-xl transition-colors no-underline"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '15px',
                textDecoration: 'none',
                color: isActive(link.href) ? 'var(--gold)' : 'rgba(253,251,247,0.7)',
                background: isActive(link.href) ? 'rgba(184,136,44,0.08)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/maverick/apply"
            onClick={() => setMobileOpen(false)}
            className="no-underline block text-center mt-3 py-3 rounded-xl"
            style={{
              background: 'var(--gold)',
              color: 'var(--bg)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Apply →
          </Link>
        </div>
      )}
    </nav>
  );
}
