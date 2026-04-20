import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { icon: '📅', title: 'Events', desc: 'Hackathons, demo days, and community celebrations.', href: '/insights/events' },
  { icon: '☕', title: 'Coffee with Catalyst', desc: 'Intimate sessions with industry leaders.', href: '/insights/coffee' },
  { icon: '📸', title: 'Press & Media', desc: 'Press releases, media kit, and logo files.', href: '/insights/press' },
  { icon: '📚', title: 'Knowledge Hub', desc: 'Guides, articles, and resources for founders.', href: '/insights/knowledge' },
];

export default function Insights() {
  return (
    <PageLayout title="Insights" description="RCIIF insights — events, Coffee with Catalyst sessions, press coverage, and founder knowledge hub.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="INSIGHTS"
            title={<>Stories, Events & <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Knowledge</em></>}
            description="Everything happening at RCIIF — from events to founder guides."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SECTIONS.map((s) => (
              <Link key={s.title} to={s.href} className="card-spotlight p-8 rounded-xl border no-underline transition-all" style={{ background: 'var(--surface)', borderColor: 'var(--border)', textDecoration: 'none' }}>
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '18px', color: 'var(--ink)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.85 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
