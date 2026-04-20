import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getLenis } from '@/lib/lenis';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  useScrollReveal();

  useEffect(() => {
    if (title) {
      document.title = `${title} — RCIIF | Startup Incubator, Kharghar, Navi Mumbai`;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
    // Scroll-to-top on route change is handled centrally by LenisProvider.
  }, [title, description]);

  return (
    <div className="relative page-enter">
      <div className="top-rule" />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
