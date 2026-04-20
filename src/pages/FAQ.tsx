import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { useState } from 'react';

const FAQ_GROUPS = [
  {
    label: 'For Founders',
    items: [
      { q: 'What is Maverick Pont?', a: 'Maverick Pont is RCIIF\'s flagship accelerator program, taking startups from Pre-Seed to Series A with mentorship, capital access, and execution support.' },
      { q: 'What does RCIIF provide to startups?', a: 'Full-stack incubation: mentorship, legal & financial support, co-working space, capital introductions, digital marketing, and community.' },
      { q: 'What sectors do you focus on?', a: 'Sector-agnostic. Our current portfolio spans HealthTech, FinTech, FMCG, AI/Enterprise, HRTech, and EdTech.' },
      { q: 'Do you take equity?', a: 'Terms are discussed during the application process. RCIIF operates on founder-friendly terms.' },
      { q: 'Is it physical or remote?', a: 'Primarily physical — based at The Worksmith, Kharghar. Some remote flexibility is available.' },
    ],
  },
  {
    label: 'For Investors',
    items: [
      { q: 'How can I access deal flow?', a: 'Reach out via the partner form or attend an RCIIF event. We share portfolio details under NDA.' },
      { q: 'What is the minimum investment?', a: 'Varies by startup and round. We facilitate introductions to startups at various stages.' },
      { q: 'How do I become a partner?', a: 'Express interest via /contact/partner. We\'ll set up a portfolio review call.' },
    ],
  },
  {
    label: 'For Institutions',
    items: [
      { q: 'How do we sign an MoU?', a: 'Contact us via the partner form. Our team will share the MoU template and process.' },
      { q: 'Is RCIIF DPIIT recognised?', a: 'Yes. RCIIF is DPIIT-recognised by the Government of India as a startup incubator.' },
      { q: 'What programs can we run together?', a: 'Skill development, innovation challenges, internship programs, and industry-academia connect initiatives.' },
    ],
  },
  {
    label: 'For CSR / Corporate',
    items: [
      { q: 'How can CSR funds be directed to RCIIF?', a: 'RCIIF is 80G/12A certified. CSR contributions are tax-deductible. Contact us for the formal process.' },
      { q: 'Is the impact measurable?', a: 'Yes. We provide detailed impact reports with metrics for all CSR partnerships.' },
      { q: 'Can I get a CSR impact report?', a: 'Annual impact reports are available. Contact info@rciif.org to request one.' },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <PageLayout title="FAQ" description="Frequently asked questions about RCIIF — for founders, investors, institutions, and corporate partners.">
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="FAQ"
            title={<>Frequently Asked <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Questions</em></>}
          />

          <div className="space-y-10">
            {FAQ_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '12px' }}>{group.label}</h3>
                <div className="space-y-2">
                  {group.items.map((item, i) => {
                    const key = `${group.label}-${i}`;
                    return (
                      <div key={key} className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                        <button
                          onClick={() => toggle(key)}
                          className="w-full text-left p-4 flex items-center justify-between"
                          style={{ background: 'var(--surface)', fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: 'var(--ink)' }}
                        >
                          {item.q}
                          <span style={{ color: 'var(--gold)', fontSize: '18px' }}>{openItems[key] ? '−' : '+'}</span>
                        </button>
                        {openItems[key] && (
                          <div className="px-4 pb-4" style={{ background: 'var(--surface)' }}>
                            {/* TODO: Fill with verified answers from RCIIF team */}
                            <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
