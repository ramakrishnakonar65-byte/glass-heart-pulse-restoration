import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Maverick Pont', href: '/maverick' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Board', href: '/board' },
];

const PROGRAM_LINKS = [
  { label: 'Apply to Cohort', href: '/maverick/apply' },
  { label: 'For Investors', href: '/maverick/investors' },
  { label: 'Alumni & Case Studies', href: '/maverick/alumni' },
];

const SOCIALS = [
  { Icon: Instagram, href: 'https://instagram.com/rciifkharghar', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 text-white/40 font-[Instrument_Sans]"
      style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      Kharghar, IST · {time}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/10">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/60 to-transparent" />

      {/* Soft green orb (background depth) */}
      <div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width: 600,
          height: 600,
          background: 'rgb(34,197,94)',
          opacity: 0.04,
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Newsletter strip */}
      <section className="relative w-full px-4 pt-20 pb-14 border-b border-white/10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-green-400 font-[Instrument_Sans] uppercase block mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.22em' }}>
              Stay in the Loop
            </span>
            <h3 className="text-3xl md:text-5xl font-bold font-[Instrument_Serif] text-white leading-[1.05] max-w-xl">
              Get cohort updates &<br />
              <em className="italic text-green-400">founder stories</em> in your inbox.
            </h3>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="flex w-full md:w-auto md:min-w-[420px] items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 hover:border-green-500/40 focus-within:border-green-500/60 transition-colors"
          >
            <Mail className="ml-3 w-4 h-4 text-white/40 shrink-0" />
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none font-[Instrument_Sans] py-2 text-sm md:text-[15px]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] rounded-full px-4 md:px-5 py-2.5 text-sm transition-colors shrink-0"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Main grid */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 no-underline group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-500/10 border border-green-500/30 group-hover:border-green-400 transition-colors">
                <span className="font-[Instrument_Serif] font-bold text-green-400" style={{ fontSize: '1.05rem' }}>R</span>
              </div>
              <span className="font-[Instrument_Serif] font-bold text-white" style={{ fontSize: '20px', letterSpacing: '-0.01em' }}>
                RCIIF
              </span>
            </Link>
            <p className="text-white/55 font-[Instrument_Sans] mb-6 max-w-sm" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              Rayat Centenary Innovation & Incubation Foundation — a DPIIT-recognised incubator nurturing startups from Kharghar to the world.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['DPIIT Recognised', '80G/12A', 'Startup India'].map((badge) => (
                <span
                  key={badge}
                  className="font-[Instrument_Sans] uppercase text-green-400 bg-green-500/10 border border-green-500/25 rounded-full"
                  style={{ fontSize: '9px', letterSpacing: '0.16em', padding: '4px 11px' }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:bg-green-500/10 hover:border-green-500/40 hover:text-green-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-white/40 font-[Instrument_Sans] uppercase mb-5"
              style={{ fontSize: '10px', letterSpacing: '0.22em' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/65 hover:text-green-400 transition-colors no-underline font-[Instrument_Sans]"
                    style={{ fontSize: '14px', textDecoration: 'none' }}
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h4 className="text-white/40 font-[Instrument_Sans] uppercase mb-5"
              style={{ fontSize: '10px', letterSpacing: '0.22em' }}>
              Programs
            </h4>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/65 hover:text-green-400 transition-colors no-underline font-[Instrument_Sans]"
                    style={{ fontSize: '14px', textDecoration: 'none' }}
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-white/40 font-[Instrument_Sans] uppercase mb-5"
              style={{ fontSize: '10px', letterSpacing: '0.22em' }}>
              Reach Us
            </h4>
            <ul className="space-y-3 font-[Instrument_Sans]">
              <li className="flex items-start gap-2 text-white/65" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Kharghar,<br />Navi Mumbai</span>
              </li>
              <li>
                <a href="mailto:info@rciif.org"
                  className="inline-flex items-center gap-2 text-white/65 hover:text-green-400 transition-colors no-underline"
                  style={{ fontSize: '14px', textDecoration: 'none' }}>
                  <Mail className="w-4 h-4 text-green-400 shrink-0" />
                  info@rciif.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative overflow-hidden mb-8">
          <h2
            aria-hidden
            className="font-[Instrument_Serif] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent leading-none select-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              letterSpacing: '-0.04em',
              textAlign: 'center',
            }}
          >
            RCIIF
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 font-[Instrument_Sans]"
            style={{ fontSize: '11px', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} RCIIF · All rights reserved · Built in Kharghar
          </p>
          <LiveClock />
        </div>
      </div>
    </footer>
  );
}
