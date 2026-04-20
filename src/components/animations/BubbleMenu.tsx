import { useState, useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

interface BubbleMenuItem {
  label: string; href: string; ariaLabel?: string; rotation?: number;
  hoverStyles?: { bgColor?: string; textColor?: string };
}

interface BubbleMenuProps {
  logo?: string | ReactNode; onMenuClick?: (open: boolean) => void; className?: string;
  style?: React.CSSProperties; menuAriaLabel?: string; menuBg?: string;
  menuContentColor?: string; useFixedPosition?: boolean; items?: BubbleMenuItem[];
  animationEase?: string; animationDuration?: number; staggerDelay?: number;
}

export default function BubbleMenu({
  logo, onMenuClick, className, style, menuAriaLabel = 'Toggle menu',
  menuBg = '#fff', menuContentColor = '#111', useFixedPosition = false,
  items, animationEase = 'back.out(1.5)', animationDuration = 0.5, staggerDelay = 0.12
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuItems = items || [];
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className].filter(Boolean).join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLElement[];
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });
      bubbles.forEach((bubble, i) => {
        const tl = gsap.timeline({ delay: i * staggerDelay + gsap.utils.random(-0.05, 0.05) });
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) tl.to(labels[i], { y: 0, autoAlpha: 1, duration: animationDuration, ease: 'power3.out' }, `-=${animationDuration * 0.9}`);
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: 'power3.in' });
      gsap.to(bubbles, { scale: 0, duration: 0.2, ease: 'power3.in', onComplete: () => { gsap.set(overlay, { display: 'none' }); setShowOverlay(false); } });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div className="bubble logo-bubble" style={{ background: menuBg }}>
          <span className="logo-content">
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
          </span>
        </div>
        <button type="button" className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle} aria-label={menuAriaLabel} style={{ background: menuBg }}>
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>
      {showOverlay && (
        <div ref={overlayRef} className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`} aria-hidden={!isMenuOpen}>
          <ul className="pill-list" role="menu">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a role="menuitem" href={item.href} className="pill-link"
                  style={{ '--item-rot': `${item.rotation ?? 0}deg`, '--pill-bg': menuBg, '--pill-color': menuContentColor, '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6', '--hover-color': item.hoverStyles?.textColor || menuContentColor } as any}
                  ref={el => { bubblesRef.current[idx] = el; }}>
                  <span className="pill-label" ref={el => { labelRefs.current[idx] = el; }}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
