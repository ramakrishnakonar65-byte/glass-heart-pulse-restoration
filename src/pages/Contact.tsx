import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock } from 'lucide-react';

const INTENT_PATHS = [
  { icon: '✍️', label: 'Apply to Incubate', href: '/contact/apply' },
  { icon: '🤝', label: 'Partner With Us', href: '/contact/partner' },
  { icon: '📅', label: 'Book A Visit', href: '/contact/book-visit' },
  { icon: '📸', label: 'Media Enquiry', href: '/contact/media' },
];

export default function Contact() {
  return (
    <PageLayout title="Contact" description="Get in touch with RCIIF — apply to incubate, partner with us, book a visit, or make a media enquiry.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          {/* Lottie Animation + Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-6" style={{ width: 300, height: 300 }}>
              <video autoPlay loop muted playsInline width={300} height={300} style={{ borderRadius: '20px' }}>
                <source src="/animations/contact-us.webm" type="video/webm" />
                <img src="/animations/contact-us.gif" alt="Contact animation" width={150} />
              </video>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              Let's build something <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>together.</em>
            </h1>
          </div>

          {/* Intent Path Cards - 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {INTENT_PATHS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="card-spotlight flex items-center gap-4 p-6 rounded-xl border transition-all duration-300 no-underline"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', textDecoration: 'none' }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)' }}>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Info Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MapPin, label: 'Rayat Chaitanya Innovation & Incubation Foundation, Kharghar, Navi Mumbai, Maharashtra' },
              { icon: Clock, label: 'Monday–Friday, 10:00 AM – 6:00 PM IST' },
              { icon: Mail, label: 'info@rciif.org' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <Icon size={16} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden border mb-12" style={{ borderColor: 'var(--border)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.07!3d19.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKharghar%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RCIIF Location — Kharghar, Navi Mumbai"
            />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {[
              { label: 'LinkedIn', href: '#' },
              { label: 'Instagram', href: 'https://instagram.com/rciifkharghar' },
              { label: 'WhatsApp', href: '#' },
              { label: 'Email', href: 'mailto:info@rciif.org' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border transition-colors hover:border-[var(--gold-border)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface)', borderColor: 'var(--border)', textDecoration: 'none' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
