import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './PillNav.css';

interface PillNavItem { label: string; href: string; ariaLabel?: string; }

interface PillNavProps {
  logo?: string; logoAlt?: string; items: PillNavItem[]; activeHref?: string;
  className?: string; ease?: string; baseColor?: string; pillColor?: string;
  hoveredPillTextColor?: string; pillTextColor?: string; onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav = ({
  logo, logoAlt = 'Logo', items, activeHref, className = '', ease = 'power3.easeOut',
  baseColor = '#fff', pillColor = '#060010', hoveredPillTextColor = '#060010',
  pillTextColor, onMobileMenuClick, initialLoadAnimation = true
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${D - delta}px` });

        const label = pill.querySelector('.pill-label') as HTMLElement;
        const white = pill.querySelector('.pill-label-hover') as HTMLElement;
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (white) { gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 }); tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0); }
        tlRefs.current[index] = tl;
      });
    };
    layout();
    window.addEventListener('resize', layout);
    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { visibility: 'hidden', opacity: 0 });
    if (initialLoadAnimation) {
      if (logoRef.current) { gsap.set(logoRef.current, { scale: 0 }); gsap.to(logoRef.current, { scale: 1, duration: 0.6, ease }); }
      if (navItemsRef.current) { gsap.set(navItemsRef.current, { width: 0, overflow: 'hidden' }); gsap.to(navItemsRef.current, { width: 'auto', duration: 0.6, ease }); }
    }
    return () => window.removeEventListener('resize', layout);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => { const tl = tlRefs.current[i]; if (tl) { activeTweenRefs.current[i]?.kill(); activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' }); } };
  const handleLeave = (i: number) => { const tl = tlRefs.current[i]; if (tl) { activeTweenRefs.current[i]?.kill(); activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' }); } };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    const menu = mobileMenuRef.current;
    if (menu) {
      if (newState) { gsap.set(menu, { visibility: 'visible' }); gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease }); }
      else gsap.to(menu, { opacity: 0, y: 10, duration: 0.2, ease, onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
    }
    onMobileMenuClick?.();
  };

  const isExternal = (href: string) => /^(https?:|\/\/|mailto:|tel:|#)/.test(href);
  const cssVars = { '--base': baseColor, '--pill-bg': pillColor, '--hover-text': hoveredPillTextColor, '--pill-text': resolvedPillTextColor } as any;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <Link className="pill-logo" to="/" aria-label="Home" ref={logoRef as any}>
          {logo && <img src={logo} alt={logoAlt} ref={logoImgRef} />}
        </Link>
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href} role="none">
                {!isExternal(item.href) ? (
                  <Link role="menuitem" to={item.href} className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    onMouseEnter={() => handleEnter(i)} onMouseLeave={() => handleLeave(i)}>
                    <span className="hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                    <span className="label-stack"><span className="pill-label">{item.label}</span><span className="pill-label-hover">{item.label}</span></span>
                  </Link>
                ) : (
                  <a role="menuitem" href={item.href} className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    onMouseEnter={() => handleEnter(i)} onMouseLeave={() => handleLeave(i)}>
                    <span className="hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                    <span className="label-stack"><span className="pill-label">{item.label}</span><span className="pill-label-hover">{item.label}</span></span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button className="mobile-menu-button mobile-only" onClick={toggleMobileMenu} ref={hamburgerRef}>
          <span className="hamburger-line" /><span className="hamburger-line" />
        </button>
      </nav>
      <div className="mobile-menu-popover" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {items.map(item => (
            <li key={item.href}>
              {!isExternal(item.href) ? (
                <Link className="mobile-menu-link" to={item.href} onClick={() => { setIsMobileMenuOpen(false); if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { visibility: 'hidden' }); }}>{item.label}</Link>
              ) : (
                <a className="mobile-menu-link" href={item.href}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
