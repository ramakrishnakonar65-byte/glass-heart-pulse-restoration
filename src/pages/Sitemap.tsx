import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import { Link } from 'react-router-dom';

const SITEMAP = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', children: [
    { label: 'Our Story', href: '/about/story' },
    { label: 'Team & Council', href: '/about/team' },
    { label: 'Impact & Numbers', href: '/about/impact' },
    { label: 'Legal & Compliance', href: '/about/legal' },
  ]},
  { label: 'Maverick Pont', href: '/maverick', children: [
    { label: 'Apply as Startup', href: '/maverick/apply' },
    { label: 'For Investors', href: '/maverick/investors' },
    { label: 'Alumni & Success Stories', href: '/maverick/alumni' },
  ]},
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Space', href: '/space' },
  { label: 'Insights', href: '/insights', children: [
    { label: 'Events', href: '/insights/events' },
    { label: 'Coffee with Catalyst', href: '/insights/coffee' },
    { label: 'Press & Media', href: '/insights/press' },
    { label: 'Knowledge Hub', href: '/insights/knowledge' },
  ]},
  { label: 'Contact', href: '/contact', children: [
    { label: 'Partner With Us', href: '/contact/partner' },
    { label: 'Book A Visit', href: '/contact/book-visit' },
  ]},
  { label: 'FAQ', href: '/faq' },
];

export default function SitemapPage() {
  return (
    <PageLayout title="Sitemap" description="Complete sitemap for rciif.org — all pages and sections.">
      <section className="pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-20">
          <SectionHeader eyebrow="SITEMAP" title={<>Site <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Map</em></>} />
          <div className="space-y-6">
            {SITEMAP.map((item) => (
              <div key={item.href}>
                <Link to={item.href} style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '16px', color: 'var(--ink)', textDecoration: 'none' }} className="hover:text-[var(--gold)] transition-colors">{item.label}</Link>
                {item.children && (
                  <ul className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link to={child.href} style={{ fontSize: '13px', color: 'var(--ink-3)', textDecoration: 'none' }} className="hover:text-[var(--gold)] transition-colors">{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
