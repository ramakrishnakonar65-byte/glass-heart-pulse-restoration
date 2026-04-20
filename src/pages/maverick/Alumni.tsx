import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import MonogramAvatar from '@/components/MonogramAvatar';
import { Link } from 'react-router-dom';

const ALUMNI = [
  { name: 'Rezonanz', sector: 'HealthTech', initials: 'RZ', quote: 'We closed our first enterprise client 3 months after the Maverick Pont cohort.', href: '/maverick/alumni/rezonanz' },
  { name: 'EatPure', sector: 'FMCG', initials: 'EP', quote: '60% repeat customer rate. Built from Kharghar.', href: '/maverick/alumni/eatpure' },
  { name: 'Kridinify Tech', sector: 'AI / Enterprise', initials: 'KT', quote: 'RCIIF connected us to our first 3 enterprise clients.', href: '#' },
];

export default function Alumni() {
  return (
    <PageLayout title="Alumni & Success Stories" description="Success stories from RCIIF's Maverick Pont accelerator alumni — Rezonanz, EatPure, Kridinify Tech and more.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="ALUMNI"
            title={<>Success <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Stories</em></>}
            description="Founders who turned their ideas into impactful companies through Maverick Pont."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ALUMNI.map((a) => (
              <Link key={a.name} to={a.href} className="card-spotlight p-6 rounded-xl border no-underline" style={{ background: 'var(--surface)', borderColor: 'var(--border)', textDecoration: 'none' }}>
                <MonogramAvatar initials={a.initials} size="md" className="mb-4 rounded-xl" />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '18px', color: 'var(--ink)', marginBottom: '4px' }}>{a.name}</h3>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', background: 'var(--gold-bg)', border: '1px solid var(--gold-border)', padding: '2px 8px', borderRadius: '20px' }}>{a.sector}</span>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85, marginTop: '12px', fontStyle: 'italic' }}>"{a.quote}"</p>
              </Link>
            ))}
          </div>

          <Link to="/maverick/apply" className="btn-primary">Apply Like They Did →</Link>
        </div>
      </section>
    </PageLayout>
  );
}
