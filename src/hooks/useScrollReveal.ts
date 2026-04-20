import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Slight delay to ensure DOM is painted after route change
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(
        '[data-reveal]:not(.revealed):not(.is-revealed)'
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.getAttribute('data-delay') || '0';
              const ms = parseInt(delay, 10) || 0;
              window.setTimeout(() => {
                entry.target.classList.add('revealed', 'is-revealed');
              }, ms);
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      elements.forEach((el) => observer!.observe(el));
    }, 50);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [location.pathname]);
}
