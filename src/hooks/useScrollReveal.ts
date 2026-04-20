import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Slight delay to ensure DOM is painted after route change
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-reveal]:not(.revealed)');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );

      elements.forEach((el) => observer.observe(el));

      // Cleanup will happen via the outer return
      (timer as any)._observer = observer;
    }, 50);

    return () => {
      const obs = (timer as any)._observer as IntersectionObserver | undefined;
      obs?.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname]);
}
