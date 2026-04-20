import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getLenis } from '@/lib/lenis';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Maverick Pont', href: '/maverick' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Space', href: '/space' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
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
        <Link to="/" className="flex items-center gap-2.5 group py-3 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
            style={{ background: 'var(--gold-bg2)', borderColor: 'var(--gold-border)' }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'var(--gold)' }}>R</span>
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: '15px',
              color: showTransparent ? '#FDFBF7' : 'var(--ink)',
              textDecoration: 'none',
            }}
          >
            RCIIF
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative px-3 py-4 transition-colors no-underline"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive(link.href)
                  ? (showTransparent ? '#FDFBF7' : 'var(--ink)')
                  : (showTransparent ? 'rgba(253,251,247,0.6)' : 'var(--ink-4)'),
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-t transition-all duration-200"
                style={{
                  width: isActive(link.href) ? '80%' : '0%',
                  background: 'var(--gold)',
                }}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link to="/maverick/apply" className="hidden lg:inline-block btn-primary no-underline" style={{ padding: '10px 22px', fontSize: '9px', textDecoration: 'none' }}>
          Apply Now
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
          className="lg:hidden absolute top-full left-0 right-0 p-4 border-b"
          style={{
            background: 'rgba(253,251,247,0.98)',
            backdropFilter: 'blur(24px)',
            borderColor: 'var(--border)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-4 py-3 rounded-lg transition-colors no-underline"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                textDecoration: 'none',
                color: isActive(link.href) ? 'var(--gold)' : 'var(--ink-3)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/maverick/apply" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center mt-2 no-underline block" style={{ textDecoration: 'none' }}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
