import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

const STEPS = [
  { num: '01', title: 'Express Interest', desc: 'Reach out via the partner form or connect at an RCIIF event.' },
  { num: '02', title: 'Portfolio Review', desc: 'We share current deal flow and portfolio overview under NDA.' },
  { num: '03', title: 'Due Diligence', desc: 'Access founder sessions, pitch days, and detailed startup data.' },
  { num: '04', title: 'Co-Invest', desc: 'Participate in funding rounds alongside RCIIF\'s angel network.' },
];

export default function Investors() {
  return (
    <PageLayout title="For Investors" description="Access curated deal flow, co-investment opportunities, and portfolio diversity from RCIIF's Maverick Pont accelerator.">
      <section className="pt-32 pb-20 page-fade-up">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="FOR INVESTORS"
            title={<>Curated Deal <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Flow</em></>}
            description="Data-first. No mission statements. No padding."
          />

          {/* Key Stats */}
          {/* TODO: Replace with verified real numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { num: '12', label: 'Active Portfolio Companies' },
              { num: '6', label: 'Sectors Covered' },
              { num: '₹12Cr+', label: 'Total Funding Facilitated' },
              { num: '3x', label: 'Avg. Valuation Growth' },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)', marginTop: '8px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Partner Onboarding */}
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '18px', color: 'var(--ink)', marginBottom: '16px' }}>Partner Onboarding Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {STEPS.map((s) => (
              <div key={s.num} className="p-5 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '22px', color: 'var(--gold)', fontWeight: 300 }}>{s.num}</span>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)', margin: '8px 0 4px' }}>{s.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/contact/partner" className="btn-primary">Become a Partner →</Link>
        </div>
      </section>
    </PageLayout>
  );
}
