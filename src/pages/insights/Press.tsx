import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default function Press() {
  return (
    <PageLayout title="Press & Media" description="RCIIF press resources — media kit, logo files, press releases, and media contact information.">
      <section className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-20">
          <SectionHeader
            eyebrow="PRESS & MEDIA"
            title={<>Media <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Resources</em></>}
            description="Assets first, forms never. Everything you need to cover RCIIF."
          />

          {/* Assets Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '8px' }}>📦 Media Kit</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '12px' }}>Brand guidelines, high-res logos, boilerplate, and key facts.</p>
              {/* TODO: Replace with direct download link when media kit is ready */}
              <a href="mailto:press@rciif.org?subject=Media Kit Request" className="btn-secondary" style={{ fontSize: '9px', padding: '8px 16px' }}>
                Request Media Kit →
              </a>
            </div>
            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '8px' }}>🎨 Logo Files</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '12px' }}>RCIIF logo in SVG, PNG, and EPS formats.</p>
              <a href="mailto:press@rciif.org?subject=Logo Files Request" className="btn-secondary" style={{ fontSize: '9px', padding: '8px 16px' }}>
                Request Logos →
              </a>
            </div>
          </div>

          {/* Press Contact */}
          <div className="p-6 rounded-xl border" style={{ background: 'var(--gold-bg)', borderColor: 'var(--gold-border)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', marginBottom: '12px' }}>Press Contact</h3>
            <div className="space-y-2">
              {/* TODO: Fill with real press contact name */}
              <p style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Email: <a href="mailto:press@rciif.org" style={{ color: 'var(--gold)' }}>press@rciif.org</a></p>
              {/* TODO: Add WhatsApp number */}
              <p style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Response time: Within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
