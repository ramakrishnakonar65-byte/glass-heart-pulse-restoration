import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import MonogramAvatar from '@/components/MonogramAvatar';
import { useState } from 'react';

const SECTORS = ['All', 'HealthTech', 'FinTech', 'FMCG', 'EdTech', 'HRTech', 'AI / Enterprise'] as const;

const INCUBATEES = [
  { name: 'Rezonanz', sector: 'HealthTech', initials: 'RZ', desc: 'Healthcare communications platform.' },
  { name: 'Quaestio LLP', sector: 'FinTech', initials: 'QL', desc: 'Legal tech and fintech solutions.' },
  { name: 'Omegas Investment', sector: 'FinTech', initials: 'OI', desc: 'Investment advisory platform.' },
  { name: 'EatPure', sector: 'FMCG', initials: 'EP', desc: 'Premium wood-pressed oils.' },
  { name: 'Kampuram', sector: 'EdTech', initials: 'KP', desc: 'Education technology solutions.' },
  { name: 'Dear Society', sector: 'EdTech', initials: 'DS', desc: 'Community-driven social platform.' },
  { name: 'Nest Craft', sector: 'FMCG', initials: 'NC', desc: 'Artisan craft marketplace.' },
  { name: 'Kridinify Tech', sector: 'AI / Enterprise', initials: 'KT', desc: 'AI enterprise solutions.' },
  { name: 'Taiyo HR', sector: 'HRTech', initials: 'TH', desc: 'HR technology platform.' },
  { name: 'Omni Global Tech', sector: 'AI / Enterprise', initials: 'OG', desc: 'Global tech solutions.' },
  { name: 'My Event Factory', sector: 'AI / Enterprise', initials: 'ME', desc: 'Event management SaaS.' },
  { name: 'Tiden Technologies', sector: 'AI / Enterprise', initials: 'TT', desc: 'Technology solutions.' },
];

const ASSOCIATES = [
  'NamanAngels', 'IndusInd Bank', 'EduGlobe', 'KIFA', 'AIIPLTECH',
  'StarFelix', 'LiveTech India', 'London College Mumbai', 'Rezonanz',
  'EatPure', 'Kridinify Tech',
];

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All' ? INCUBATEES : INCUBATEES.filter(i => i.sector === filter);

  return (
    <PageLayout title="Portfolio" description="RCIIF's portfolio of 12 incubatees and 15+ associate partners across healthcare, fintech, AI, and consumer sectors.">
      <section className="pt-32 pb-20 page-fade-up">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="PORTFOLIO"
            title={<>Our <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Incubatees</em></>}
            description="12 startups building the future across healthcare, fintech, AI, and consumer sectors."
          />

          {/* Sector Filter */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-4 py-2 rounded-full transition-all"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: filter === s ? 'var(--gold)' : 'var(--surface)',
                  color: filter === s ? 'var(--bg)' : 'var(--ink-3)',
                  border: `1px solid ${filter === s ? 'var(--gold)' : 'var(--border)'}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Incubatee Cards */}
          <div key={filter} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-20 page-fade-up">
            {filtered.map((inc) => (
              <div
                key={inc.name}
                className="card-spotlight p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold-border)] hover:shadow-[0_12px_32px_rgba(184,136,44,0.08)]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <MonogramAvatar initials={inc.initials} size="sm" className="mb-3 rounded-lg" />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>{inc.name}</h3>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', background: 'var(--gold-bg)', border: '1px solid var(--gold-border)', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px' }}>{inc.sector}</span>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{inc.desc}</p>
              </div>
            ))}
          </div>

          {/* Associates */}
          <SectionHeader
            eyebrow="ASSOCIATES"
            title={<>Our <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Partners</em></>}
          />
          <div className="flex flex-wrap gap-3">
            {ASSOCIATES.map((p) => (
              <div key={p} className="px-5 py-3 rounded-lg border transition-colors hover:border-[var(--gold-border)]" style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
                {/* TODO: Replace with real logo PNGs */}
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
