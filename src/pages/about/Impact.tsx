import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { useRef } from 'react';
import { useInView } from '@/components/SectionHeader';

// TODO: Replace with verified real numbers from RCIIF team
const METRICS = [
  { num: '47', label: 'Startups Supported' },
  { num: '₹12Cr+', label: 'Funding Facilitated' },
  { num: '200+', label: 'Events & Workshops' },
  { num: '8', label: 'Indian States Reached' },
  { num: '5', label: 'Years of Operations' },
  { num: '14+', label: 'Associate Partners' },
];

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <PageLayout title="Impact & Numbers" description="RCIIF's measurable impact — startups supported, funding facilitated, events conducted, and states reached.">
      <section className="pt-32 pb-20" ref={ref}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="IMPACT & NUMBERS"
            title={<>Measurable <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Results</em></>}
            description="Zero prose padding. The numbers speak."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {METRICS.map((m, i) => (
              <div key={m.label} className={`text-center p-6 rounded-xl border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms`, background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 4vw, 5.5rem)', color: 'var(--gold)', lineHeight: 1 }}>
                  {m.num}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-4)', marginTop: '8px' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Annual Report Card */}
          <div className="p-8 rounded-xl border-2" style={{ borderColor: 'var(--gold-border)', background: 'var(--gold-bg)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '18px', color: 'var(--ink)', marginBottom: '8px' }}>RCIIF Annual Report 2024</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85, marginBottom: '16px' }}>
              Full-year impact report, financial summary, and portfolio overview.
            </p>
            {/* TODO: Replace with direct PDF link when annual_report_2024.pdf is available */}
            <a href="mailto:info@rciif.org?subject=Annual Report Request" className="btn-primary">
              Request PDF →
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
