import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { useState } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function BookVisit() {
  const [selected, setSelected] = useState<{ day: string; time: string } | null>(null);

  const handleBook = () => {
    if (!selected) return;
    // TODO: Replace XXXXXXXXXX with real WhatsApp number from RCIIF team
    const msg = encodeURIComponent(`I'd like to book a visit on ${selected.day} at ${selected.time}`);
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <PageLayout title="Book A Visit" description="Schedule a visit to RCIIF's workspace in Kharghar. Mon-Fri, 10 AM to 6 PM IST.">
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="BOOK A VISIT"
            title={<>See RCIIF <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>In Person</em></>}
            description="Pick a day and time slot. We'll confirm via WhatsApp."
          />

          <div className="space-y-6">
            {DAYS.map((day) => (
              <div key={day}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '14px', color: 'var(--ink)', marginBottom: '8px' }}>{day}</h3>
                <div className="flex flex-wrap gap-2">
                  {SLOTS.map((time) => {
                    const isSelected = selected?.day === day && selected?.time === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelected({ day, time })}
                        className="px-4 py-2 rounded-lg border transition-all"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          background: isSelected ? 'var(--gold)' : 'var(--surface)',
                          color: isSelected ? 'var(--bg)' : 'var(--ink-3)',
                          borderColor: isSelected ? 'var(--gold)' : 'var(--border)',
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="mt-8 p-6 rounded-xl border" style={{ background: 'var(--gold-bg)', borderColor: 'var(--gold-border)' }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: 'var(--ink)', marginBottom: '12px' }}>
                Selected: <strong>{selected.day} at {selected.time}</strong>
              </p>
              <button onClick={handleBook} className="btn-primary">Confirm via WhatsApp →</button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
