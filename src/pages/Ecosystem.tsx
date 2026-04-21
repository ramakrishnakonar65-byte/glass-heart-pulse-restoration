import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/animations/SpotlightCard';
import { useState } from 'react';

const TABS = ['For Startups', 'For Institutions', 'For Investors'] as const;

const SERVICES: Record<typeof TABS[number], { icon: string; title: string; desc: string }[]> = {
  'For Startups': [
    { icon: '📋', title: 'Company Registration', desc: 'End-to-end incorporation support.' },
    { icon: '🇮🇳', title: 'Startup India Registration', desc: 'DPIIT recognition assistance.' },
    { icon: '🧾', title: 'GST Registration', desc: 'Tax compliance setup and filing.' },
    { icon: '📊', title: 'Pitch Deck Design', desc: 'Investor-ready pitch materials.' },
    { icon: '🎨', title: 'Logo & Branding', desc: 'Visual identity design.' },
    { icon: '📱', title: 'Social Media Management', desc: 'Platform strategy and content.' },
    { icon: '📈', title: 'Digital Marketing', desc: 'Growth marketing campaigns.' },
    { icon: '✍️', title: 'Content Creation', desc: 'Blog, video, and collateral.' },
    { icon: '🖼️', title: 'Graphic Design', desc: 'Marketing and product design.' },
    { icon: '🏛️', title: 'Government Grants Access', desc: 'Navigate grant applications.' },
    { icon: '⚖️', title: 'Legal Support', desc: 'Contracts, IP, compliance.' },
    { icon: '💹', title: 'Financial Modelling', desc: 'Revenue projections and planning.' },
  ],
  'For Institutions': [
    { icon: '🎓', title: 'Skill Development Programs', desc: 'Structured curriculum for students.' },
    { icon: '🏫', title: 'Training Workshops', desc: 'Industry-relevant workshops.' },
    { icon: '💡', title: 'Innovation Challenges', desc: 'Hackathons and competitions.' },
    { icon: '🤝', title: 'Industry-Academia Connect', desc: 'Bridge the gap.' },
    { icon: '👔', title: 'Internship & Placement', desc: 'Connect students to startups.' },
  ],
  'For Investors': [
    { icon: '📊', title: 'Valuation (Registered Valuer)', desc: 'Independent startup valuation.' },
    { icon: '📈', title: 'Financial Projection', desc: 'Revenue and growth models.' },
    { icon: '💰', title: 'Mutual Funds & Unlisted Shares', desc: 'Investment instruments.' },
    { icon: '☁️', title: 'AWS Credits', desc: 'Cloud infrastructure benefit.' },
    { icon: '✅', title: 'Investment Readiness Assessment', desc: 'Startup diligence check.' },
  ],
};

export default function Ecosystem() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('For Startups');

  return (
    <PageLayout title="Ecosystem" description="RCIIF's full-stack startup ecosystem — services for startups, institutions, and investors.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="ECOSYSTEM"
            title={<>Everything Under <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>One Roof</em></>}
            description="From ideation to exit, RCIIF provides comprehensive support for startups, institutions, and investors."
          />

          {/* Pill Nav */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-full transition-all duration-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    background: active ? 'var(--gold)' : 'var(--surface)',
                    color: active ? 'var(--bg)' : 'var(--ink-3)',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                    transform: active ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: active ? '0 4px 20px rgba(184,136,44,0.25)' : 'none',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Service Grid */}
          <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 page-fade-up">
            {SERVICES[activeTab].map((s) => (
              <SpotlightCard key={s.title} className="p-6 rounded-xl border" spotlightColor="rgba(184, 136, 44, 0.25)">
                <span className="text-2xl mb-3 block">{s.icon}</span>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '4px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{s.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
