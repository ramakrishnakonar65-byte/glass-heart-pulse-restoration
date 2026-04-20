import { useRef, useEffect, useCallback, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

interface CardData { color?: string; title: string; description: string; label: string; icon?: ReactNode; }

interface MagicBentoProps {
  cards?: CardData[];
  glowColor?: string;
  spotlightRadius?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  className?: string;
}

const MagicBento = ({
  cards = [], glowColor = DEFAULT_GLOW_COLOR, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  enableTilt = true, enableMagnetism = false, clickEffect = false, className = ''
}: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideRef = useRef(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile || !gridRef.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,rgba(${glowColor},0.04) 25%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMove = (e: MouseEvent) => {
      if (!spotlight || !gridRef.current) return;
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (inside && !isInsideRef.current) { gsap.to(spotlight, { opacity: 1, duration: 0.3 }); isInsideRef.current = true; }
      else if (!inside && isInsideRef.current) { gsap.to(spotlight, { opacity: 0, duration: 0.3 }); isInsideRef.current = false; }

      const cardEls = gridRef.current.querySelectorAll('.magic-bento-card');
      const { proximity, fadeDistance } = { proximity: spotlightRadius * 0.5, fadeDistance: spotlightRadius * 0.75 };
      cardEls.forEach(card => {
        const cr = card.getBoundingClientRect();
        const rx = ((e.clientX - cr.left) / cr.width) * 100;
        const ry = ((e.clientY - cr.top) / cr.height) * 100;
        const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        const glow = dist < proximity ? 1 : dist < fadeDistance ? 1 - (dist - proximity) / (fadeDistance - proximity) : 0;
        (card as HTMLElement).style.setProperty('--glow-x', `${rx}%`);
        (card as HTMLElement).style.setProperty('--glow-y', `${ry}%`);
        (card as HTMLElement).style.setProperty('--glow-intensity', glow.toString());
        (card as HTMLElement).style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => { window.removeEventListener('mousemove', handleMove); spotlight.remove(); };
  }, [isMobile, glowColor, spotlightRadius]);

  return (
    <section className="bento-section">
      <div ref={gridRef} className={`card-grid ${className}`}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5em', padding: '0.75em', maxWidth: '54em' }}>
        {cards.map((card, i) => (
          <div key={i} className="magic-bento-card" style={{ background: card.color || '#060010' }}
            onMouseEnter={e => { if (!isMobile && enableTilt) gsap.to(e.currentTarget, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 }); }}
            onMouseLeave={e => { if (!isMobile && enableTilt) gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' }); }}
            onMouseMove={e => {
              if (isMobile || !enableTilt) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left, y = e.clientY - rect.top;
              gsap.to(e.currentTarget, { rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -10, rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
            }}>
            <div className="magic-bento-card__header">
              {card.icon && <div className="mr-2">{card.icon}</div>}
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MagicBento;
