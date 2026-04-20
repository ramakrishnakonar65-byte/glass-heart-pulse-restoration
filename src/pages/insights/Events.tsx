import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

const EVENTS = [
  { title: 'Shiv Jayanti 2026', desc: 'Community celebration bringing together founders, students, and mentors.', img: '/images/event-real-01.jpg' },
  { title: 'Innovation Gallery Inauguration', desc: 'November 2025 — Opening of RCIIF\'s innovation showcase.', img: '/images/event-real-02.jpg' },
  { title: 'International Yoga Day', desc: 'Wellness and mindfulness for the startup community.', img: '/images/event-real-03.jpg' },
  { title: 'Shubhaarambh Launch', desc: 'Flagship event marking new cohort beginnings.', img: '/images/event-large-01.jpg' },
  { title: 'Biodiversity Event 2025', desc: 'Environmental awareness and sustainable innovation.', img: '/images/event-large-02.jpg' },
  { title: 'Coffee with Catalyst', desc: 'Intimate sessions with industry leaders and investors.', img: '/images/event-large-04.jpg' },
];

export default function Events() {
  return (
    <PageLayout title="Events" description="RCIIF events — hackathons, demo days, workshops, community celebrations, and more.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="EVENTS"
            title={<>What's <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Happening</em></>}
            description="Hackathons, demo days, community events, and everything in between."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((e) => (
              <div key={e.title} className="card-spotlight rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="aspect-video overflow-hidden">
                  <img src={e.img} alt={e.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--ink)', marginBottom: '4px' }}>{e.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
