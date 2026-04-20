import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Maverick Pont', href: '/maverick' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Space', href: '/space' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{ background: 'var(--ink)', borderColor: 'rgba(253,251,247,0.08)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 no-underline">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{ background: 'var(--gold-bg2)', borderColor: 'var(--gold-border)' }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'var(--gold)' }}>R</span>
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: '#F0EBE0', textDecoration: 'none' }}>RCIIF</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(240,235,224,0.5)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '16px' }}>
              Nurturing startups from Kharghar to the world.
            </p>
            <div className="flex gap-3">
              {['DPIIT', '80G/12A'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--gold)',
                    background: 'rgba(184,136,44,0.08)',
                    border: '1px solid rgba(184,136,44,0.2)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(240,235,224,0.4)',
                marginBottom: '16px',
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="transition-colors no-underline hover:text-[var(--gold)]"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      color: 'rgba(240,235,224,0.5)',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(240,235,224,0.4)',
                marginBottom: '16px',
              }}
            >
              Contact
            </h4>
            <div className="space-y-2">
              <p style={{ fontSize: '13px', color: 'rgba(240,235,224,0.5)' }}>Kharghar, Navi Mumbai</p>
              <p style={{ fontSize: '13px', color: 'rgba(240,235,224,0.5)' }}>info@rciif.org</p>
              <p style={{ fontSize: '13px', color: 'rgba(240,235,224,0.5)' }}>@rciifkharghar</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(253,251,247,0.08)' }}
        >
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--ink-5)', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} RCIIF · <Link to="/faq" style={{ color: 'var(--ink-5)', textDecoration: 'none' }}>Privacy Policy</Link> · <Link to="/faq" style={{ color: 'var(--ink-5)', textDecoration: 'none' }}>Terms</Link> · <Link to="/sitemap" style={{ color: 'var(--ink-5)', textDecoration: 'none' }}>Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
