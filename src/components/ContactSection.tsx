import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-20 md:py-24 relative">
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
            CONTACT
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
            Let's build <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>something together.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Intent path cards */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: '✍️', label: 'Apply to Incubate', href: '/contact/apply' },
              { icon: '🤝', label: 'Partner With Us', href: '/contact/partner' },
              { icon: '📅', label: 'Book A Visit', href: '/contact/book-visit' },
              { icon: '📸', label: 'Media Enquiry', href: '/contact/media' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold-border)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span className="text-xl">{item.icon}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)' }}>
                  {item.label}
                </span>
              </a>
            ))}

            {/* Info */}
            <div className="pt-4 space-y-3">
              {[
                { icon: Mail, label: 'info@rciif.org' },
                { icon: Phone, label: '+91 (020) XXXX-XXXX' },
                { icon: MapPin, label: 'Kharghar, Navi Mumbai, Maharashtra' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <Icon size={14} style={{ color: 'var(--gold)' }} />
                    <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact form */}
          <form
            className={`lg:col-span-3 p-6 rounded-xl border transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {['Name', 'Email'].map((field) => (
                <div key={field}>
                  <label
                    className="block mb-1.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)' }}
                  >
                    {field}
                  </label>
                  <input
                    type={field === 'Email' ? 'email' : 'text'}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{
                      background: 'var(--bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--ink)',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    placeholder={field === 'Email' ? 'you@example.com' : 'Your name'}
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label
                className="block mb-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)' }}
              >
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)', fontFamily: "'Outfit', sans-serif" }}
                placeholder="How can we help?"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)' }}
              >
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)', fontFamily: "'Outfit', sans-serif" }}
                placeholder="Tell us about your idea..."
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
