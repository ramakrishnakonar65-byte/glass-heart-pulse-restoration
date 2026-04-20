import PageLayout from '@/components/PageLayout';
import MonogramAvatar from '@/components/MonogramAvatar';
import { Link, useParams } from 'react-router-dom';

const CASE_STUDIES: Record<string, { name: string; sector: string; initials: string; overview: string; challenge: string; support: string; metrics: string[]; quote: string }> = {
  rezonanz: {
    name: 'Rezonanz',
    sector: 'Healthcare Communications',
    initials: 'RZ',
    overview: 'Rezonanz is a healthcare communications startup building bridges between medical professionals, patients, and the pharmaceutical industry.',
    challenge: 'Breaking into the enterprise healthcare market with no prior industry connections or enterprise sales experience.',
    support: 'RCIIF provided mentorship from healthcare industry veterans, introduced enterprise prospects through its network, and supported pitch preparation for key client meetings.',
    metrics: ['First enterprise client within 3 months', 'Revenue growth of 4x in year one', '3 major hospital partnerships secured'],
    quote: 'RCIIF didn\'t just fund us — they rewired how we think about scale.',
  },
  eatpure: {
    name: 'EatPure',
    sector: 'Wood-Pressed Oils (FMCG)',
    initials: 'EP',
    overview: 'EatPure produces premium wood-pressed oils, reviving traditional cold-press methods with modern quality control and direct-to-consumer distribution.',
    challenge: 'Building a consumer brand in a commoditised market dominated by large FMCG companies.',
    support: 'RCIIF supported branding, digital marketing strategy, GST and compliance setup, and connected EatPure with retail distribution partners.',
    metrics: ['60% repeat customer rate', 'Built entirely from Kharghar', 'Distribution across 3 states'],
    quote: 'From a kitchen experiment to a real brand — RCIIF made it happen.',
  },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const study = CASE_STUDIES[slug || ''];

  if (!study) {
    return (
      <PageLayout title="Case Study Not Found">
        <section className="pt-32 pb-20 text-center">
          <p style={{ color: 'var(--ink-3)' }}>Case study not found.</p>
          <Link to="/maverick/alumni" className="btn-primary mt-4">Back to Alumni →</Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${study.name} — Case Study`} description={study.overview}>
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <MonogramAvatar initials={study.initials} size="lg" className="mb-6" />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px' }}>{study.name}</h1>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{study.sector}</span>

          <div className="mt-12 space-y-10">
            {[
              { label: 'Overview', text: study.overview },
              { label: 'The Challenge', text: study.challenge },
              { label: 'RCIIF Support', text: study.support },
            ].map((s) => (
              <div key={s.label}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>{s.label}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>{s.text}</p>
              </div>
            ))}

            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>Key Metrics</h3>
              <ul className="space-y-2">
                {study.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-3">
                    <span style={{ color: 'var(--gold)', fontSize: '14px' }}>✦</span>
                    <span style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="p-6 rounded-xl" style={{ background: 'var(--gold-bg)', borderLeft: '3px solid var(--gold)' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--ink)', lineHeight: 1.4, marginBottom: '8px' }}>"{study.quote}"</p>
              <cite style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontStyle: 'normal', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>— Founder, {study.name}</cite>
            </blockquote>
          </div>

          <Link to="/maverick/apply" className="btn-primary mt-12 inline-block">Apply Like {study.name} Did →</Link>
        </div>
      </section>
    </PageLayout>
  );
}
