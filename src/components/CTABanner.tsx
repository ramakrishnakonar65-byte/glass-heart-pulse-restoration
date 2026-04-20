export default function CTABanner() {
  return (
    <section
      className="py-16 text-center border-y"
      style={{
        background: 'var(--gold-bg)',
        borderColor: 'var(--gold-border)',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-20">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            letterSpacing: '-0.018em',
            lineHeight: 1.15,
            color: 'var(--ink)',
            marginBottom: '20px',
          }}
        >
          Ready to build something that <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>matters?</em>
        </h2>
        <a href="/contact/apply" className="btn-primary">
          Apply to Maverick Pont →
        </a>
      </div>
    </section>
  );
}
