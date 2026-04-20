import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default function Partner() {
  return (
    <PageLayout title="Partner With Us" description="Partner with RCIIF — explore CSR partnerships, institutional collaborations, and investor partnerships.">
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="PARTNER WITH US"
            title={<>Let's Grow <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Together</em></>}
            description="Whether you're a corporate, institution, or investor — there's a partnership model for you."
          />

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            {[
              { label: 'Organization Name', type: 'text', placeholder: 'Your organization' },
              { label: 'Contact Person', type: 'text', placeholder: 'Full name' },
              { label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Partnership Type', type: 'text', placeholder: 'CSR / Investment / Institutional / Other' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)', fontFamily: "'Outfit', sans-serif" }} />
              </div>
            ))}
            <div>
              <label className="block mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-4)' }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your partnership interest..." className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none resize-none" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)', fontFamily: "'Outfit', sans-serif" }} />
            </div>
            <button type="submit" className="btn-primary">Submit Enquiry</button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
