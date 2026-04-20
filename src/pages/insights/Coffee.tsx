import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

const SESSIONS = [
  { title: 'Domain Names as Brand Assets', speaker: 'Akshay Pasalkar', date: 'Date TBA', desc: 'How choosing the right domain can define your brand identity and valuation.' },
  { title: 'Upcoming Session', speaker: 'TBA', date: 'Coming Soon', desc: 'Stay tuned for our next Coffee with Catalyst session.' },
  { title: 'Upcoming Session', speaker: 'TBA', date: 'Coming Soon', desc: 'Stay tuned for our next Coffee with Catalyst session.' },
];

export default function Coffee() {
  return (
    <PageLayout title="Coffee with Catalyst" description="Coffee with Catalyst — intimate knowledge-sharing sessions with industry leaders at RCIIF.">
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="COFFEE WITH CATALYST"
            title={<>Conversations That <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Matter</em></>}
            description="Intimate, no-slides sessions where industry leaders share real insights over coffee."
          />

          <div className="space-y-4">
            {SESSIONS.map((s, i) => (
              <div key={i} className="card-spotlight p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '4px' }}>{s.title}</h3>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Speaker: {s.speaker}</p>
                    <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--ink-5)', whiteSpace: 'nowrap' }}>{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
