import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

interface ChromaItem {
  image: string; title: string; subtitle: string; handle?: string;
  borderColor?: string; gradient?: string; url?: string; location?: string;
}

interface ChromaGridProps { items?: ChromaItem[]; className?: string; radius?: number; columns?: number; rows?: number; damping?: number; fadeOut?: number; ease?: string; }

export const ChromaGrid = ({ items, className = '', radius = 300, columns = 3, rows = 2, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<any>(null);
  const setY = useRef<any>(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, { x, y, duration: damping, ease, onUpdate: () => { setX.current?.(pos.current.x); setY.current?.(pos.current.y); }, overwrite: true });
  };

  return (
    <div ref={rootRef} className={`chroma-grid ${className}`} style={{ '--r': `${radius}px`, '--cols': columns, '--rows': rows } as any}
      onPointerMove={e => { const r = rootRef.current!.getBoundingClientRect(); moveTo(e.clientX - r.left, e.clientY - r.top); gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true }); }}
      onPointerLeave={() => gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true })}>
      {data.map((c, i) => (
        <article key={i} className="chroma-card" onClick={() => c.url && window.open(c.url, '_blank')}
          style={{ '--card-border': c.borderColor || 'transparent', '--card-gradient': c.gradient, cursor: c.url ? 'pointer' : 'default' } as any}
          onMouseMove={e => { const rect = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`); e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`); }}>
          <div className="chroma-img-wrapper"><img src={c.image} alt={c.title} loading="lazy" /></div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
