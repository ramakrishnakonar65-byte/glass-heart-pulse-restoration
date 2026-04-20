import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import MonogramAvatar from '@/components/MonogramAvatar';

const TEAM = [
  { name: 'Dinesh Israni', role: 'CEO & Founder', initials: 'DI', bio: 'Leads RCIIF\'s vision and strategy.' },
  { name: 'Deovrut Jadhav', role: 'Chief Operating Officer', initials: 'DJ', bio: 'Manages day-to-day operations and startup support.' },
  { name: 'Prasad Pawar', role: 'Digital Marketing Head', initials: 'PP', bio: 'Drives RCIIF\'s online presence and content strategy.' },
  { name: 'Vidya Tandel', role: 'Accountant', initials: 'VT', bio: 'Manages financial operations and compliance.' },
  { name: 'Roshani Shinde', role: 'Community Manager', initials: 'RS', bio: 'Builds and nurtures the RCIIF startup community.' },
];

const COUNCIL = [
  { name: 'Dr. Nayak', role: 'Council Member', initials: 'DN' },
  { name: 'Thakur', role: 'Council Member', initials: 'TH' },
  { name: 'Pasalkar', role: 'Council Member', initials: 'AP' },
  { name: 'Parekh', role: 'Board Member', initials: 'PP' },
  { name: 'Dr. K. V. Kale', role: 'Chairman', initials: 'KK' },
  { name: 'Smt. Sunita Patil', role: 'Vice Chairperson', initials: 'SP' },
  { name: 'Shri. R. B. Shinde', role: 'Director', initials: 'RS' },
  { name: 'Shri. V. K. More', role: 'Head of Operations', initials: 'VM' },
];

export default function Team() {
  return (
    <PageLayout title="Team & Council" description="Meet the team and governing council behind RCIIF — leaders in education, business, and social impact.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="OUR TEAM"
            title={<>The People Behind <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>RCIIF</em></>}
            description="Guided by visionary leaders with decades of experience in education, business, and social impact."
          />

          {/* Core Team — Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {TEAM.map((m) => (
              <div key={m.name} className="card-spotlight p-6 rounded-xl border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* TODO: Replace with real team photos when available */}
                <MonogramAvatar initials={m.initials} size="lg" className="mx-auto mb-4" />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)' }}>{m.name}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px', marginBottom: '8px' }}>{m.role}</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{m.bio}</p>
              </div>
            ))}
          </div>

          {/* Governing Council */}
          <SectionHeader
            eyebrow="GOVERNING COUNCIL"
            title={<>Advisory <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Board</em></>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COUNCIL.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3 p-4 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)', animationDelay: `${i * 80}ms` }}>
                <MonogramAvatar initials={m.initials} size="sm" />
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '13px', color: 'var(--ink)' }}>{m.name}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--ink-5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
