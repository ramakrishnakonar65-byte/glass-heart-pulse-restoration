import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

const ZONES = [
  { icon: '🏭', title: 'The Worksmith', desc: 'Industrial-chic. Exposed brick, glass pods, lockers. Solo focused work.', img: '/images/space-real-01.jpg' },
  { icon: '💻', title: 'Collaborative Space', desc: 'Open-plan, ergonomic desks, power everywhere. For teams.', img: '/images/space-real-02.jpg' },
  { icon: '🏛️', title: 'Nexus Hall', desc: '50+ capacity. Events, demo days, workshops, hackathons.', img: '/images/event-large-01.jpg' },
  { icon: '🏋️', title: 'Gym', desc: 'Cardio and weights for the team.', img: '/images/space-real-03.jpg' },
  { icon: '☕', title: 'Common Lounge', desc: 'Coffee, community, and conversations.', img: '/images/space-real-04.jpg' },
];

const GALLERY = [
  '/images/gallery-01.jpg', '/images/gallery-02.jpg', '/images/gallery-03.jpg',
  '/images/gallery-04.jpg', '/images/gallery-05.jpg', '/images/gallery-06.jpg',
  '/images/gallery-07.jpg', '/images/gallery-09.jpg',
];

export default function Space() {
  return (
    <PageLayout title="Our Space" description="Explore RCIIF's workspace in Kharghar — The Worksmith, Collaborative Space, Nexus Hall, and more.">
      {/* Photo Gallery */}
      <section className="pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="OUR SPACE"
            title={<>Where Innovation <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Lives</em></>}
            description="Kharghar's premier startup workspace. Built for builders."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {GALLERY.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square">
                <img src={img} alt={`RCIIF space gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ZONES.map((z) => (
              <div key={z.title} className="card-spotlight rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="aspect-video overflow-hidden">
                  <img src={z.img} alt={z.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xl mb-2 block">{z.icon}</span>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '4px' }}>{z.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{z.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky CTA */}
          <div className="text-center">
            <Link to="/contact/book-visit" className="btn-primary">Book A Visit →</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
