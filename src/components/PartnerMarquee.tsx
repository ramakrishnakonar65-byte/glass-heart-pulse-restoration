const PARTNERS = [
  'NamanAngels', 'IndusInd Bank', 'EduGlobe', 'KIFA', 'AIIPLTECH',
  'StarFelix', 'LiveTech India', 'London College Mumbai',
];

export default function PartnerMarquee() {
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <div className="py-12 overflow-hidden border-y" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-20 mb-6">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink-5)',
          }}
        >
          OUR PARTNERS & ASSOCIATES
        </span>
      </div>
      <div className="animate-scroll-left flex whitespace-nowrap">
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="inline-flex items-center justify-center mx-4 px-6 py-3 rounded-lg border flex-shrink-0"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--ink-3)',
              minWidth: '160px',
            }}
          >
            {/* TODO: Replace with real logo PNGs when available */}
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
