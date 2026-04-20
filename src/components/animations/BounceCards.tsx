import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = '', images = [], containerWidth = 400, containerHeight = 400,
  animationDelay = 0.5, animationStagger = 0.06, easeType = 'elastic.out(1, 0.8)',
  transformStyles = ['rotate(10deg) translate(-170px)', 'rotate(5deg) translate(-85px)', 'rotate(-3deg)', 'rotate(-10deg) translate(85px)', 'rotate(2deg) translate(170px)'],
  enableHover = true
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.card', { scale: 0 }, { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay });
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (t: string) => /rotate\([\s\S]*?\)/.test(t) ? t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)') : t === 'none' ? 'rotate(0deg)' : `${t} rotate(0deg)`;
  const getPushedTransform = (base: string, offset: number) => {
    const m = base.match(/translate\(([-0-9.]+)px\)/);
    if (m) return base.replace(/translate\(([-0-9.]+)px\)/, `translate(${parseFloat(m[1]) + offset}px)`);
    return base === 'none' ? `translate(${offset}px)` : `${base} translate(${offset}px)`;
  };

  const pushSiblings = (idx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const base = transformStyles[i] || 'none';
      if (i === idx) {
        gsap.to(target, { transform: getNoRotationTransform(base), duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        const offset = i < idx ? -160 : 160;
        gsap.to(target, { transform: getPushedTransform(base, offset), duration: 0.4, ease: 'back.out(1.4)', delay: Math.abs(idx - i) * 0.05, overwrite: 'auto' });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, { transform: transformStyles[i] || 'none', duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
  };

  return (
    <div className={`bounceCardsContainer ${className}`} ref={containerRef} style={{ position: 'relative', width: containerWidth, height: containerHeight }}>
      {images.map((src, idx) => (
        <div key={idx} className={`card card-${idx}`} style={{ transform: transformStyles[idx] ?? 'none' }}
          onMouseEnter={() => pushSiblings(idx)} onMouseLeave={resetSiblings}>
          <img className="image" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}
