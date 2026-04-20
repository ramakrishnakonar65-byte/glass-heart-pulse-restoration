import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

const TIMELINE = [
  { year: '1935', event: 'Rayat Shikshan Sanstha founded by Karmaveer Bhaurao Patil — "Earn and Learn" philosophy' },
  { year: '2022', event: 'CIII (Centre for Innovation, Incubation, and Industry) established at Kharghar campus' },
  { year: '2023', event: 'Rebranded to RCIIF — Rayat Chaitanya Innovation & Incubation Foundation' },
  { year: '2024', event: 'Maverick Pont accelerator launched — Pre-Seed to Series A program' },
  { year: '2026', event: 'Cohort 2026 active — 12 startups across 6 sectors, 8 states reached' },
];

export default function Story() {
  return (
    <PageLayout title="Our Story" description="From Rayat Shikshan Sanstha in 1935 to RCIIF today — a legacy of empowering India through education and innovation.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="OUR STORY"
            title={<>From Legacy to <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Launchpad</em></>}
            description="Rooted in one of India's oldest educational trusts, RCIIF carries forward a 90-year philosophy of empowering people through knowledge."
          />

          {/* Timeline */}
          <div className="relative border-l-2 ml-4 pl-8 space-y-12 mb-20" style={{ borderColor: 'var(--gold-border)' }}>
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full border-2" style={{ background: 'var(--bg)', borderColor: 'var(--gold)' }} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '2rem', color: 'var(--gold)', display: 'block', marginBottom: '4px' }}>{t.year}</span>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>{t.event}</p>
              </div>
            ))}
          </div>

          {/* Philosophy */}
          <div className="dark-section p-12 rounded-2xl mb-12">
            <blockquote>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F0EBE0', lineHeight: 1.4, marginBottom: '16px' }}>
                "Innovation is not a privilege — it is a right we are building infrastructure for."
              </p>
              <cite style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontStyle: 'normal', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                — Dinesh Israni, CEO & Founder, RCIIF
              </cite>
            </blockquote>
          </div>

          <Link to="/about/team" className="btn-primary">Meet the Team →</Link>
        </div>
      </section>
    </PageLayout>
  );
}
