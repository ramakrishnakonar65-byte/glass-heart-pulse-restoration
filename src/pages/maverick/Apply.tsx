import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { useState } from 'react';

const ELIGIBILITY = [
  { q: 'Are you pre-revenue to Series A?', key: 'stage' },
  { q: 'Is your startup registered in India?', key: 'registered' },
  { q: 'Are you willing to be based in Kharghar for cohort duration?', key: 'location' },
];

const DOCUMENTS = [
  'Company incorporation proof',
  'Pitch deck (PDF or link)',
  'Founder Aadhaar / PAN',
  'Bank statement (last 3 months)',
];

const FAQS = [
  { q: 'What is the equity ask?', a: 'Details will be shared during the application process. RCIIF operates on founder-friendly terms.' },
  { q: 'How long is the program?', a: 'Cohort duration varies. Typically 6-12 months of intensive support.' },
  { q: 'Is it physical or remote?', a: 'Primarily physical — based at The Worksmith, Kharghar. Some remote flexibility.' },
  { q: 'What sectors do you focus on?', a: 'Sector-agnostic. Current portfolio spans HealthTech, FinTech, FMCG, AI, HRTech, and EdTech.' },
  { q: 'When is the next cohort?', a: 'Cohort 2026 is currently active. Applications for the next cohort will be announced on our social channels.' },
];

export default function Apply() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const allAnswered = ELIGIBILITY.every(e => answers[e.key] !== undefined && answers[e.key] !== null);
  const allYes = allAnswered && ELIGIBILITY.every(e => answers[e.key] === true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLayout title="Apply to Maverick Pont" description="Apply to RCIIF's Maverick Pont accelerator. Check eligibility, prepare documents, and submit your application.">
      <section className="pt-32 pb-20 page-fade-up">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="APPLY"
            title={<>Join Maverick <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Pont</em></>}
            description="Maximum clarity, minimum friction. Check your eligibility and apply."
          />

          {/* Eligibility Quiz */}
          <div className="mb-12 p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '16px' }}>Quick Eligibility Check</h3>
            <div className="space-y-4">
              {ELIGIBILITY.map((e) => (
                <div key={e.key} className="flex items-center justify-between gap-4">
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}>{e.q}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    {['Yes', 'No'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers(prev => ({ ...prev, [e.key]: opt === 'Yes' }))}
                        className="px-4 py-1.5 rounded text-xs transition-colors"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          background: answers[e.key] === (opt === 'Yes') ? (opt === 'Yes' ? 'var(--forest)' : 'var(--ink-4)') : 'var(--bg)',
                          color: answers[e.key] === (opt === 'Yes') ? '#FDFBF7' : 'var(--ink-3)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {allAnswered && (
              <div className="mt-4 p-4 rounded-lg" style={{ background: allYes ? 'var(--forest-bg)' : 'var(--gold-bg)', border: `1px solid ${allYes ? 'var(--forest-border)' : 'var(--gold-border)'}` }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, color: allYes ? 'var(--forest)' : 'var(--gold)' }}>
                  {allYes ? "✓ You're eligible! Apply below." : "Speak to our team first — we may still be able to help."}
                </p>
                {!allYes && (
                  // TODO: Replace XXXXXXXXXX with real WhatsApp number
                  <a href="https://wa.me/91XXXXXXXXXX?text=Hi, I'd like to discuss Maverick Pont eligibility" className="btn-secondary mt-2" style={{ fontSize: '9px', padding: '6px 14px' }}>
                    WhatsApp Us →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Required Documents */}
          <div className="mb-12">
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '12px' }}>Required Documents</h3>
            <ul className="space-y-3">
              {DOCUMENTS.map((d, i) => (
                <li key={d} className="flex items-center gap-3 p-3 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--gold)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Form Embed Placeholder */}
          <div className="mb-12 p-8 rounded-xl border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--gold-border)' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: 'var(--ink-3)', marginBottom: '12px' }}>
              {/* TODO: Replace with actual Google Form iframe URL from RCIIF team */}
              Application form will be embedded here.
            </p>
            <a href="mailto:info@rciif.org?subject=Maverick Pont Application" className="btn-primary">
              Email Application →
            </a>
          </div>

          {/* FAQ */}
          <div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '12px' }}>Frequently Asked Questions</h3>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-4 flex items-center justify-between"
                    style={{ background: 'var(--surface)', fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: 'var(--ink)' }}
                  >
                    {f.q}
                    <span style={{ color: 'var(--gold)', fontSize: '18px' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4" style={{ background: 'var(--surface)' }}>
                      {/* TODO: Fill with verified answers from RCIIF team */}
                      <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
