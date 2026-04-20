import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

const DOCS = [
  { title: 'DPIIT Recognition Certificate', desc: 'Government of India DPIIT startup incubator recognition.', email: 'DPIIT Certificate Verification' },
  { title: '80G / 12A Certification', desc: 'Tax exemption certification for donors and partners.', email: '80G/12A Certificate Verification' },
  { title: 'Entity Registration', desc: 'Registered as Rayat Chaitanya Innovation & Incubation Foundation. CIN: [placeholder]. Incorporated 2022.', email: 'Entity Registration Details' },
];

export default function Legal() {
  return (
    <PageLayout title="Legal & Compliance" description="RCIIF legal documents, DPIIT recognition, 80G/12A certification, and entity registration details.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="LEGAL & COMPLIANCE"
            title={<>Documents & <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Verification</em></>}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCS.map((d) => (
              <div key={d.title} className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--gold-bg2)', border: '1px solid var(--gold-border)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--gold)' }}>📄</span>
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>{d.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '12px' }}>{d.desc}</p>
                <a href={`mailto:info@rciif.org?subject=${d.email}`} className="btn-secondary" style={{ fontSize: '9px', padding: '8px 16px' }}>
                  Verify →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
