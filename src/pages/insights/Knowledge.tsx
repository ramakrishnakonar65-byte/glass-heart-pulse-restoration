import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

const ARTICLES = [
  { title: 'How to Register a Startup Under Startup India — Step-by-Step Guide (2024)', category: 'Legal' },
  { title: 'GST Registration for Startups: Everything You Need to Know', category: 'Finance' },
  { title: 'How to Pitch to Angel Investors in India: A Founder\'s Guide', category: 'Fundraising' },
  { title: 'DPIIT Recognition: Benefits, Eligibility, and Application Process', category: 'Legal' },
  { title: 'Building a Pitch Deck That Raises Capital: 12 Slides That Work', category: 'Fundraising' },
  { title: 'Company Registration in India: Pvt Ltd vs LLP vs OPC Compared', category: 'Legal' },
  { title: 'Government Grants for Startups in India: Complete 2024 Directory', category: 'Funding' },
  { title: 'Digital Marketing for Early-Stage Startups: Zero to 10K Followers', category: 'Marketing' },
  { title: 'Financial Modelling for Founders Who Hate Spreadsheets', category: 'Finance' },
  { title: 'Co-Working Spaces in Navi Mumbai: A Founder\'s Comparison', category: 'Workspace' },
];

export default function Knowledge() {
  return (
    <PageLayout title="Knowledge Hub" description="Guides, articles, and resources for Indian startup founders — from registration to fundraising.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="KNOWLEDGE HUB"
            title={<>Founder <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Resources</em></>}
            description="Practical guides for Indian startup founders. SEO-optimized, no fluff."
          />

          <div className="space-y-3">
            {ARTICLES.map((a, i) => (
              <div key={i} className="card-spotlight p-5 rounded-xl border flex items-center justify-between gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>{a.title}</h3>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', background: 'var(--gold-bg)', border: '1px solid var(--gold-border)', padding: '2px 8px', borderRadius: '20px' }}>{a.category}</span>
                </div>
                {/* TODO: Link to actual article pages when content is written */}
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--ink-5)' }}>Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
