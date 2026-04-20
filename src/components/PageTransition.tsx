import { useEffect, useState } from 'react';

export default function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="page-transition-overlay">
      <div className="page-transition-content">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4"
          style={{ background: 'var(--gold-bg2)', borderColor: 'var(--gold-border)' }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.6rem', color: 'var(--gold)' }}>R</span>
        </div>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '1.1rem', letterSpacing: '-0.01em', color: 'var(--ink)' }}>RCIIF</span>
      </div>
    </div>
  );
}
