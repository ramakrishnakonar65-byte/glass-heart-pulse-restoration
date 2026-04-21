const items = [
  'Rezonanz',
  'EatPure',
  'Kridinify Tech',
  'NamanAngels',
  'IndusInd Bank',
  'Maverick Pont',
  'Cohort 2026',
  'DPIIT Recognised',
  'Kharghar, Navi Mumbai',
  '12+ Incubatees',
  '₹12Cr+ Facilitated',
];

export default function MarqueeTicker() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative z-20 overflow-hidden border-y"
      style={{
        background: 'var(--ink)',
        borderColor: 'rgba(253,251,247,0.08)',
      }}
    >
      <div className="animate-scroll-left flex whitespace-nowrap py-3">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-block"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(253,251,247,0.35)',
            }}
          >
            {item}
            <span
              className="ml-6"
              style={{ color: 'var(--gold)', opacity: i % 2 === 0 ? 0.6 : 0.45 }}
            >
              {i % 2 === 0 ? '·' : '✦'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
