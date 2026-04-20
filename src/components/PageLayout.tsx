import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — RCIIF | Startup Incubator, Kharghar, Navi Mumbai`;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
    window.scrollTo(0, 0);
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
