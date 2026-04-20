import { useEffect, useLayoutEffect, useMemo, useRef, useState, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

interface MasonryItem { id: string | number; img: string; height: number; url?: string; }
interface GridItem extends MasonryItem { x: number; y: number; w: number; h: number; }

interface MasonryProps {
  items: MasonryItem[]; ease?: string; duration?: number; stagger?: number;
  animateFrom?: string; scaleOnHover?: boolean; hoverScale?: number;
  blurToFocus?: boolean; colorShiftOnHover?: boolean;
}

const Masonry = ({
  items, ease = 'power3.out', duration = 0.6, stagger = 0.05,
  animateFrom = 'bottom', scaleOnHover = true, hoverScale = 0.95,
  blurToFocus = true, colorShiftOnHover = false
}: MasonryProps) => {
  const columns = useMedia(['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'], [5, 4, 3, 2], 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    Promise.all(items.map(i => new Promise<void>(r => { const img = new Image(); img.src = i.img; img.onload = img.onerror = () => r(); }))).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        gsap.fromTo(selector, { opacity: 0, x: item.x, y: item.y + 100, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animationProps, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger });
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, blurToFocus, duration, ease]);

  return (
    <div ref={containerRef} className="list">
      {grid.map(item => (
        <div key={item.id} data-key={item.id} className="item-wrapper"
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => scaleOnHover && gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' })}
          onMouseLeave={() => scaleOnHover && gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' })}>
          <div className="item-img" style={{ backgroundImage: `url(${item.img})` }} />
        </div>
      ))}
    </div>
  );
};

export default Masonry;
