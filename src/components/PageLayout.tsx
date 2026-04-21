import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
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
  }, [title, description]);

  return (
    <div className="relative page-enter">
      <div className="top-rule" />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
